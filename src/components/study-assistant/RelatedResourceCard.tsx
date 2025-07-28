import React, { useState } from 'react';
import { ExternalLink, Play, Book, GraduationCap, Star, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RelatedResource } from '@/types/studyAssistant';

interface RelatedResourceCardProps {
  resource: RelatedResource;
  onNavigateToPage?: (pageNumber: number) => void;
}

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Generate YouTube thumbnail URL
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const RelatedResourceCard: React.FC<RelatedResourceCardProps> = ({ 
  resource, 
  onNavigateToPage 
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const isYouTubeVideo = resource.type === 'youtube' && resource.url;
  const videoId = isYouTubeVideo ? getYouTubeVideoId(resource.url!) : null;

  const getIcon = () => {
    switch (resource.type) {
      case 'khan_academy':
        return <GraduationCap className="h-4 w-4" />;
      case 'youtube':
        return <Play className="h-4 w-4" />;
      case 'textbook':
        return <Book className="h-4 w-4" />;
      case 'ai_explanation':
        return <Star className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (resource.type) {
      case 'khan_academy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'youtube':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'textbook':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'ai_explanation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getDifficultyColor = () => {
    switch (resource.difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleClick = () => {
    if (resource.type === 'textbook' && resource.textbookPage && onNavigateToPage) {
      onNavigateToPage(resource.textbookPage);
    } else if (isYouTubeVideo && videoId) {
      setIsVideoOpen(true);
    } else if (resource.url) {
      window.open(resource.url, '_blank');
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
        {/* Video Thumbnail */}
        {isYouTubeVideo && videoId && (
          <div className="relative">
            <img 
              src={getYouTubeThumbnail(videoId)}
              alt={resource.title}
              className="w-full h-32 object-cover rounded-t-lg"
              onError={(e) => {
                // Fallback to default thumbnail if maxresdefault doesn't exist
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-t-lg">
              <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors">
                <Play className="h-6 w-6 text-white fill-current" />
              </div>
            </div>
            {resource.duration && (
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {resource.duration}
              </div>
            )}
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {getIcon()}
              <CardTitle className="text-sm font-medium">{resource.title}</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-yellow-500" />
              <span className="text-xs text-muted-foreground">
                {Math.round(resource.relevanceScore * 100)}%
              </span>
            </div>
          </div>
          <CardDescription className="text-sm">{resource.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={getTypeColor()}>
                {resource.type.replace('_', ' ')}
              </Badge>
              {resource.difficulty && (
                <Badge variant="outline" className={getDifficultyColor()}>
                  {resource.difficulty}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {!isYouTubeVideo && resource.duration && (
                <span>{resource.duration}</span>
              )}
              {resource.textbookPage && (
                <span>Page {resource.textbookPage}</span>
              )}
              {!isYouTubeVideo && <ExternalLink className="h-3 w-3" />}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>{resource.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            {videoId && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={resource.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};