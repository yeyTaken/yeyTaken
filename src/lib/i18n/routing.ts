import {defineRouting} from 'next-intl/routing';

export const defaultLocale = 'en';

export const routing = defineRouting({
  locales: [defaultLocale, 'pt'],

  // rotas customizadas (opcional)
  // pathnames: {
  //   "/about": {
  //     en: "/about",
  //     pt: "/sobre"
  //   }
  // },
 
  defaultLocale: defaultLocale
});