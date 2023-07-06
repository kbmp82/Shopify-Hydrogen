import {Image} from '@shopify/hydrogen';

export default function Hero() {
  return (
    <div className="hero-wrap">
      <Image
        className="hero-image"
        src="https://cdn.shopify.com/s/files/1/0793/1461/6632/files/pexels-andrea-piacquadio-845434.jpg?v=1688661555"
      />
      <div className="hero-text-wrap">
        <div className="hero-text">
          <h1>Elevate Your Style</h1>
          <h1> Define Your Identity</h1>
        </div>
      </div>
    </div>
  );
}
