import { CartProvider } from '@/components/cart/cart-context';
import { Navbar } from '@/components/layout/navbar';
import { WelcomeToast } from '@/components/ui/welcome-toast';
import { ShopUnavailableBanner } from '@/components/ui/shop-unavailable-banner';
import { Manrope } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { SHOP_UNAVAILABLE_USER_MESSAGE, getCart, isShopifyUnavailableError } from 'lib/shopify';
import { ReactNode, Suspense } from 'react';
import { Toaster } from 'sonner';
import { RootProvider } from 'fumadocs-ui/provider/next';

import './globals.css';
// import { baseUrl } from 'lib/utils';
import { Viewport } from 'next';
import Footer from '@/components/layout/footer';

// const { SITE_NAME } = process.env;

// export const metadata = {
//   metadataBase: new URL(baseUrl),
//   title: {
//     default: SITE_NAME!,
//     template: `%s | ${SITE_NAME}`
//   },
//   robots: {
//     follow: true,
//     index: true
//   }
// };
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  preload: true, // Add this
  fallback: ['system-ui', 'arial'] // Add fallback
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const cartResultPromise = getCart()
    .then((cart) => ({ cart, shopUnavailable: false }))
    .catch((error) => {
      if (isShopifyUnavailableError(error)) {
        return { cart: undefined, shopUnavailable: true };
      }

      throw error;
    });

  const cartPromise = cartResultPromise.then((result) => result.cart);
  const shopUnavailablePromise = cartResultPromise.then(
    (result) => result.shopUnavailable
  );

  return (
    <html suppressHydrationWarning lang="en" className={manrope.variable}>
      <body
        className="antialiased lg:mx-auto"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem={true}
          storageKey='bloggen-commerce-starter-theme'
          disableTransitionOnChange>
          <Suspense fallback={null}>
            <CartProvider
              cartPromise={cartPromise}
              shopUnavailablePromise={shopUnavailablePromise}
              unavailableMessage={SHOP_UNAVAILABLE_USER_MESSAGE}
            >
              <Navbar />
              <main className={`h-full min-h-[calc(100vh-276px)]  bg-gradient-to-b from-canvas-bg to-canvas-bg-base md:px-0`}>
                <Suspense fallback={null}>
                  <ShopUnavailableBanner />
                </Suspense>
                <RootProvider>
                  <Suspense fallback={null}>
                    {children}
                  </Suspense>
                </RootProvider>
                <Toaster closeButton />
                <WelcomeToast />
              </main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </CartProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
