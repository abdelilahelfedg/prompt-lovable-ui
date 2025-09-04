import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Maximize2 } from 'lucide-react';
import { Property } from '@/data/mockProperties';

interface MapViewProps {
  properties: Property[];
  selectedProperty?: Property;
  className?: string;
  height?: string;
}

export function MapView({ 
  properties, 
  selectedProperty, 
  className = '',
  height = '400px' 
}: MapViewProps) {
  return (
    <MockMapView 
      properties={properties}
      selectedProperty={selectedProperty}
      className={className}
      height={height}
    />
  );
}

// Mock Map Component 
export function MockMapView({ 
  properties, 
  selectedProperty, 
  className = '',
  height = '400px' 
}: MapViewProps) {
  const propertyLocation = selectedProperty?.location || properties[0]?.location;

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Location</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Navigation className="h-4 w-4 mr-2" />
              Directions
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-b-lg flex items-center justify-center relative overflow-hidden"
          style={{ height }}
        >
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.1)_75%)] bg-[length:20px_20px]"></div>
          </div>
          
          {/* Property Markers */}
          {properties.length > 1 && (
            <div className="absolute inset-0">
              {properties.slice(0, 3).map((property, index) => (
                <div
                  key={property.id}
                  className="absolute w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg animate-bounce"
                  style={{
                    top: `${30 + index * 20}%`,
                    left: `${40 + index * 15}%`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs whitespace-nowrap">
                    ${property.price}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Location Info */}
          <div className="text-center z-10">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-border">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              {propertyLocation ? (
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {propertyLocation.city}, {propertyLocation.country}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {propertyLocation.address}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Coordinates: {propertyLocation.coordinates[0].toFixed(4)}, {propertyLocation.coordinates[1].toFixed(4)}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground text-sm">
                    View property locations and nearby amenities
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}