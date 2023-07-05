import {Link, useLocation, useSearchParams, useNavigation} from '@remix-run/react';

export default function ProductOptions({options, selectedVariant}) {
  // pathname and search will be used to build option URLs
  const {pathname, search} = useLocation();

  //for default selected variant: selectedVariant
  const [currentSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const paramsWithDefaults = (() => {
    const defaultParams = new URLSearchParams(currentSearchParams);

    if (!selectedVariant) {
      return defaultParams;
    }

    for (const {name, value} of selectedVariant.selectedOptions) {
      if (!currentSearchParams.has(name)) {
        defaultParams.set(name, value);
      }
    }

    return defaultParams;
  })();

  // Update the in-flight request data from the 'navigation' (if available)
  // to create an optimistic UI that selects a link before the request is completed
  const searchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : paramsWithDefaults;

  return (
    <div className="product-options">

      {/* Each option will show a label and option value <Links> */}
      {options.map((option) => {
        if (!option.values.length) {
          return;
        }
        return (
          <div
            key={option.name}
            className="product-option-group"
          >
            <h3 className="product-option-name">
              {option.name}
            </h3>

            <div>
              {option.values.map((value) => {
                const checked = selectedVariant.selectedOptions[0].value == value;
                searchParams.set(option.name, value);
                return (
                  <Link
                    key={value}
                    to={`${pathname}?${searchParams.toString()}`}
                    preventScrollReset
                    replace
                    className={`product-option-value ${checked ? "selected" :""}`}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
