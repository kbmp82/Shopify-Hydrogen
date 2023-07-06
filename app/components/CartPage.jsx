import {Link, useFetcher} from '@remix-run/react';
import {
  flattenConnection,
  Image,
  Money,
} from '@shopify/hydrogen-react';

export function CartLineItems({linesObj}) {
  const lines = flattenConnection(linesObj);
  return (
      <table className="cart-table">
        <tbody>
          {lines.map((line, index) => {
            return <LineItem key={line.id} lineItem={line} />;
          })}
        </tbody>
      </table>
  );
}

function LineItem({lineItem}) {
  const {merchandise, quantity} = lineItem;
  console.log("merchandise", merchandise)
  return (
    <tr>
      <td>
        <Link
          to={`/products/${merchandise.product.handle}`}
          className="flex-shrink-0"
        >
          <Image
            className="line-item-image"
            data={merchandise.image}
            width={110}
            height={110}
          />
        </Link>
      </td>
      <td>
        <Link
          to={`/products/${merchandise.product.handle}`}
          className="line-item-product-title"
        >
          {merchandise.product.title}
        </Link>
        {merchandise.title !== 'Default Title' && (
            merchandise.selectedOptions.map(option =>{
                return <div key={lineItem.id} className="line-item-variant">{option.name}: {option.value}</div>
            })
        )}
        <ItemRemoveButton lineIds={[lineItem.id]} />
      </td>
      <td>
        <div className="cart-quantity-selector">Qty: {quantity}</div>
      </td>
      <td>
        <Money withoutTrailingZeros data={lineItem.cost.totalAmount} />
      </td>
    </tr>
  );
}

export function CartSummary({cost}) {
    return (
      <>
        <dl>
          <div className="cart-subtotal">
            <dt>Subtotal</dt>
            <dd>
              {cost?.subtotalAmount?.amount ? (
                <Money className="cart-subtotal-price" data={cost?.subtotalAmount} />
              ) : (
                '-'
              )}
            </dd>
          </div>
        </dl>
      </>
    );
  }
  
  export function CartActions({checkoutUrl}) {
    if (!checkoutUrl) return null;
  
    return (
        <a
          href={checkoutUrl}
          className="checkout-button"
        >
          Checkout
        </a>
    );
  }
  
function ItemRemoveButton({lineIds}) {
  const fetcher = useFetcher();

  return (
    <div className="remove-item">
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value="REMOVE_FROM_CART" />
      <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />
      <button className="cart-remove" type="submit">
        <IconRemove />
      </button>
    </fetcher.Form>
    </div>
  );
}

function IconRemove() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}

function IconDecrease() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
  );
}

function IconIncrease() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}

