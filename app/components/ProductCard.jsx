import {Image, Money} from '@shopify/hydrogen';

export default function ProductCard({product}) {

    const {price: price, compareAtPrice: compareAtPrice} = product.variants.nodes[0] || {};
    const isOnSale = parseInt(compareAtPrice?.amount) > parseInt(price?.amount);

  return (
    <>
    <div className="product-grid-item">
      <div className="image-container">
        <Image
          alt={product.featuredImage.altText}
          data={product.featuredImage}
          sizes="(min-width: 180px) 360px, 600px"
        />
      </div>
      <div className="product-grid-item-title">{product.title}</div>
      <div className="product-grid-prices">
        <Money withoutTrailingZeros data={price} />
        {isOnSale && <Money withoutTrailingZeros className="product-compare-at-price" data={compareAtPrice} />}
      </div>
    </div>
    </>
  );
}
