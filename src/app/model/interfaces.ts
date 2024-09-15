export interface Swiper {
    slidesPerView: number,
    loop: boolean,
    pagination: boolean,
    autoplay: {
        delay: number,
    },
}  


export interface User {
    id: string
    firstName: string,
    lastName: string,
    email: string,
    role: UserRole
}

export enum UserRole {
    REGULAR_USER = 'GUEST',
    HOST = 'HOST',
    ADMIN = 'ADMIN'
}

export interface Booking {
    bookingId: string;   
    propertyName: string; 
    guestName: string;
    checkInDate: string; 
    checkOutDate: string; 
    bookingStatus: 'Confirmed' | 'Pending' | 'Canceled';
    totalPrice: number; 
    paymentStatus: 'Paid' | 'Pending' | 'Refunded';
    cancellationPolicy: 'Flexible' | 'Moderate' | 'Strict';
    reviewStatus: 'Pending' | 'Submitted' | 'Not Submitted'; 
    numberOfGuests: number; 
    bookingDate: string; 
    requestDate: Date,
}

export interface Payment {
    id: string;   
    date: Date; 
    amount: number; 
    paymentMethod: string;
    status: string; 
    transactionId?: string;
    description?: string; 
}
  
export interface State {
    appName: string,
    cities: any[]
    hotRentals: any[],
    wishlist: any[],
    search: any[],
    myListing: any[],
    bookings: Booking[],
    booking: Booking | null,
    payments: Payment[],
    payment: Payment | null,
    faqs: any[],
    hostFaqs: any
    contact: {email: {support: string,security: string}},
    user: null | User,
    isMobile: boolean,
    isPlatformBrowser: boolean,
    webShareSupported: boolean,
    location: string,
}

export interface PropertyListing {
    // Basic Details
    title: string;
    description: string;
    propertyType: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    
    // Pricing
    pricePerNight: number;
    currency: string;
    cleaningFee?: number;
    discountWeekly?: number;
    discountMonthly?: number;
    
    // Property Details
    bedrooms: number;
    bathrooms: number;
    guestsAllowed: number;
    squareFootage?: number;
    bedTypes?: string;
    parkingAvailable?: boolean;
    balcony?: boolean;
    
    // Amenities
    amenities: Amenities[];  // Store a list of selected amenities
    
    // House Rules
    smokingAllowed?: boolean;
    petsAllowed?: boolean;
    eventsAllowed?: boolean;
    minStay: number;  // Minimum number of nights
    checkInTime: string; 
    checkOutTime: string; 
    
    // Photos and Media
    images: File[];
    

    // Security and Verification
    securityDeposit?: number;
    govIdVerification?: boolean;
    
  } 
  
  export interface ImagePreview {
    url: string;
    name: string;
    size: number;
}

export interface Amenities {
    wifi?: boolean;
    airConditioning?: boolean;
    heating?: boolean;
    kitchen?: 'full' | 'partial' | 'none';
    tv?: boolean;
    cableTV?: boolean;
    washerDryer?: boolean;
    swimmingPool?: boolean;
    gym?: boolean;
    sauna?: boolean;
    petFriendly?: boolean;
    wheelchairAccessible?: boolean;
}
