import {useLoaderData} from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import {CacheLong, Seo} from '@shopify/hydrogen';
import {Suspense} from 'react';
import ProductDetails from '~/components/ProductDetails';

const seo = ({data}) => ({
  title: data?.product?.seo?.title,
  description: data?.product?.seo?.description,
});

export const handle = {
  seo,
};

//debugging
function PrintJson({data}) {
  return (
    <details>
      <summary>Product JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
}

export async function loader({params, context, request}) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

// optionally set a default variant so you always have an "orderable" product selected
const selectedVariant =
  product.selectedVariant ?? product?.variants?.nodes[0];

  return json({
    product,
    selectedVariant
  });
}

export default function Product() {
  const {product, selectedVariant} = useLoaderData();

  return (
    <>
      <Suspense>
        <div className="product-page container">
          <ProductDetails product={product} selectedVariant={selectedVariant}/>
        </div>
        {/* <PrintJson data={product} /> */}
      </Suspense>
    </>
  );
}

const PRODUCT_QUERY = `#graphql
query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle){
     title
      id
      seo{
        description
        title
      }
      vendor
      descriptionHtml
      featuredImage{
        id
        url
        altText
        width
        height
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
    }
  }`;
