// ============================================
// components/layout/footer.tsx
// ============================================
import Link from "next/link";
import { Music, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-(--color-muted)/30 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">CifraClub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La mejor plataforma de cifras y tablaturas en español
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Explorar */}
          <div>
            <h3 className="font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/artistas"
                  className="hover:text-(--color-foreground)">
                  Artistas
                </Link>
              </li>
              <li>
                <Link
                  href="/cifras"
                  className="hover:text-(--color-foreground)">
                  Cifras
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="hover:text-(--color-foreground)">
                  Categorías
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="hover:text-(--color-foreground)">
                  Tendencias
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/ayuda" className="hover:text-(--color-foreground)">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  href="/tutoriales"
                  className="hover:text-(--color-foreground)">
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-(--color-foreground)">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-(--color-foreground)">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/terminos"
                  className="hover:text-(--color-foreground)">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="hover:text-(--color-foreground)">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-(--color-foreground)">
                  Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-(--color-foreground)">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 CifraClub Clone. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
