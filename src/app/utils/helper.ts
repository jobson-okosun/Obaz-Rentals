import { timer } from "rxjs";
import { Swiper } from "../model/interfaces";
import { FormArray, FormGroup } from "@angular/forms";

export const initSwiper = (parentSelector: string, config?:Swiper) => {
    const swiperEls = document.querySelectorAll(`${parentSelector} swiper-container`);
    swiperEls.forEach((swiperEl:any) => {
        const swiperParams = config ?? {
            slidesPerView: 1,
            loop: true,
            pagination: true,
            autoplay: {
                delay: 5000,
            },
        };
        timer(0).subscribe(() => {
            Object.assign(swiperEl, swiperParams);
            swiperEl.initialize();
            initializeSwiperControls(swiperEl)
        }) 
    })
}

const initializeSwiperControls = (swiperEl:any) => {
    const btns = (swiperEl as HTMLElement).parentElement!.querySelectorAll('button')
    btns[0].addEventListener('click', () => swiperEl.swiper.slideNext())
    btns[1].addEventListener('click', () => swiperEl.swiper.slidePrev())
}

export const parseRentalUrl = (title:string, revert:boolean = false) => {
    if (revert) {
        return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } else {
        return title.trim().toLowerCase().replace(/\s+/g, '-');
    }
}

export const loadData = (pageIndex: number = 1, pageSize: number = 1, files:any[]) => {
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = files.slice(startIndex, endIndex);
    return currentPageData
}

export const getInvalidControl = (form: FormGroup): string[] => {
    const invalidControls: string[] = [];
  
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
  
      if (control instanceof FormGroup) {
        invalidControls.push(...getInvalidControl(control));
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl, index) => {
          if (arrayControl.invalid) {
            invalidControls.push(`${key}[${index}]`);
          }
        });
      } else {
        if (control && control.invalid) {
          invalidControls.push(key);
        }
      }
    });
  
    return invalidControls;
  }
  