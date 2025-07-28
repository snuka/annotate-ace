import React from 'react';
import { ExternalLink, Play, Book, GraduationCap, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RelatedResource } from '@/types/studyAssistant';

interface RelatedResourceCardProps {
  resource: RelatedResource;
  onNavigateToPage?: (pageNumber: number) => void;
}

export const RelatedResourceCard: React.FC<RelatedResourceCardProps> = ({ 
  resource, 
  onNavigateToPage 
}) => {
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
    } else if (resource.url) {
      window.open(resource.url, '_blank');
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
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
            {resource.duration && (
              <span>{resource.duration}</span>
            )}
            {resource.textbookPage && (
              <span>Page {resource.textbookPage}</span>
            )}
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};