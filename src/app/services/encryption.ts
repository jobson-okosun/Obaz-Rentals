import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js'
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})

export default class EncryptService {

    env = environment

    encrypt(payload:any):string {
        let cypherText = CryptoJS.AES.encrypt(JSON.stringify(payload), this.env.enc_secret_key)
        return cypherText.toString()
    }

    decrypt(cypherText:string) {
        let originaltext = CryptoJS.AES.decrypt(cypherText, this.env.enc_secret_key).toString(CryptoJS.enc.Utf8)
        return originaltext
    }
 }
 