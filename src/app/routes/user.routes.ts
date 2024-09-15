import { Routes } from "@angular/router";

const routes:Routes = [
    { 
        path: '', 
        loadComponent: () => import('../components/user/template/template.component'), 
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'profile', loadComponent: () => import('../components/user/profile/profile.component')},
            { path: 'settings', loadComponent: () => import('../components/user/settings/settings.component')},
            { path: 'dashboard', loadComponent: () => import('../components/user/dashboard/dashboard.component')},
            { path: 'listing', loadComponent: () => import('../components/user/mylisting/mylisting.component')},
            { path: 'list', loadComponent: () => import('../components/user/list/list.component')},
            { 
                path: 'bookings', 
                children: [
                    { path: '', loadComponent: () => import('../components/user/booking/bookings/bookings.component')},
                    { path: ':id', loadComponent: () => import('../components/user/booking/booking-details/booking-details.component')}
                ]
            },
            { 
                path: 'payments', 
                children: [
                    { path: '', loadComponent: () => import('../components/user/payments/payments/payments.component')},
                    { path: 'earnings', loadComponent: () => import('../components/user/payments/earnings/earnings.component')},
                    { path: ':id', loadComponent: () => import('../components/user/payments/payment-details/payment-details.component')},
                ]
            },
            {  
                path: 'media', 
                children: [
                    { path: '', loadComponent: () => import('../components/user/media_/collections/collections.component')},
                    { path: 'upload', loadComponent: () => import('../components/user/media_/media/media.component')},
                ]
            }
        ]
    }
]

export default routes