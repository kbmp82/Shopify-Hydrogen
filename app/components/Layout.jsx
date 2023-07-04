import {
  useLoaderData,
  Link
} from '@remix-run/react';
import { Suspense } from 'react';


export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}) {
  const data = await context.storefront.query(LAYOUT_QUERY);
  return {data};
}

export function Layout({children, title}) {

  const {layout: {shop}} = useLoaderData();

  return (
    <div>
      <header
        role="banner"
      >
        <div>
          <Link to="/" className="container header-inner">
           {shop.name}
          </Link>
        </div>
      </header>

      <main
        role="main"
        id="mainContent"
      >
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
}

const LAYOUT_QUERY = `#graphql
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
