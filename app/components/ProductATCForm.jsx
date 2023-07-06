import {useMatches, useFetcher} from '@remix-run/react';

export default function ProductATCForm({variantId , availableForSale}) {
    const [root] = useMatches();
    const selectedLocale = root?.data?.selectedLocale;
    const fetcher = useFetcher();
  
    const lines = [{merchandiseId: variantId, quantity: 1}];
  
    return (
      <fetcher.Form action="/cart" method="post">
        <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
        <input
          type="hidden"
          name="countryCode"
          value={selectedLocale?.country ?? 'US'}
        />
        <input type="hidden" name="lines" value={JSON.stringify(lines)} />
        <button className="add-to-cart" disabled={!availableForSale}>
          {availableForSale ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </fetcher.Form>
    );
  }
