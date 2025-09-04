import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MockMapView } from '@/components/property/MapView';
import { Tour360 } from '@/components/property/Tour360';
import { PropertyCard } from '@/components/property/PropertyCard';
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Phone,
  Mail,
  Heart,
  Share2,
  ArrowLeft,
  Star,
  Check,
  Calendar,
  User
} from 'lucide-react';
import { getPropertyById, getFeaturedProperties } from '@/data/mockProperties';
import NotFound from './NotFound';

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  if (!id) {
    return <NotFound />;
  }

  const property = getPropertyById(id);
  const relatedProperties = getFeaturedProperties().filter(p => p.id !== id).slice(0, 3);

  if (!property) {
    return <NotFound />;
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const propertyTypeLabel = t(`explore.propertyTypes.${property.details.propertyType}`);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/explore" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Properties</span>
          </Link>
        </Button>
      </div>

      {/* Hero Gallery */}
      <section className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96 lg:h-[500px]">
          {/* Main Image */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-xl">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex space-x-2">
              {property.featured && (
                <Badge className="bg-accent text-accent-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <Badge 
                variant={property.available ? "default" : "secondary"}
                className={property.available ? "bg-success text-success-foreground" : ""}
              >
                {property.available ? t('property.available') : 'Rented'}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button size="sm" variant="secondary">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Side Images */}
          <div className="hidden lg:grid grid-rows-2 gap-4">
            {property.images.slice(1, 3).map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt={`${property.title} - ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{property.location.address}, {property.location.city}, {property.location.country}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">
                    {formatPrice(property.price, property.currency)}
                  </div>
                  <div className="text-muted-foreground">
                    {t('property.perMonth')}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center space-x-6 mb-6">
                {property.details.bedrooms > 0 && (
                  <div className="flex items-center space-x-2">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{property.details.bedrooms}</span>
                    <span className="text-muted-foreground">{t('property.bedrooms')}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{property.details.bathrooms}</span>
                  <span className="text-muted-foreground">{t('property.bathrooms')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{property.details.area}m²</span>
                  <span className="text-muted-foreground">{t('property.area')}</span>
                </div>
                <Badge variant="outline">
                  {propertyTypeLabel}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('property.description')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('property.amenities')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 360° Tour */}
            <Tour360 
              propertyId={property.id} 
              images={property.images}
            />

            <Separator />

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('property.location')}</h2>
              <MockMapView 
                properties={[property]} 
                selectedProperty={property}
                height="300px"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Contact Owner</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{property.owner.name}</h3>
                  <p className="text-muted-foreground text-sm">Property Owner</p>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Phone className="h-4 w-4 mr-2" />
                    {property.owner.phone}
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                <div className="text-center">
                  <Button variant="ghost" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{propertyTypeLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Area</span>
                  <span className="font-medium">{property.details.area}m²</span>
                </div>
                {property.details.bedrooms > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bedrooms</span>
                    <span className="font-medium">{property.details.bedrooms}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bathrooms</span>
                  <span className="font-medium">{property.details.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={property.available ? "default" : "secondary"}>
                    {property.available ? 'Available' : 'Rented'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((relatedProperty) => (
                <PropertyCard
                  key={relatedProperty.id}
                  property={relatedProperty}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}