import React from 'react';
import { Brain, Lightbulb, BookOpen, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AIExplanation } from '@/types/studyAssistant';

interface AIExplanationCardProps {
  explanation: AIExplanation;
}

export const AIExplanationCard: React.FC<AIExplanationCardProps> = ({ explanation }) => {
  const getDifficultyColor = () => {
    switch (explanation.difficulty) {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{explanation.topic}</CardTitle>
          </div>
          <Badge className={getDifficultyColor()}>
            {explanation.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Explanation */}
        <div>
          <p className="text-sm leading-relaxed text-foreground/90">
            {explanation.explanation}
          </p>
        </div>

        <Separator />

        {/* Examples */}
        {explanation.examples.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Examples</h4>
            </div>
            <ul className="space-y-2">
              {explanation.examples.map((example, index) => (
                <li key={index} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/20">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Separator />

        {/* Key Terms */}
        {explanation.keyTerms.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Key Terms</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {explanation.keyTerms.map((term, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Related Concepts */}
        {explanation.relatedConcepts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Related Concepts</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {explanation.relatedConcepts.map((concept, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {concept}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};