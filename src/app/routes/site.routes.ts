import { IMAGE_CONFIG } from "@angular/common"
import { Routes } from "@angular/router"

const route:Routes = [
    { 
        path: '', 
        providers: [
            {
                provide: IMAGE_CONFIG,
                useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true }
            }
        ],
        loadComponent: () => import('../components/template/template.component'),
        children: [
            { path: '', loadComponent: () => import('../components/home/home.component')},
            { path: 'rooms', loadComponent: () => import('../components/rentals/list/list.component')},
            { path: 'rooms/:title', loadComponent: () => import('../components/rentals/view/view.component')},
            { path: 'feedback/:name', loadComponent: () => import('../components/feedback/feedback.component')},
            { path: 'pm', loadComponent: () => import('../components/project-management/project-management.component')},
            { path: 'marketing', loadComponent: () => import('../components/marketing/marketing.component')},
            { path: 'about', loadComponent: () => import('../components/about/about.component')},
            { path: 'contact', loadComponent: () => import('../components/contact/contact.component')},
            { path: 'wishlist', loadComponent: () => import('../components/wishlist/wishlist.component')},
            { path: 'tips', loadComponent: () => import('../components/rental-tips/rental-tips.component')},
            { path: 'host', loadComponent: () => import('../components/host/host.component')},
            { path: 'careers', loadComponent: () => import('../components/careers/careers.component')},
            { path: 'search', loadComponent: () => import('../components/search/catalog/catalog.component')},
        ]
    }
]

export default route