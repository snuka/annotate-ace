import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { dummyTextbooks, getReadingProgress } from '@/data/dummyTextbooks';
import { Search, BookOpen, Filter, Grid, List, Clock, BookmarkCheck, Home, Bookmark, Settings, Calendar, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Textbook } from '@/types/textbook';

interface LibraryProps {
  onOpenBook: (book: Textbook) => void;
}

export default function Library({ onOpenBook }: LibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(dummyTextbooks.map(book => book.metadata.category))];
  
  const filteredBooks = dummyTextbooks.filter(book => {
    const matchesSearch = book.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.metadata.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.metadata.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.metadata.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get the most recently read book
  const recentBook = dummyTextbooks.find(book => {
    const progress = getReadingProgress(book.metadata.id);
    return progress && progress.lastReadAt;
  });
  const recentProgress = recentBook ? getReadingProgress(recentBook.metadata.id) : null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-20 bg-card border-r flex flex-col items-center py-6 space-y-6">
        <div className="p-2 bg-primary rounded-lg">
          <BookOpen className="h-6 w-6 text-primary-foreground" />
        </div>
        
        <nav className="flex flex-col space-y-4">
          <Button variant="ghost" size="icon" className="bg-primary/10 text-primary">
            <Home className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <BookOpen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Content Area */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search book name, author, edition ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-0"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <User className="h-8 w-8 bg-muted rounded-full p-2" />
                <span className="font-medium">Reader</span>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          {recentBook && recentProgress && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Happy reading!</h1>
                  <p className="text-muted-foreground text-lg mb-6">
                    Continue where you left off in your studies. Pick up from page {recentProgress.currentPage}.
                  </p>
                  <Button onClick={() => onOpenBook(recentBook)} size="lg" className="rounded-full">
                    Continue reading →
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-card/50 rounded-2xl p-8 backdrop-blur">
                  <div className="flex items-start gap-4">
                    <img 
                      src={recentBook.metadata.coverImage} 
                      alt={recentBook.metadata.title}
                      className="w-24 h-32 object-cover rounded-lg shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{recentBook.metadata.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        {recentProgress.currentPage} / {recentBook.metadata.totalPages} pages
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {recentBook.metadata.description}
                      </p>
                      <p className="text-sm font-medium mt-3">– {recentBook.metadata.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Popular Now Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Popular Now</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.slice(0, 4).map(book => {
                const progress = getReadingProgress(book.metadata.id);
                return (
                  <Card 
                    key={book.metadata.id}
                    className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                    onClick={() => onOpenBook(book)}
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                      <img 
                        src={book.metadata.coverImage} 
                        alt={book.metadata.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-1">{book.metadata.title}</h3>
                      <p className="text-sm text-muted-foreground italic">{book.metadata.subject}</p>
                      {progress && (
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>{progress.completionPercentage.toFixed(0)}%</span>
                          </div>
                          <Progress value={progress.completionPercentage} className="h-1" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* All Textbooks Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Textbook Collection</h2>
              <div className="flex gap-2">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => {
                const progress = getReadingProgress(book.metadata.id);
                return (
                  <Card 
                    key={book.metadata.id}
                    className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex"
                    onClick={() => onOpenBook(book)}
                  >
                    <div className="w-20 overflow-hidden rounded-l-lg">
                      <img 
                        src={book.metadata.coverImage} 
                        alt={book.metadata.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="font-semibold line-clamp-2 mb-1">{book.metadata.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        by {book.metadata.author} • {book.metadata.edition}
                      </p>
                      
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">{book.metadata.subject}</Badge>
                        <Badge variant="secondary" className="text-xs">{book.metadata.totalPages} pages</Badge>
                      </div>

                      {progress ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookmarkCheck className="h-3 w-3" />
                              <span>Page {progress.currentPage}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{Math.floor(progress.totalTimeRead / 60)}h {progress.totalTimeRead % 60}m</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Progress value={progress.completionPercentage} className="h-1.5" />
                            <div className="text-xs text-muted-foreground text-right">
                              {progress.completionPercentage.toFixed(1)}% complete
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Not started</p>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
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

        {/* Right Sidebar */}
        <div className="w-80 bg-card/30 p-6 space-y-8">
          {/* Reading Schedule */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Schedule Reading</h3>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-xs text-muted-foreground font-medium p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {[11, 12, 13, 14, 15, 16, 17].map(date => (
                <Button 
                  key={date} 
                  variant={date === 14 ? "default" : "ghost"} 
                  size="sm" 
                  className="h-8 w-8 p-0 text-sm"
                >
                  {date}
                </Button>
              ))}
            </div>
          </div>

          {/* Reading Stats */}
          <div className="space-y-4">
            <h3 className="font-semibold">Reading Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-medium">7h 30m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Books Completed</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Streak</span>
                <span className="font-medium">12 days</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                View Bookmarks
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Study Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}