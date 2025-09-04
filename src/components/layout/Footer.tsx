import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  
  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/explore', label: t('nav.explore') },
    { href: '/about', label: t('footer.about') },
  ];

  const supportLinks = [
    { href: '/help', label: t('footer.help') },
    { href: '/contact', label: t('footer.contact') },
  ];

  const legalLinks = [
    { href: '/privacy', label: t('footer.privacy') },
    { href: '/terms', label: t('footer.terms') },
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">{t('footer.company')}</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Real Estate Street, City, Country</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@openhome.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 mb-6">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold text-foreground mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 OpenHome. {t('footer.allRightsReserved')}.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-muted-foreground text-sm">
                Made with ❤️ for finding perfect homes
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}