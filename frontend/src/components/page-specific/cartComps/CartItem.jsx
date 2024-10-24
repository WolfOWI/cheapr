// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState } from "react";

// Services
import { updateProductQuantity } from "../../../services/userService";

// Utility Functions
import { formatName } from "../../../utils/wordFormatUtils";

// Third-Party Components
import { Stack } from "react-bootstrap";

// Internal Components
import IconBtn from "../../button/IconBtn";

// Imagery
// -

// -----------------------------------------------------------

const CartItem = ({ product, store, cheapestStores, quantity, onStoreSelect, refreshCart }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [itemQuant, setItemQuant] = useState(quantity); // Frontend-Only Quantity State (to improve speed)

  // console.log(
  //   "CartItem received:",
  //   "product:",
  //   product,
  //   "store:",
  //   store,
  //   "cheapestStores:",
  //   quantity,
  //   "quantity:",
  //   store,
  //   "onStoreSelect:",
  //   onStoreSelect
  // );

  const handleIncreaseQuantity = () => {
    setItemQuant((current) => current + 1);

    // Update the backend asynchronously
    updateProductQuantity(product.productId, itemQuant + 1)
      .then(() => {
        refreshCart();
      })
      .catch((error) => {
        console.error("Failed to increase quantity:", error);
      });
  };

  const handleDecreaseQuantity = () => {
    if (itemQuant > 1) {
      setItemQuant((current) => current - 1);

      // Update the backend asynchronously
      updateProductQuantity(product.productId, itemQuant - 1)
        .then(() => {
          refreshCart(); // Optional: refresh cart after backend update
        })
        .catch((error) => {
          console.error("Failed to decrease quantity:", error);
        });
    }
  };

  return (
    <>
      <div className="flex items-center group h-[80px]">
        <div className="relative mr-3">
          <img src={product.productInfo.image} alt="" className="w-16" />
          {quantity !== 1 && (
            <div className="bg-primary rounded-full h-8 w-8 flex justify-center items-center text-white font-bold absolute bottom-0 right-0 transition-all duration-150 group-hover:h-full group-hover:w-full ">
              {itemQuant}
            </div>
          )}
          <div className="bg-primary rounded-full h-8 w-8 flex  justify-center items-center text-white font-bold absolute bottom-0 right-0 transition-all duration-150 group-hover:h-full group-hover:w-full opacity-0 group-hover:opacity-100">
            {itemQuant}
          </div>
        </div>
        <div>
          <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-150">
            <h5 className="font-bold mb-1">{`${product.productInfo.name} (${product.productInfo.amount}${product.productInfo.unit})`}</h5>

            {itemQuant > 1 ? (
              <div className="flex items-center space-x-3">
                <p>{`R98.76`}</p>
                <small className="text-neutral-400 opacity-0 group-hover:opacity-100">{`R${product.productInfo[store].price} / item`}</small>
              </div>
            ) : (
              <p>{`R${product.productInfo[store].price}`}</p>
            )}
          </div>
          {/*  */}
          <Stack
            direction="horizontal"
            gap={1}
            className="opacity-0 group-hover:opacity-100 transition-all duration-150"
          >
            <IconBtn
              variant="tertiary-special"
              iconType="minus"
              size="sm"
              onClick={handleDecreaseQuantity}
            />
            <IconBtn
              variant="tertiary-special"
              iconType="add"
              size="sm"
              onClick={handleIncreaseQuantity}
            />
            {/* Dropdown for multiple cheapest stores */}
            {cheapestStores.length > 1 && (
              <div className="relative">
                <IconBtn
                  variant="primary"
                  iconType="bounce"
                  size="sm"
                  onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown
                />
                {showDropdown && (
                  <div className="dropdown-menu show absolute top-0 translate-y-10">
                    <h4 className="text-center cursor-default">Move To</h4>
                    {cheapestStores.map((storeItem, idx) => (
                      <button
                        className="dropdown-item"
                        key={idx}
                        type="button"
                        onClick={() => {
                          onStoreSelect(storeItem.store, product);
                          setShowDropdown(false); // Hide dropdown after selection
                        }}
                      >
                        {formatName(storeItem.store)}
                      </button>
                    ))}
                    <p className="text-center cursor-default text-sm text-neutral-500 mt-2">
                      (Same Priced Stores)
                    </p>
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
