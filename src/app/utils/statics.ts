export const cities = [
    {
        "name": "Los Angeles",
        "state": "CA",
        "country": "USA",
        "image": "los-angeles@3x.jpg"
    },
    {
        "name": "Dallas",
        "state": "TX",
        "country": "USA",
        "image": "dallas@3x.jpg"
    },
    {
        "name": "Philadelphia",
        "state": "PA",
        "country": "USA",
        "image": "philadelphia@3x.jpg"
    },
    {
        "name": "San Jose",
        "state": "CA",
        "country": "USA",
        "image": "san-jose@3x.jpg"
    },
    {
        "name": "Boston",
        "state": "MA",
        "country": "USA",
        "image": "boston@3x.jpg"
    },
    {
        "name": "Nashville",
        "state": "TN",
        "country": "USA",
        "image": "nashville@3x.jpg"
    },
    {
        "name": "San Francisco",
        "state": "CA",
        "country": "USA",
        "image": "san-francisco@3x.jpg"
    },
    {
        "name": "New York City",
        "state": "NY",
        "country": "USA",
        "image": "new-york-city@3x.jpg"
    },
    {
        "name": "Seattle",
        "state": "WA",
        "country": "USA",
        "image": "seattle@3x.jpg"
    },

    {
        "name": "Denver",
        "state": "CO",
        "country": "USA",
        "image": "denver@3x.jpg"
    },
    {
        "name": "Washington, D.C.",
        "country": "USA",
        "image": "washington@3x.jpg"
    },
    {
        "name": "Chicago",
        "state": "IL",
        "country": "USA",
        "image": "chicago@3x.jpg"
    }
]

export const faqs = [
    {
        title: "What is the Work from Home program?",
        description: "The Work from Home program allows you to find rentals that are perfect for working remotely, with fully furnished spaces, ready-to-use wifi, and the ability to tour and book online.",
        selector: 'one'
    },
    {
        title: "How do I book a rental?",
        description: "You can book a rental by browsing our listings, selecting a property that suits your needs, and following the booking instructions. You will need to provide your personal information and payment details to complete the booking.",
        selector: 'two'
    },
    {
        title: "What are the payment options available?",
        description: "We accept various payment options including credit/debit cards, PayPal, and other online payment methods. Payment details will be provided during the booking process.",
        selector: 'three'
    },
    {
        title: "Can I cancel my booking?",
        description: "Yes, you can cancel your booking. However, cancellation policies vary depending on the rental property. Please review the cancellation policy provided with each listing before booking.",
        selector: 'four'
    },
    {
        title: "Are pets allowed in the rentals?",
        description: "Pet policies vary by property. Some rentals allow pets while others do not. Please check the pet policy listed in the property details before booking.",
        selector: 'five'
    },
    {
        title: "How do I contact the host?",
        description: "You can contact the host through our platform's messaging system. Once you have booked a rental, you will have access to the host's contact details for further communication.",
        selector: 'six'
    },
    {
        title: "What amenities are included in the rentals?",
        description: "Amenities vary by property, but typical amenities include fully furnished spaces, high-speed wifi, kitchen facilities, and more. Detailed information about amenities can be found in each property listing.",
        selector: 'seven'
    },
    {
        title: "How do I leave a review?",
        description: "After your stay, you will receive an email prompting you to leave a review. You can also leave a review by logging into your account and visiting the 'My Bookings' section.",
        selector: 'eight'
    },
    {
        title: "What safety measures are in place?",
        description: "We prioritize the safety of our guests. All properties are required to follow local health and safety guidelines. Additionally, we provide 24/7 customer support to assist with any concerns during your stay.",
        selector: 'nine'
    },
    {
        title: "What should I do if I encounter an issue during my stay?",
        description: "If you encounter any issues during your stay, please contact our customer support team immediately. We are available 24/7 to assist you and ensure a pleasant experience.",
        selector: 'ten'
    }
];

export const hostFaqs = [
    {
        title: "When did we start?",
        description: " was founded in 2020 when our founders saw a need to change how people find monthly rentals and housemates. We're based out of San Francisco and are a venture-backed company.",
        selector: 'one'
    },
    {
        title: "Does it cost anything to list my space?",
        description: "Nope! Listing your space on Kopa is completely free. When a renter successfully books your place, we charge a 3-8% service fee on the total booking amount.",
        selector: 'two'
    },
    {
        title: "Do you offer any insurance?",
        description: "Security deposits and leases are the standard on Kopa. Renters send the specified security deposit to you when they book your space, and that money goes directly to you. At the end of each booking, you'll return the remainder of the security deposit to the renter through us.",
        selector: 'three'
    },
    {
        title: "How do you vet and verify renters?",
        description: "Most of our renters are vetted through a background check by their employers, who are our corporate partners. Renters fill out a rental application before messaging you. If you wish to conduct a background check, we encourage you to do so.",
        selector: 'four'
    },
    {
        title: "How should I price my listing",
        description: "We give you full control of your pricing. If you want to maintain a competitive price, we recommended checking out similar listings in your area. If you want specific help, our Customer Success Team can provide more detailed feedback.",
        selector: 'five'
    },
    {
        title: "How do I get started?",
        description: "Create an account, add details about your listing, and publish your listing. Once published, millions of prospective renters will be able to view your listing.",
        selector: 'six'
    }
];


export const routes = [
    {
        path: '',
        title: 'home',
        icon: `
            <svg class="w-6 h-6 text-gray-100 lg:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
            </svg>
        `
    },
    {
        path: 'rooms',
        title: 'Rentals',
        icon: `
            <svg class="w-6 h-6 text-gray-100 lg:text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
            </svg>
        `
    },
    {
        path: 'marketing',
        title: 'marketing',
        icon: `
            <svg class="w-6 h-6 text-gray-100 lg:text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z"/>
            </svg>
        `
    },
    {
        path: 'pm',
        title: 'project management',
        icon: `
            <svg class="w-6 h-6 text-gray-100 lg:text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M5.005 10.19a1 1 0 0 1 1 1v.233l5.998 3.464L18 11.423v-.232a1 1 0 1 1 2 0V12a1 1 0 0 1-.5.866l-6.997 4.042a1 1 0 0 1-1 0l-6.998-4.042a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1ZM5 15.15a1 1 0 0 1 1 1v.232l5.997 3.464 5.998-3.464v-.232a1 1 0 1 1 2 0v.81a1 1 0 0 1-.5.865l-6.998 4.042a1 1 0 0 1-1 0L4.5 17.824a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1Z" clip-rule="evenodd"/>
            <path d="M12.503 2.134a1 1 0 0 0-1 0L4.501 6.17A1 1 0 0 0 4.5 7.902l7.002 4.047a1 1 0 0 0 1 0l6.998-4.04a1 1 0 0 0 0-1.732l-6.997-4.042Z"/>
            </svg>
        `
    },
    {
        path: 'about',
        title: 'about',
        icon: `
            <svg class="w-6 h-6 text-gray-100 lg:text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>

        `
    },
    {
        path: 'contact',
        title: 'contact',
        icon: `
            <svg class="w-6 h-6 text-gray-100 lg:text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z"/>
            </svg>

        `
    }
]