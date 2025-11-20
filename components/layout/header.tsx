// ============================================
// components/layout/header.tsx - ACTUALIZADO
// ============================================
import Link from "next/link";
import { SearchBar } from "@/components/search/search-bar";
import { UserMenu } from "@/components/layout/user-menu";
import { Music, Heart, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-(--color-background)/95 backdrop-blur supports-backdrop-filter:bg-(--color-background)/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Music className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">CifraClub</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Link
            href="/artistas"
            className="text-sm font-medium hover:text-primary transition-colors">
            Artistas
          </Link>
          <Link
            href="/categorias"
            className="text-sm font-medium hover:text-primary transition-colors">
            Categorías
          </Link>
          <Link
            href="/favoritos"
            className="text-sm font-medium hover:text-primary transition-colors">
            <Heart className="h-5 w-5" />
          </Link>
          <UserMenu />
        </nav>

        {/* Mobile Menu */}
        <button className="md:hidden ml-auto">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
