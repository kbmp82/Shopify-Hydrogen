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
import { Seo } from '@shopify/hydrogen';


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

export async function loader({context}) {
  const layout = await context.storefront.query(LAYOUT_QUERY);
  return {layout};
}


export const handle = {
  seo: {
    title: 'Custom Hydrogen Store',
    titleTemplate: '%s - A custom Hydrogen storefront',
    description:
      'Hydrogen is a React-based framework for building headless storefronts on Shopify.',
  },
}

export default function App() {
  const data = useLoaderData();

  const {name} = data.layout.shop;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Seo/>
        <Meta />
        <Links />
      </head>
      <body>
      <header
        role="banner"
      >
        <div className="container header-inner">
          <Link to="/" className="header-logo">
           {name}
          </Link>
          <ul className="header-navigation">
           <li><a href=""></a>Link</li>
           <li><a href=""></a>Link</li>
           <li><a href=""></a>Link</li>
          </ul>
          <div className="header-cart-link">Cart</div>
        </div>
      </header>
      <main
        role="main"
        id="mainContent"
      >
         <Outlet />
      </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;
