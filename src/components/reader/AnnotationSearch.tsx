import { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, HighlighterIcon, StickyNote, Calendar, Filter, BookOpen } from 'lucide-react';
import { Annotation } from '@/types/textbook';
import { Textbook } from '@/types/textbook';
import { getPageContent } from '@/data/dummyTextbooks';
import { format } from 'date-fns';

interface AnnotationSearchProps {
  book: Textbook;
  annotations: Annotation[];
  isOpen: boolean;
  onClose: () => void;
  onNavigateToAnnotation: (pageNumber: number) => void;
}

export default function AnnotationSearch({
  book,
  annotations,
  isOpen,
  onClose,
  onNavigateToAnnotation
}: AnnotationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'highlight' | 'note'>('all');
  const [filterColor, setFilterColor] = useState<'all' | Annotation['color']>('all');
  const [sortBy, setSortBy] = useState<'date' | 'page'>('date');

  // Search in book content
  const bookSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const results: { pageNumber: number; content: string; preview: string }[] = [];
    
    for (let i = 1; i <= book.metadata.totalPages; i++) {
      const content = getPageContent(book.metadata.id, i);
      if (content) {
        // Strip HTML tags for search
        const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const lowerContent = textContent.toLowerCase();
        const lowerQuery = searchQuery.toLowerCase();
        
        if (lowerContent.includes(lowerQuery)) {
          // Find the position of the search term and create a preview
          const index = lowerContent.indexOf(lowerQuery);
          const start = Math.max(0, index - 50);
          const end = Math.min(textContent.length, index + searchQuery.length + 50);
          let preview = textContent.substring(start, end);
          
          // Add ellipsis if truncated
          if (start > 0) preview = '...' + preview;
          if (end < textContent.length) preview = preview + '...';
          
          // Highlight the search term in preview
          const regex = new RegExp(`(${searchQuery})`, 'gi');
          preview = preview.replace(regex, '<mark>$1</mark>');
          
          results.push({
            pageNumber: i,
            content: textContent,
            preview
          });
        }
      }
    }
    
    return results;
  }, [book.metadata.id, book.metadata.totalPages, searchQuery]);

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
            Search
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 mt-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search in book and annotations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="book" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="book" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Book Content
              </TabsTrigger>
              <TabsTrigger value="annotations" className="flex items-center gap-2">
                <HighlighterIcon className="h-4 w-4" />
                Annotations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="book" className="space-y-4">
              {/* Results Count */}
              <div className="text-sm text-muted-foreground">
                {bookSearchResults.length} results in book content
              </div>

              {/* Book Search Results */}
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="space-y-3">
                  {bookSearchResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleNavigate(result.pageNumber)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          Page {result.pageNumber}
                        </Badge>
                      </div>
                      
                      <div 
                        className="text-sm text-foreground/80 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: result.preview }}
                      />
                    </div>
                  ))}

                  {searchQuery && bookSearchResults.length === 0 && (
                    <div className="text-center py-8">
                      <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="font-medium mb-2">No results found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try different search terms
                      </p>
                    </div>
                  )}

                  {!searchQuery && (
                    <div className="text-center py-8">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="font-medium mb-2">Search the book</h3>
                      <p className="text-sm text-muted-foreground">
                        Enter keywords to search through the book content
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="annotations" className="space-y-4">
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

              {/* Annotation Results */}
              <ScrollArea className="h-[calc(100vh-400px)]">
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
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}