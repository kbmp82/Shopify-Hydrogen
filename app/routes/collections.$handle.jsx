import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import ProductCard from '~/components/ProductCard';

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({params, context}) {
  const {handle} = params;
  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
    },
  });

  // Handle 404s
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  return json({
    collection,
  });
}

export default function Collection() {
  const {collection} = useLoaderData();
  //collection products
  const {
    products: {nodes},
  } = collection;
  return (
    <>
      <Suspense>
        <div className="catalog-page container">
          <h1>{collection.title}</h1>
          <div className="product-grid">
            {nodes.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </div>
        </div>
      </Suspense>
    </>
  );
}

const COLLECTION_QUERY = `#graphql
query CollectionDetails($handle: String!) {
  collection(handle: $handle) {
    title
    description
    handle
    id
    seo {
        description
        title
    }
    products(first: 9){
    nodes {
      title
      handle
      id
      featuredImage{
        url
      }
        variants(first: 1){
          nodes {
            id
              price{
                amount
                currencyCode
              }
              compareAtPrice{
                amount
                currencyCode
              }
          }
        }
        }
    }
  }
}`;
