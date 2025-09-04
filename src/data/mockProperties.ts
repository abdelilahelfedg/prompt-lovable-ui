export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: [number, number];
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    propertyType: 'apartment' | 'house' | 'villa' | 'studio';
  };
  images: string[];
  amenities: string[];
  available: boolean;
  featured: boolean;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Downtown Apartment',
    description: 'Beautiful modern apartment in the heart of the city with stunning skyline views. Features premium finishes, floor-to-ceiling windows, and access to world-class amenities.',
    price: 2500,
    currency: 'USD',
    location: {
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      coordinates: [40.7128, -74.0060]
    },
    details: {
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      propertyType: 'apartment'
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop'
    ],
    amenities: ['Gym', 'Pool', 'Concierge', 'Parking', 'Balcony'],
    available: true,
    featured: true,
    owner: {
      name: 'John Smith',
      phone: '+1-555-0123',
      email: 'john.smith@email.com'
    }
  },
  {
    id: '2',
    title: 'Modern Villa with Garden',
    description: 'Spacious villa with private garden and pool. Perfect for families looking for comfort and luxury in a quiet neighborhood.',
    price: 4200,
    currency: 'USD',
    location: {
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      country: 'USA',
      coordinates: [34.0522, -118.2437]
    },
    details: {
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      propertyType: 'villa'
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ],
    amenities: ['Private Pool', 'Garden', 'Garage', 'Fireplace', 'Security System'],
    available: true,
    featured: true,
    owner: {
      name: 'Maria Garcia',
      phone: '+1-555-0456',
      email: 'maria.garcia@email.com'
    }
  },
  {
    id: '3',
    title: 'Cozy Studio Near University',
    description: 'Perfect studio apartment for students or young professionals. Located near public transport and university campus.',
    price: 1200,
    currency: 'USD',
    location: {
      address: '789 College Street',
      city: 'Boston',
      country: 'USA',
      coordinates: [42.3601, -71.0589]
    },
    details: {
      bedrooms: 0,
      bathrooms: 1,
      area: 35,
      propertyType: 'studio'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    amenities: ['WiFi', 'Furnished', 'Laundry', 'Kitchen'],
    available: true,
    featured: false,
    owner: {
      name: 'David Brown',
      phone: '+1-555-0789',
      email: 'david.brown@email.com'
    }
  },
  {
    id: '4',
    title: 'Family House with Backyard',
    description: 'Charming family home with spacious backyard, perfect for children and pets. Located in a safe, family-friendly neighborhood.',
    price: 3100,
    currency: 'USD',
    location: {
      address: '321 Pine Street',
      city: 'Seattle',
      country: 'USA',
      coordinates: [47.6062, -122.3321]
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      propertyType: 'house'
    },
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'
    ],
    amenities: ['Backyard', 'Parking', 'Storage', 'Dishwasher', 'Air Conditioning'],
    available: true,
    featured: false,
    owner: {
      name: 'Sarah Johnson',
      phone: '+1-555-0321',
      email: 'sarah.johnson@email.com'
    }
  },
  {
    id: '5',
    title: 'Luxury Penthouse Suite',
    description: 'Exclusive penthouse with panoramic city views, premium amenities, and private rooftop terrace. The epitome of luxury living.',
    price: 8500,
    currency: 'USD',
    location: {
      address: '999 Skyline Drive',
      city: 'Miami',
      country: 'USA',
      coordinates: [25.7617, -80.1918]
    },
    details: {
      bedrooms: 3,
      bathrooms: 3,
      area: 220,
      propertyType: 'apartment'
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    amenities: ['Rooftop Terrace', 'Premium Gym', 'Concierge', 'Valet Parking', 'Private Elevator'],
    available: true,
    featured: true,
    owner: {
      name: 'Michael Davis',
      phone: '+1-555-0999',
      email: 'michael.davis@email.com'
    }
  },
  {
    id: '6',
    title: 'Charming Victorian House',
    description: 'Historic Victorian home with original architectural details, hardwood floors, and modern updates. Perfect blend of old-world charm and modern comfort.',
    price: 2800,
    currency: 'USD',
    location: {
      address: '654 Heritage Lane',
      city: 'San Francisco',
      country: 'USA',
      coordinates: [37.7749, -122.4194]
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      area: 160,
      propertyType: 'house'
    },
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?w=800&h=600&fit=crop'
    ],
    amenities: ['Hardwood Floors', 'Original Features', 'Updated Kitchen', 'Garden', 'Parking'],
    available: true,
    featured: false,
    owner: {
      name: 'Emily Wilson',
      phone: '+1-555-0654',
      email: 'emily.wilson@email.com'
    }
  }
];

export const getFeaturedProperties = () => {
  return mockProperties.filter(property => property.featured);
};

export const getPropertyById = (id: string) => {
  return mockProperties.find(property => property.id === id);
};

export const getPropertiesByType = (type: string) => {
  if (type === 'all') return mockProperties;
  return mockProperties.filter(property => property.details.propertyType === type);
};

export const getPropertiesByPriceRange = (min: number, max: number) => {
  return mockProperties.filter(property => property.price >= min && property.price <= max);
};