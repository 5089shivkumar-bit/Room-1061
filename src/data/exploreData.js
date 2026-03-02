import {
    Utensils, Landmark, ShoppingBag, Train, HeartPulse,
    Coffee, Pizza, Beer, Camera, MapPin,
    Activity, ShieldAlert, BadgeDollarSign, Pocket
} from 'lucide-react';

export const categories = [
    {
        id: 'food',
        title: 'Food & Dining',
        icon: Utensils,
        count: 12,
        keywords: ['food', 'indian', 'chinese', 'continental', 'fast food', 'south indian', 'vegetarian', 'non-vegetarian', 'cafe', 'bakery', 'restaurant', 'dining', 'eat']
    },
    {
        id: 'culture',
        title: 'Tourist & Culture',
        icon: Landmark,
        count: 8,
        keywords: ['temple', 'park', 'historical', 'museum', 'cultural', 'lake', 'garden', 'tourist', 'visit']
    },
    {
        id: 'shopping',
        title: 'Shopping & Entertainment',
        icon: ShoppingBag,
        count: 6,
        keywords: ['mall', 'theatre', 'cinema', 'gaming', 'cafe', 'shopping', 'entertainment', 'movie']
    },
    {
        id: 'transport',
        title: 'Transport & Stations',
        icon: Train,
        count: 5,
        keywords: ['railway', 'station', 'bus', 'airport', 'metro', 'transport', 'taxi']
    },
    {
        id: 'emergency',
        title: 'Emergency & Essentials',
        icon: HeartPulse,
        count: 10,
        keywords: ['hospital', 'atm', 'bank', 'medical', 'pharmacy', 'police', 'emergency', 'essential', 'doctor']
    }
];

export const exploreData = {
    food: [
        {
            id: 'f1',
            name: "Royal Indian Kitchen",
            cuisine: ["Indian", "Vegetarian"],
            dist: 0.4,
            rating: 4.8,
            desc: "Authentic North Indian delicacies in a regal setting.",
            img: "/images/lifestyle/restaurant.png",
            googleMaps: "https://www.google.com/maps/search/Royal+Indian+Kitchen"
        },
        {
            id: 'f2',
            name: "The Dragon's Breath",
            cuisine: ["Chinese", "Non-Vegetarian"],
            dist: 1.2,
            rating: 4.5,
            desc: "Spicy Szechuan specialties and handmade dim sums.",
            img: "/images/lifestyle/restaurant.png",
            googleMaps: "https://www.google.com/maps/search/Chinese+Food",
            orderNow: true
        },
        {
            id: 'f3',
            name: "Luxe Continental",
            cuisine: ["Continental", "Cafe"],
            dist: 0.8,
            rating: 4.9,
            desc: "Premium European flavors with a view of the city skyline.",
            img: "/images/lifestyle/restaurant.png",
            googleMaps: "https://www.google.com/maps/search/Continental+Restaurant"
        },
        {
            id: 'f4',
            name: "South Spice",
            cuisine: ["South Indian", "Vegetarian"],
            dist: 1.5,
            rating: 4.7,
            desc: "Traditional flavors from the heart of Southern India.",
            img: "/images/lifestyle/restaurant.png",
            googleMaps: "https://www.google.com/maps/search/South+Indian+Food"
        },
        {
            id: 'f5',
            name: "Bakers & Co.",
            cuisine: ["Bakery", "Cafe"],
            dist: 0.3,
            rating: 4.6,
            desc: "Freshly baked artisanal breads and gourmet pastries.",
            img: "/images/lifestyle/restaurant.png",
            googleMaps: "https://www.google.com/maps/search/Bakery"
        },
        {
            id: 'f6',
            name: "Quick Bite Hub",
            cuisine: ["Fast Food"],
            dist: 0.9,
            rating: 4.2,
            desc: "Quick and delicious burgers, fries, and shakes.",
            img: "/images/lifestyle/restaurant.png",
            googleMaps: "https://www.google.com/maps/search/Fast+Food",
            orderNow: true
        }
    ],
    culture: [
        {
            id: 'c1',
            name: "Heritage Temple",
            type: "Temples",
            dist: 2.1,
            desc: "Ancient architecture with a peaceful spiritual aura.",
            img: "/images/lifestyle/landmark.png",
            googleMaps: "https://www.google.com/maps/search/Temple"
        },
        {
            id: 'c2',
            name: "City Central Park",
            type: "Parks",
            dist: 0.7,
            desc: "Lush green space perfect for morning walks and relaxation.",
            img: "/images/lifestyle/landmark.png",
            googleMaps: "https://www.google.com/maps/search/Park"
        },
        {
            id: 'c3',
            name: "National Museum",
            type: "Museums",
            dist: 3.5,
            desc: "Discover the rich history and art of the region.",
            img: "/images/lifestyle/landmark.png",
            googleMaps: "https://www.google.com/maps/search/Museum"
        }
    ],
    shopping: [
        {
            id: 's1',
            name: "Grand Mall",
            type: "Shopping Malls",
            dist: 1.8,
            desc: "Premium international brands and lifestyle shopping.",
            img: "/images/lifestyle/landmark.png", // Reusing landmark as placeholder
            googleMaps: "https://www.google.com/maps/search/Mall"
        },
        {
            id: 's2',
            name: "Elite Cinema",
            type: "Theatres / Cinema",
            dist: 2.3,
            desc: "Luxury movie experience with 4K projection.",
            img: "/images/lifestyle/landmark.png",
            googleMaps: "https://www.google.com/maps/search/Cinema"
        }
    ],
    transport: [
        {
            id: 't1',
            name: "City Railway Station",
            type: "Railway Station",
            dist: 4.2,
            travelTime: "15-20 mins",
            desc: "Main hub for interstate train travel.",
            googleMaps: "https://www.google.com/maps/search/Railway+Station"
        },
        {
            id: 't2',
            name: "Metro Central",
            type: "Metro",
            dist: 1.1,
            travelTime: "5-7 mins",
            desc: "Quickest way to move across the city.",
            googleMaps: "https://www.google.com/maps/search/Metro+Station"
        }
    ],
    emergency: [
        {
            id: 'e1',
            name: "City Life Hospital",
            type: "Hospitals",
            dist: 1.5,
            desc: "24/7 Multi-specialty medical facility.",
            googleMaps: "https://www.google.com/maps/search/Hospital"
        },
        {
            id: 'e2',
            name: "National Bank ATM",
            type: "ATMs",
            dist: 0.2,
            desc: "24/7 ATM and banking services.",
            googleMaps: "https://www.google.com/maps/search/ATM"
        }
    ]
};
