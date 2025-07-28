import { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, HighlighterIcon, StickyNote, Calendar, Filter } from 'lucide-react';
import { Annotation } from '@/types/textbook';
import { format } from 'date-fns';

interface AnnotationSearchProps {
  annotations: Annotation[];
  isOpen: boolean;
  onClose: () => void;
  onNavigateToAnnotation: (pageNumber: number) => void;
}

export default function AnnotationSearch({
  annotations,
  isOpen,
  onClose,
  onNavigateToAnnotation
}: AnnotationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'highlight' | 'note'>('all');
  const [filterColor, setFilterColor] = useState<'all' | Annotation['color']>('all');
  const [sortBy, setSortBy] = useState<'date' | 'page'>('date');

  const filteredAndSortedAnnotations = useMemo(() => {
    let filtered = annotations.filter(annotation => {
      const matchesSearch = searchQuery === '' || 
        annotation.selectedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (annotation.note && annotation.note.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = filterType === 'all' || annotation.type === filterType;
      const matchesColor = filterColor === 'all' || annotation.color === filterColor;
      
      return matchesSearch && matchesType && matchesColor;
    });

    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      filtered.sort((a, b) => a.pageNumber - b.pageNumber);
    }

    return filtered;
  }, [annotations, searchQuery, filterType, filterColor, sortBy]);

  const handleNavigate = (pageNumber: number) => {
    onNavigateToAnnotation(pageNumber);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterColor('all');
    setSortBy('date');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Annotations
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 mt-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search annotations and notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Select value={filterType} onValueChange={(value: typeof filterType) => setFilterType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="highlight">Highlights</SelectItem>
                  <SelectItem value="note">Notes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterColor} onValueChange={(value: typeof filterColor) => setFilterColor(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colors</SelectItem>
                  <SelectItem value="yellow">Yellow</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="pink">Pink</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date Created</SelectItem>
                <SelectItem value="page">Page Number</SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || filterType !== 'all' || filterColor !== 'all' || sortBy !== 'date') && (
              <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedAnnotations.length} of {annotations.length} annotations
          </div>

          {/* Results */}
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-3">
              {filteredAndSortedAnnotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleNavigate(annotation.pageNumber)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {annotation.type === 'highlight' ? (
                        <HighlighterIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <StickyNote className="h-4 w-4 text-muted-foreground" />
                      )}
                      <Badge variant="outline">
                        Page {annotation.pageNumber}
                      </Badge>
                      <div className={`w-3 h-3 rounded bg-highlight-${annotation.color} border`} />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(annotation.createdAt), 'MMM d')}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-foreground/80 line-clamp-2">
                      "{annotation.selectedText}"
                    </p>
                    
                    {annotation.note && (
                      <div className="p-2 bg-muted rounded border-l-2 border-primary">
                        <p className="text-sm line-clamp-3">{annotation.note}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredAndSortedAnnotations.length === 0 && (
                <div className="text-center py-8">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium mb-2">No annotations found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery || filterType !== 'all' || filterColor !== 'all'
                      ? "Try adjusting your search or filters"
                      : "Start highlighting text to create annotations"}
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}