import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Volume2, 
  VolumeX,
  Eye,
  Move3D
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Tour360Props {
  propertyId: string;
  images: string[];
  className?: string;
}

export function Tour360({ propertyId, images, className = '' }: Tour360Props) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    { name: 'Living Room', image: images[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop' },
    { name: 'Kitchen', image: images[1] || 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&h=600&fit=crop' },
    { name: 'Bedroom', image: images[2] || 'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop' },
    { name: 'Bathroom', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop' },
  ];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetView = () => {
    setIsPlaying(false);
    setCurrentScene(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Move3D className="h-5 w-5" />
            <span>{t('property.tour360')}</span>
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            <Eye className="h-3 w-3 mr-1" />
            Interactive
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* 360° Viewer */}
        <div className="relative h-96 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-b-lg overflow-hidden">
          {/* Mock 360° Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 transform"
            style={{ 
              backgroundImage: `url(${scenes[currentScene].image})`,
              transform: isPlaying ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {/* Overlay for 360° effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          </div>

          {/* 360° Indicators */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Rotation indicators */}
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium">
              360° View
            </div>
            
            {/* Compass */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full"></div>
                <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-primary transform -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>

            {/* Scene hotspots */}
            <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-primary rounded-full animate-ping"></div>
            <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-accent rounded-full animate-ping delay-300"></div>
            <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-success rounded-full animate-ping delay-700"></div>

            {/* Mouse interaction hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-muted-foreground">
              <Move3D className="h-4 w-4 inline mr-2" />
              Click and drag to look around
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="secondary"
              onClick={togglePlayPause}
              className="bg-background/90 backdrop-blur-sm"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            
            <Button 
              size="sm" 
              variant="secondary"
              onClick={resetView}
              className="bg-background/90 backdrop-blur-sm"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button 
              size="sm" 
              variant="secondary"
              onClick={toggleMute}
              className="bg-background/90 backdrop-blur-sm"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-background/90 backdrop-blur-sm"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scene Navigation */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Rooms</h4>
            <span className="text-xs text-muted-foreground">
              {currentScene + 1} of {scenes.length}
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {scenes.map((scene, index) => (
              <button
                key={index}
                onClick={() => setCurrentScene(index)}
                className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  currentScene === index 
                    ? 'border-primary shadow-md' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <img
                  src={scene.image}
                  alt={scene.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end">
                  <span className="text-white text-xs font-medium p-1 truncate w-full">
                    {scene.name}
                  </span>
                </div>
                {currentScene === index && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}