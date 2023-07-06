
  import Hero from "~/components/Hero";
  import {
    useLoaderData,
  } from '@remix-run/react';
import { Suspense } from "react";
import ProductCard from '~/components/ProductCard';

  export async function loader({context}) {
    const {products} = await context.storefront.query(QUERY);
    return {products};
  }

  export default function Index() {
    const {products: {nodes}} = useLoaderData();
    return(
        <>
        <Hero />
        <Suspense>
            <div className="container">
                <div className="product-grid">
                  {nodes.map((product, index) =>{
                    return (
                     <ProductCard key={index} product={product} />
                    )
                  })}
                </div>
            </div>
        </Suspense>
        </>
    )
}

const QUERY = `#graphql
query products {
  products(first: 9) {
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
}`;