'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartQuantity: number;
  isSignedIn: boolean;
  collections: Array<{ id: string; name: string; slug: string }>;
}

export function Header({ cartQuantity, isSignedIn, collections }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setShowSearch(false);
    setSearchQuery('');
  };

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  // Helper function to generate collection slug
  const getCollectionSlug = (category: string, item: string): string => {
    const base = category === 'engagement' ? 'engagement' : 'wedding';
    const itemSlug = item.toLowerCase().replace(/\s+/g, '-');
    return `${base}-${itemSlug}`;
  };

  // Diamond shop specific categories
  const engagementCategories = {
    'By Shape': ['Round', 'Princess', 'Emerald', 'Oval', 'Cushion', 'Pear'],
    'By Setting': ['Solitaire', 'Halo', 'Three Stone', 'Vintage', 'Modern'],
    'By Metal': ['Platinum', 'White Gold', 'Yellow Gold', 'Rose Gold'],
  };

  const weddingCategories = {
    "Women's": [
      'Classic Bands',
      'Diamond Bands',
      'Eternity Rings',
      'Curved Bands',
    ],
    "Men's": [
      'Classic Bands',
      'Diamond Bands',
      'Modern Bands',
      'Textured Bands',
    ],
    Sets: ['Matching Sets', 'Bridal Sets', 'Custom Sets'],
  };

  return (
    <header className="w-full bg-[hsl(var(--card))] shadow-[var(--shadow-card)] sticky top-0 z-50">
      {/* Main Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Header main row */}
          <div className="relative flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center space-x-1">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:text-[hsl(var(--foreground))] rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-[hsl(var(--lead-text))]" />
              </button>

              {/* Logo — centered on desktop, inline on mobile */}
              <Link
                href="/"
                className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3"
              >
                <h1 className="text-nowrap font-luxury-serif text-3xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] leading-tight">
                  Ever & Always
                </h1>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
              {/* Desktop Search */}
              <div className="hidden lg:flex items-center space-x-2">
                {showSearch ? (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      type="text"
                      placeholder="Search diamonds, collections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-3 py-2 border border-[hsl(var(--secondary))] rounded-lg focus:border-[hsl(var(--secondary))] focus:border-transparent w-64"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="p-2 hover:text-[hsl(var(--foreground))] rounded-lg transition-colors"
                    >
                      <Search className="w-5 h-5 text-[hsl(var(--secondary))]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSearch(false)}
                      className="p-2 hover:text-[hsl(var(--foreground))] rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-[hsl(var(--lead-text))]" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowSearch(true)}
                    className="p-2 hover:text-[hsl(var(--foreground))] rounded-lg transition-colors"
                  >
                    <Search className="w-5 h-5 text-[hsl(var(--lead-text))]" />
                  </button>
                )}
              </div>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="p-2 hover:text-[hsl(var(--foreground))] rounded-lg transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-[hsl(var(--lead-text))]" />
                  ) : (
                    <Moon className="w-5 h-5 text-[hsl(var(--lead-text))]" />
                  )}
                </button>
              )}

              {/* Profile */}
              <Link
                href={isSignedIn ? '/account' : '/sign-in'}
                className="p-2 hover:text-[hsl(var(--foreground))] rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-[hsl(var(--lead-text))]" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 hover:text-[hsl(var(--foreground))] rounded-lg transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5 text-[hsl(var(--lead-text))]" />
                {cartQuantity > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-normal">
                    {cartQuantity}
                  </div>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Field - Shown below title in mobile mode */}
          <div className="md:hidden mt-2 sm:mt-3">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 sm:h-10 w-full pl-3 sm:pl-4 pr-10 py-2 font-luxury-sans text-xs sm:text-sm 
                border border-[hsl(var(--primary))] border-opacity-50 rounded-lg
                focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-opacity-50
                focus-visible:ring-offset-2 focus-visible:border-transparent
                bg-[hsl(var(--card))] shadow-sm"
              />
              <Button
                variant="ghost"
                size="lg"
                type="submit"
                className="absolute right-0 h-6 w-6 p-0 rounded-full
            hover:bg-[hsl(var(--muted))] 
            focus-visible:ring-1 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-opacity-30"
              >
                <Search className="w-4 h-4 text-[hsl(var(--lead-text))]" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Secondary Header - Navigation */}
      <div className="hidden md:block border-t border-[hsl(var(--border))] bg-[hsl(var(--surface-luxury))]">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-center space-x-8">
            {/* Engagement Rings Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('engagement')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center rounded-md hover:rounded-b-none space-x-4 px-2 py-1.5 text-[hsl(var(--lead-text))] hover:text-[hsl(var(--foreground))] font-normal transition-colors">
                <span>Engagement Rings</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              {activeDropdown === 'engagement' && (
                <div className="absolute top-full left-0 w-96 bg-[hsl(var(--card))] shadow-2xl rounded-lg z-50 rounded-tl-none">
                  <div className="p-6 grid grid-cols-2 gap-6">
                    {Object.entries(engagementCategories).map(
                      ([category, items]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-[hsl(var(--lead-text))] mb-3 text-sm uppercase tracking-wide">
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <Link
                                key={item}
                                href={`/collection/${getCollectionSlug('engagement', item)}`}
                                className="block text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--lead-text))] py-1 transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wedding Rings Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown('wedding')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center rounded-md hover:rounded-b-none space-x-4 px-2 py-1.5 text-[hsl(var(--lead-text))] hover:text-[hsl(var(--foreground))] font-normal transition-colors">
                <span>Wedding Rings</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>

              {activeDropdown === 'wedding' && (
                <div className="absolute top-full left-0 w-96 bg-[hsl(var(--card))] shadow-2xl border rounded-lg z-50 rounded-tl-none">
                  <div className="p-6 grid grid-cols-2 gap-6">
                    {Object.entries(weddingCategories).map(
                      ([category, items]) => (
                        <div key={category}>
                          <h3 className="font-semibold text-[hsl(var(--lead-text))] mb-3 text-sm uppercase tracking-wide">
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <Link
                                key={item}
                                href={`/collection/${getCollectionSlug('wedding', item)}`}
                                className="block text-sm text-[hsl(var(--foreground))] hover:text-[hsl(var(--lead-text))] py-1 transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Jewelry */}
            <Link
              href="/search?q=custom"
              className="py-4 text-[hsl(var(--lead-text))] hover:text-gray-900 font-normal transition-colors"
            >
              Custom Jewelry
            </Link>

            {/* About */}
            <Link
              href="/about"
              className="py-4 text-[hsl(var(--lead-text))] hover:text-gray-900 font-normal transition-colors"
            >
              About Us
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute left-0 top-0 bottom-0 w-80 bg-[hsl(var(--card))] shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-[hsl(var(--border))]">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <h1 className="font-luxury-serif text-2xl font-bold text-[hsl(var(--foreground))] leading-tight">
                    Ever & Always
                  </h1>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:text-[hsl(var(--foreground))] rounded-lg"
                >
                  <X className="w-5 h-5 text-[hsl(var(--lead-text))]" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 pr-4 border border-[hsl(var(--border))] rounded-lg focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                </div>
              </form>

              <nav className="space-y-1">
                <div className="font-semibold text-[hsl(var(--foreground))] px-4 py-2 text-sm uppercase tracking-wide">
                  Shop Categories
                </div>

                {/* Engagement Rings Mobile */}
                <div className="border border-[hsl(var(--border))] rounded-lg">
                  <div className="px-4 py-3 font-normal text-[hsl(var(--foreground))]">
                    Engagement Rings
                  </div>
                  <div className="px-4 pb-3 space-y-2">
                    <div className="text-sm text-[hsl(var(--muted-foreground))] font-normal">
                      By Shape
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {engagementCategories['By Shape']
                        .slice(0, 4)
                        .map((shape) => (
                          <Link
                            key={shape}
                            href={`/collection/${getCollectionSlug('engagement', shape)}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] py-1"
                          >
                            {shape}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Wedding Rings Mobile */}
                <div className="border border-[hsl(var(--border))] rounded-lg">
                  <div className="px-4 py-3 font-normal text-[hsl(var(--foreground))]">
                    Wedding Rings
                  </div>
                  <div className="px-4 pb-3 space-y-2">
                    <div className="text-sm text-[hsl(var(--muted-foreground))] font-normal">
                      Women's
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      {weddingCategories["Women's"].slice(0, 4).map((item) => (
                        <Link
                          key={item}
                          href={`/collection/${getCollectionSlug('wedding', item)}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] py-1"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Other Collections */}
                {collections.map((collection) => (
                  <Link
                    key={collection.id}
                    href={`/collection/${collection.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 px-4 text-[hsl(var(--lead-text))] hover:text-[hsl(var(--foreground))] rounded-lg font-normal transition-colors"
                  >
                    {collection.name}
                  </Link>
                ))}

                <Link
                  href="/search?q=custom"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-[hsl(var(--lead-text))] hover:text-[hsl(var(--foreground))] rounded-lg font-normal transition-colors"
                >
                  Custom Jewelry
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-[hsl(var(--lead-text))] hover:text-[hsl(var(--foreground))] rounded-lg font-normal transition-colors"
                >
                  About Us
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
