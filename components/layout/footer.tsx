// ============================================
// components/layout/footer.tsx
// ============================================
import Link from 'next/link';
import { Music, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const Social = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Youtube, href: '#', name: 'Youtube' },
  ];
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-16 px-4 md:px-6">
        <div className="flex gap-4 justify-center mb-6">
          {Social.map(Icon => (
            <Link
              key={Icon.name}
              href={Icon.href}
              className="bg-background p-2 rounded-full shadow-sm hover:shadow-md hover:text-primary hover:-translate-y-0.5 transition-all duration-200 border border-border/50"
            >
              <Icon.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 items-center text-center md:grid-cols-4 gap-12 ">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">CifraClub</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              La mejor plataforma de cifras y tablaturas en español. Aprende a tocar tus canciones favoritas hoy mismo.
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h3 className="font-bold mb-6 text-foreground">Explorar</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {['Artistas', 'Cifras', 'Categorías', 'Tendencias'].map(item => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-primary hover:pl-1 transition-all duration-200 block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-bold mb-6 text-foreground">Recursos</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { name: 'Centro de Ayuda', href: '/ayuda' },
                { name: 'Tutoriales', href: '/tutoriales' },
                { name: 'Blog', href: '/blog' },
                { name: 'API', href: '/api' },
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary hover:pl-1 transition-all duration-200 block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-6 text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { name: 'Términos de Uso', href: '/terminos' },
                { name: 'Privacidad', href: '/privacidad' },
                { name: 'Cookies', href: '/cookies' },
                { name: 'Contacto', href: '/contacto' },
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary hover:pl-1 transition-all duration-200 block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 CifraClub Clone. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Sitemap
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
