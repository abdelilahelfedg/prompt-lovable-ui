import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star,
  Eye 
} from 'lucide-react';
import { Property } from '@/data/mockProperties';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const { t } = useTranslation();

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const propertyTypeLabel = t(`explore.propertyTypes.${property.details.propertyType}`);

  return (
    <Card className={cn(
      "group overflow-hidden hover:shadow-hover transition-all duration-300 bg-gradient-card border-border/50", 
      className
    )}>
      <div className="relative">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Overlay Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
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

          {/* Favorite Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Price Overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="text-lg font-bold text-foreground">
                {formatPrice(property.price, property.currency)}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                {t('property.perMonth')}
              </span>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title and Location */}
          <div className="mb-3">
            <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location.address}, {property.location.city}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {property.details.bedrooms > 0 && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.details.bedrooms}</span>
                </div>
              )}
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.details.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.details.area}m²</span>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {propertyTypeLabel}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/property/${property.id}`} className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{t('common.viewMore')}</span>
              </Link>
            </Button>
            
            <Button size="sm" asChild>
              <Link to={`/property/${property.id}`}>
                {t('property.contact')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}