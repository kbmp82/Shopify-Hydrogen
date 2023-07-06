import {
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import styles from './styles/app.css';
import favicon from '../public/favicon.svg';
import {Seo} from '@shopify/hydrogen';
import CartHeader from './components/CartHeader';
import {defer} from '@shopify/remix-oxygen';
import {CART_QUERY} from '~/queries/cart';
import Footer from './components/Footer';

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export async function loader({context, request}) {
  const cartId = await context.session.get('cartId');

  return defer({
    cart: cartId ? getCart(context, cartId) : undefined,
    layout: await context.storefront.query(LAYOUT_QUERY),
  });
}

export const handle = {
  seo: {
    title: 'Stellar Threads - Custom Hydrogen Store',
    titleTemplate: '%s - A custom Hydrogen storefront',
    description:
      'Hydrogen is a React-based framework for building headless storefronts on Shopify.',
  },
};

export default function App() {
  const data = useLoaderData();

  const {name} = data.layout.shop;
  const cart = data.cart;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Seo />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="body-wrap">
        <header role="banner">
          <div className="container header-inner no-padding">
            <Link to="/" className="header-logo">
              {name}
            </Link>
            <ul className="header-navigation">
              <li>
                <Link to="/collections">All Products</Link>
              </li>
              <li>
                <Link to="/collections/shirts">Shirts</Link>
              </li>
              <li>
                <Link to="/collections/jackets">Jackets</Link>
              </li>
              <li>
                <Link to="/collections/tops">Tops</Link>
              </li>
            </ul>
            <Link to="/cart" className="header-cart-link">
              <CartHeader cart={cart}/>
            </Link>
          </div>
        </header>
        <main role="main" id="mainContent">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        </div>
      </body>
    </html>
  );
}

async function getCart({storefront}, cartId) {
  if (!storefront) {
    throw new Error('missing storefront client in cart query');
  }

  const {cart} = await storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  return cart;
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;
