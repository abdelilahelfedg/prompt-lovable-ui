# OpenHome - Premium Real Estate Platform

A modern, multilingual real estate platform built with React, TypeScript, and Tailwind CSS. Find your perfect home with our intuitive interface supporting English, French, Arabic, and Moroccan Darija.

## 🚀 Features

- **Multilingual Support**: English, French, Arabic, and Moroccan Darija with RTL support
- **Responsive Design**: Mobile-first approach with beautiful UI across all devices
- **Property Search**: Advanced filtering and search capabilities
- **Interactive Maps**: Property location visualization (mock implementation)
- **360° Virtual Tours**: Immersive property viewing experience (mock)
- **Dark/Light Theme**: Automatic theme switching with user preference
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type-Safe**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Internationalization**: react-i18next
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript compiler

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd openhome-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🌍 Language Support

The application supports four languages:

- **English** (en) - Default language
- **French** (fr) - Français  
- **Arabic** (ar) - العربية with RTL support
- **Moroccan Darija** (ma) - الدارجة المغربية with RTL support

Language files are located in `src/locales/` and the application automatically adjusts text direction for RTL languages.

## 📱 Available Pages

- **Landing Page** (`/`) - Hero section with search and featured properties
- **Explore** (`/explore`) - Property listings with filters and map view
- **Property Detail** (`/property/:id`) - Detailed property information with virtual tour
- **Authentication** (`/login`, `/signup`) - User authentication forms
- **Dashboard** (`/dashboard`) - User dashboard with property management

## 🎨 Design System

The application uses a comprehensive design system built with:

- **CSS Variables**: Semantic color tokens for consistent theming
- **HSL Colors**: All colors defined in HSL format for better manipulation
- **Component Variants**: shadcn/ui components with custom variants
- **Responsive Breakpoints**: Mobile-first responsive design
- **Animations**: Smooth transitions and micro-interactions

### Color Palette

- **Primary**: Premium real estate blue (`hsl(221 83% 53%)`)
- **Accent**: Premium gold (`hsl(38 92% 50%)`)
- **Success**: Property available green (`hsl(142 76% 36%)`)
- **Backgrounds**: Gradient overlays and card backgrounds

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Navigation, Footer
│   ├── property/       # Property-specific components
│   └── ui/             # shadcn/ui components
├── data/               # Mock data and types
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── locales/            # Translation files
├── pages/              # Route components
└── types/              # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🌟 Key Components

### PropertyCard
Displays property information with image, price, amenities, and quick actions.

### FiltersBar
Advanced filtering interface with property type, price range, location, and search.

### MapView
Interactive map component (currently mock implementation) showing property locations.

### Tour360
Virtual tour component with scene navigation and controls.

### Navbar
Responsive navigation with language switcher and theme toggle.

## 🔄 State Management

The application uses React Query for server state management and React hooks for local state. Key features:

- **Caching**: Intelligent data caching with React Query
- **Optimistic Updates**: Immediate UI feedback
- **Error Handling**: Graceful error states
- **Loading States**: Smooth loading experiences

## 🎯 Mock Data

Currently uses mock data for demonstration purposes:

- **Properties**: Sample property listings with images and details
- **Users**: Mock user profiles and authentication
- **Maps**: Simulated map interactions
- **Tours**: Mock 360° tour experiences

## 🚀 Future Enhancements

- **Backend Integration**: Connect to real estate API
- **Real Authentication**: Implement user accounts and profiles
- **Payment Integration**: Property booking and payments
- **Real Maps**: Integrate with Mapbox or Google Maps
- **Chat System**: Real-time messaging between users
- **Property Management**: Full CRUD operations for properties
- **Advanced Search**: ML-powered property recommendations

## 📈 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Lazy loading and responsive images  
- **Bundle Analysis**: Optimized bundle size
- **Caching Strategy**: Efficient data and asset caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Check the documentation
- Review the code comments for implementation details

---

**OpenHome** - Find Your Perfect Home 🏡