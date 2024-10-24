// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState } from "react";

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Stack } from "react-bootstrap";

// Internal Components
import IconBtn from "../../button/IconBtn";

// Imagery
// -

// -----------------------------------------------------------

const CartItem = ({ product, store, cheapestStores, quantity }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(cheapestStores);

  return (
    <>
      <div className="flex items-center group h-[80px]">
        <div className="relative mr-3">
          <img src={product.image} alt="" className="w-16" />
          <div className="bg-primary rounded-full h-8 w-8 flex justify-center items-center text-white font-bold absolute bottom-0 right-0 transition-all duration-150 group-hover:h-full group-hover:w-full ">
            {quantity}
          </div>
        </div>
        <div>
          <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-150">
            <h5 className="font-bold">{`${product.name} (${product.amount}${product.unit})`}</h5>
            <p>{`R${product[store].price}`}</p>
          </div>
          {/*  */}
          <Stack
            direction="horizontal"
            gap={1}
            className="opacity-0 group-hover:opacity-100 transition-all duration-150"
          >
            <IconBtn variant="tertiary-special" iconType="minus" size="sm" />
            <IconBtn variant="tertiary-special" iconType="add" size="sm" />
            {/* Dropdown for multiple cheapest stores */}
            {cheapestStores.length > 1 && (
              <div className="relative">
                <IconBtn
                  variant="primary"
                  iconType="bounce"
                  size="sm"
                  onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
                />
                {showDropdown && (
                  <div className="dropdown-menu show absolute top-0 translate-y-10">
                    {cheapestStores.map((storeItem, idx) => (
                      <button className="dropdown-item" key={idx} type="button">
                        {storeItem.store}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <IconBtn variant="dark" iconType="delete" size="sm" />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default CartItem;
