import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, map, Observable, skip, throwError } from "rxjs";
import AuthService from "../services/auth.service";
import EncryptService from "../services/encryption";
import { environment } from "../../environments/environment";


export function RequestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    
    const authService = inject(AuthService)
    const encService = inject(EncryptService)

    let reqClone = req;
    
    reqClone = req.clone({
        setHeaders: {
            'Authorization': 'Bearer ' + authService.getAuth()
        }
    })
    
    if (req.body && reqClone.headers.get('skip-enc') !== 'true') {
        const encryptedPayload = encService.encrypt(req.body)
        reqClone = reqClone.clone({ body: { _dto: encryptedPayload} });
    }

    

    return next(reqClone).pipe(
        map(
            (event: HttpEvent<any>) => {
                if(event instanceof HttpResponse && event.body) {
                    let response = event.body
                    if(reqClone.headers.get('skip-enc') !== 'true') {
                        response = encService.decrypt(response)
                    }
                    
                    response = JSON.parse(response)
                    if(!environment.production) console.log(response)
                    return event.clone({ body: response })
                }
                else return event
            }
        ),
        catchError((err: any) => {
            let error:any = null
            if(err instanceof HttpErrorResponse) { 
                error = err.error 
                
                if(err.status === 401 && authService.getAuth()) {
                    authService.logoff()  
                }

                if(reqClone.headers.get('skip-enc') !== 'true') {
                    error = encService.decrypt(error as string)
                }

                error = JSON.parse(error)
                if(!environment.production) console.log(error)

                if(error.xredirect) {
                    authService.logoff()
                }
            }
            else error = err
            return throwError(() => error)
        })
    )
}

