import {Image, Money} from '@shopify/hydrogen';
import ProductOptions from '~/components/ProductOptions';
import ProductATCForm from '~/components/ProductATCForm';

export default function ProductDetails({product, selectedVariant}) {
  return (
    <>
      <Image
        className="product-page-image"
        alt={product.featuredImage.altText}
        data={product.featuredImage}
      />
      <ProductForm product={product} selectedVariant={selectedVariant} />
    </>
  );
}

function ProductForm({product, selectedVariant}) {
  const {price: price, compareAtPrice: compareAtPrice} = selectedVariant || {};
  const isOnSale = parseInt(compareAtPrice?.amount) > parseInt(price?.amount);

  return (
    <div>
      <h1 className="title">{product.title}</h1>
      <h5>{product.vendor}</h5>
      <div className="product-page-price">
        <Money withoutTrailingZeros data={price} />
        {isOnSale && (
          <Money
            withoutTrailingZeros
            className="product-compare-at-price"
            data={compareAtPrice}
          />
        )}
      </div>
      <div
        className="product-description"
        dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
      ></div>
      {product.variants.nodes.length > 1 && (
        <ProductOptions
          options={product.options}
          selectedVariant={selectedVariant}
        />
      )}
      <ProductATCForm variantId={selectedVariant.id} availableForSale={selectedVariant.availableForSale}/>
    </div>
  );
}
