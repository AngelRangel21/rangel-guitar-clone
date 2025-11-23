// ============================================
// components/home/hero.tsx
// ============================================
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Music2, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Aprende a tocar tus
            <span className="text-primary"> canciones favoritas</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Miles de cifras, tablaturas y acordes de las mejores canciones en español
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Busca por canción, artista..." className="h-14 pl-12 text-lg" />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
                Buscar
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Music2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">50,000+</div>
              <div className="text-sm text-muted-foreground">Cifras</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-sm text-muted-foreground">Artistas</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm text-muted-foreground">Usuarios</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
