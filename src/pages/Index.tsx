import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PropertyCard } from '@/components/property/PropertyCard';
import { 
  Search, 
  ArrowRight, 
  Star, 
  Shield, 
  Clock, 
  Users,
  MapPin,
  Home,
  Sparkles
} from 'lucide-react';
import { getFeaturedProperties } from '@/data/mockProperties';

export default function Index() {
  const { t } = useTranslation();
  const featuredProperties = getFeaturedProperties();

  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All listings are verified and authenticated for your peace of mind"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance to help you find your perfect home"
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join thousands of satisfied users in our trusted platform"
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Properties in the most desirable neighborhoods and areas"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "5,000+", label: "Happy Customers" },
    { number: "50+", label: "Cities Covered" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 md:py-32 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/50 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/30 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 animate-fade-in">
            <Sparkles className="h-4 w-4 mr-2" />
            Premium Real Estate Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            {t('hero.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-premium">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder={t('hero.searchPlaceholder')}
                    className="pl-12 h-14 text-lg border-none bg-muted/50"
                  />
                </div>
                <Button size="lg" className="h-14 px-8" asChild>
                  <Link to="/explore" className="flex items-center space-x-2">
                    <span>{t('hero.cta')}</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Star className="h-4 w-4 mr-2" />
              Featured Properties
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Handpicked Properties
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular and exceptional properties, carefully selected for their quality and location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                className="animate-fade-in"
              />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/explore" className="flex items-center space-x-2">
                <span>View All Properties</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose OpenHome?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our premium real estate platform designed for modern home seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-6 bg-gradient-card border-border/50 hover:shadow-hover transition-all duration-300 animate-fade-in">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <Home className="h-16 w-16 text-white mx-auto mb-6 animate-float" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect home through OpenHome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/explore" className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Start Searching</span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/signup" className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Join OpenHome</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
