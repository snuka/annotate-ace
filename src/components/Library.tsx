import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { dummyTextbooks } from '@/data/dummyTextbooks';
import { Search, BookOpen, Filter, Grid, List } from 'lucide-react';
import { Textbook } from '@/types/textbook';

interface LibraryProps {
  onOpenBook: (book: Textbook) => void;
}

export default function Library({ onOpenBook }: LibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', ...new Set(dummyTextbooks.map(book => book.metadata.category))];
  
  const filteredBooks = dummyTextbooks.filter(book => {
    const matchesSearch = book.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.metadata.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.metadata.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.metadata.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-reader-heading">TextBook Reader</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search books, authors, subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Book Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredBooks.map(book => (
            <Card 
              key={book.metadata.id} 
              className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              onClick={() => onOpenBook(book)}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={book.metadata.coverImage} 
                      alt={`Cover of ${book.metadata.title}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-xs">
                        {book.metadata.totalPages} pages
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {book.metadata.title}
                    </CardTitle>
                    <CardDescription>
                      by {book.metadata.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{book.metadata.subject}</Badge>
                        <span className="text-muted-foreground">{book.metadata.edition}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {book.metadata.description}
                      </p>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <div className="w-24 overflow-hidden">
                    <img 
                      src={book.metadata.coverImage} 
                      alt={`Cover of ${book.metadata.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                            {book.metadata.title}
                          </CardTitle>
                          <CardDescription>
                            by {book.metadata.author} • {book.metadata.publisher} • {book.metadata.publicationYear}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {book.metadata.totalPages} pages
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="outline">{book.metadata.subject}</Badge>
                          <Badge variant="outline">{book.metadata.edition}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-md line-clamp-1">
                          {book.metadata.description}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse different categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}