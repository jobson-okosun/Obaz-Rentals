export interface State {
    appName: string,
    cities: any[]
    hotRentals: any[],
    wishlist: any[],
    search: any[]
    contact: {
        email: {
            support: string,
            security: string
        },
    }
    faqs: any[],
    hostFaqs: any
}

export interface Swiper {
    slidesPerView: number,
    loop: boolean,
    pagination: boolean,
    autoplay: {
        delay: number,
    },
}