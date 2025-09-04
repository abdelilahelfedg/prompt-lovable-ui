import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PropertyCard } from '@/components/property/PropertyCard';
import { FiltersBar, FilterState } from '@/components/property/FiltersBar';
import { MockMapView } from '@/components/property/MapView';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3X3, Map, SlidersHorizontal } from 'lucide-react';
import { mockProperties } from '@/data/mockProperties';

export default function Explore() {
  const { t } = useTranslation();
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    propertyType: 'all',
    priceRange: [0, 10000],
    bedrooms: 'all',
    location: '',
    searchQuery: '',
  });

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      // Property type filter
      if (filters.propertyType !== 'all' && property.details.propertyType !== filters.propertyType) {
        return false;
      }

      // Price range filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms !== 'all') {
        const bedroomCount = parseInt(filters.bedrooms);
        if (bedroomCount === 0 && property.details.bedrooms !== 0) {
          return false;
        }
        if (bedroomCount > 0 && property.details.bedrooms < bedroomCount) {
          return false;
        }
      }

      // Location filter
      if (filters.location && !property.location.city.toLowerCase().includes(filters.location.toLowerCase()) && 
          !property.location.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery && !property.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !property.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !property.location.address.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !property.location.city.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleSearch = (query: string) => {
    // Search is handled in the filters state
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            {t('explore.title')}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up">
            {t('explore.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters */}
      <FiltersBar
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
      />

      {/* View Toggle and Results Count */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-foreground">
              Properties
            </h2>
            <span className="text-muted-foreground">
              {filteredProperties.length} properties found
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('grid')}
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={view === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('map')}
            >
              <Map className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>
        </div>

        {/* Content */}
        <Tabs value={view} onValueChange={(value) => setView(value as 'grid' | 'map')}>
          <TabsContent value="grid" className="mt-0">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    className="animate-fade-in"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SlidersHorizontal className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    propertyType: 'all',
                    priceRange: [0, 10000],
                    bedrooms: 'all',
                    location: '',
                    searchQuery: '',
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Map */}
              <div className="lg:col-span-2">
                <MockMapView 
                  properties={filteredProperties}
                  height="600px"
                  className="h-full"
                />
              </div>

              {/* Property List */}
              <div className="overflow-y-auto space-y-4 max-h-[600px]">
                <h3 className="font-semibold text-lg sticky top-0 bg-background py-2 border-b border-border">
                  Properties ({filteredProperties.length})
                </h3>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    className="animate-fade-in"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}