// ============================================
// components/layout/header.tsx - ACTUALIZADO
// ============================================
import Link from 'next/link';
import { SearchBar } from '@/components/search/search-bar';
import { UserMenu } from '@/components/layout/user-menu';
import { Music, Heart, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="container flex h-16 items-center px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-6 group">
          <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
            <Music className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">CifraClub</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 ml-auto">
          <Link
            href="/artistas"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Artistas
          </Link>
          <Link
            href="/categorias"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Categorías
          </Link>
          <Link
            href="/favoritos"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <Heart className="h-4 w-4" />
            <span>Favoritos</span>
          </Link>
          <UserMenu />
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 md:hidden ml-auto">
          <div className="w-8 h-8">
            <SearchBar />
          </div>{' '}
          {/* Simplified search icon for mobile if SearchBar supports it, otherwise just keep it hidden or adjust */}
          <button className="p-2 hover:bg-accent rounded-md transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
