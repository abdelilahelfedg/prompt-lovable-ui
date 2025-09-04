import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Filter, Search, X } from 'lucide-react';

export interface FilterState {
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  location: string;
  searchQuery: string;
}

interface FiltersBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onSearch: (query: string) => void;
}

export function FiltersBar({ filters, onFiltersChange, onSearch }: FiltersBarProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: t('explore.propertyTypes.apartment') },
    { value: 'house', label: t('explore.propertyTypes.house') },
    { value: 'villa', label: t('explore.propertyTypes.villa') },
    { value: 'studio', label: t('explore.propertyTypes.studio') },
  ];

  const bedroomOptions = [
    { value: 'all', label: 'Any' },
    { value: '0', label: 'Studio' },
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      propertyType: 'all',
      priceRange: [0, 10000],
      bedrooms: 'all',
      location: '',
      searchQuery: '',
    };
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = 
    filters.propertyType !== 'all' ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000 ||
    filters.bedrooms !== 'all' ||
    filters.location !== '' ||
    filters.searchQuery !== '';

  return (
    <div className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={t('hero.searchPlaceholder')}
              value={filters.searchQuery}
              onChange={(e) => {
                handleFilterChange('searchQuery', e.target.value);
                onSearch(e.target.value);
              }}
              className="pl-10 h-12"
            />
          </div>

          {/* Mobile Filter Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="default" className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                {t('common.filter')}
                {hasActiveFilters && (
                  <div className="ml-2 h-2 w-2 bg-primary rounded-full" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>{t('common.filter')}</SheetTitle>
                <SheetDescription>
                  Refine your property search with these filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <MobileFilters
                  filters={filters}
                  onFiltersChange={handleFilterChange}
                  clearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                  propertyTypes={propertyTypes}
                  bedroomOptions={bedroomOptions}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex-1 grid grid-cols-4 gap-4">
            {/* Property Type */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                {t('explore.filters.type')}
              </Label>
              <Select
                value={filters.propertyType}
                onValueChange={(value) => handleFilterChange('propertyType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                {t('explore.filters.priceRange')}
              </Label>
              <div className="px-3">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange('priceRange', value)}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                {t('explore.filters.bedrooms')}
              </Label>
              <Select
                value={filters.bedrooms}
                onValueChange={(value) => handleFilterChange('bedrooms', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bedroomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                {t('explore.filters.location')}
              </Label>
              <Input
                type="text"
                placeholder="City, Area..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="whitespace-nowrap"
            >
              <X className="h-4 w-4 mr-2" />
              {t('explore.filters.clear')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileFilters({ 
  filters, 
  onFiltersChange, 
  clearFilters, 
  hasActiveFilters,
  propertyTypes,
  bedroomOptions 
}: {
  filters: FilterState;
  onFiltersChange: (key: keyof FilterState, value: any) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  propertyTypes: Array<{ value: string; label: string }>;
  bedroomOptions: Array<{ value: string; label: string }>;
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          {t('explore.filters.type')}
        </Label>
        <Select
          value={filters.propertyType}
          onValueChange={(value) => onFiltersChange('propertyType', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          {t('explore.filters.priceRange')}
        </Label>
        <div className="px-3">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => onFiltersChange('priceRange', value)}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          {t('explore.filters.bedrooms')}
        </Label>
        <Select
          value={filters.bedrooms}
          onValueChange={(value) => onFiltersChange('bedrooms', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {bedroomOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          {t('explore.filters.location')}
        </Label>
        <Input
          type="text"
          placeholder="City, Area..."
          value={filters.location}
          onChange={(e) => onFiltersChange('location', e.target.value)}
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          {t('explore.filters.clear')}
        </Button>
      )}
    </div>
  );
}