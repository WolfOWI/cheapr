// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
import { getCheapestPrice } from "../../utils/priceUtils";

// Third-Party Components
import { Row, Col, Stack } from "react-bootstrap";

// Internal Components
import PriceBlock from "../building-blocks/PriceBlock";
import IconBtn from "../button/IconBtn";
import Btn from "../button/Btn";
import Icon from "../building-blocks/Icon";

// Imagery
// -

// -----------------------------------------------------------

const ProductItem = ({
  product,
  admin,
  onViewClick,
  onEditClick,
  onDeleteClick,
  onAddCartClick,
  onRemoveCartClick,
}) => {
  // Array of prices from different stores

  const prices = [
    { store: "pnp", price: product.pnp.price },
    { store: "woolworths", price: product.woolworths.price },
    { store: "checkers", price: product.checkers.price },
    { store: "spar", price: product.spar.price },
  ];

  // Get the cheapest price
  const cheapestPrice = getCheapestPrice(prices).cheapestPrice;
  // console.log("Cheapest:");
  // console.log(cheapestPrice);
  // console.log("Parse Int:");
  // console.log(parseInt(cheapestPrice));

  return (
    <>
      {/* Mobile View */}
      <Row
        className={`mb-12 align-items-center group ${!admin && "cursor-pointer"} lg:hidden`}
        onClick={onViewClick}
      >
        {/* Product Information */}
        <Col xs={12} className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="max-h-20 max-w-20 min-h-20 min-w-20 mr-4 relative">
              <img src={product.image} alt={product.name} className="object-contain absolute" />

              {product.inCart && (
                <div className="h-8 w-8 absolute right-0 bottom-0 bg-priM1 flex items-center justify-center rounded-full">
                  <Icon type={"cart_full"} className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            <div>
              <h4>{product.name}</h4>
              <h4 className="text-neutral-500 font-normal">
                {product.amount}
                {product.unit}
              </h4>
            </div>
          </div>
          <div>
            {admin ? (
              <Stack direction="horizontal" gap={2}>
                <IconBtn iconType={"edit"} size="md" onClick={onEditClick} />
                <IconBtn iconType={"delete"} size="md" variant="dark" onClick={onDeleteClick} />
              </Stack>
            ) : product.inCart ? (
              <IconBtn
                iconType="cart_clear"
                variant="dark"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent from going to individual product page
                  onRemoveCartClick();
                }}
              />
            ) : (
              <IconBtn
                iconType="cart_add"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent from going to individual product page
                  onAddCartClick();
                }}
              />
            )}
          </div>
        </Col>
        <PriceBlock
          store={"pnp"}
          price={product.pnp.price}
          updated={product.pnp.updated}
          onSpecial={!!product.pnp.special}
          isCheapest={
            parseFloat(product.pnp.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
          store={"woolworths"}
          price={product.woolworths.price}
          updated={product.woolworths.updated}
          onSpecial={!!product.woolworths.special}
          isCheapest={
            parseFloat(product.woolworths.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
          store={"checkers"}
          price={product.checkers.price}
          updated={product.checkers.updated}
          onSpecial={!!product.checkers.special}
          isCheapest={
            parseFloat(product.checkers.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
          store={"spar"}
          price={product.spar.price}
          updated={product.spar.updated}
          onSpecial={!!product.spar.special}
          isCheapest={
            parseFloat(product.spar.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
      </Row>
      {/* Larger Desktop View */}
      <Row
        className={`align-items-center group ${!admin && "cursor-pointer"} hidden lg:flex`}
        onClick={onViewClick}
      >
        {/* Product Information */}
        <Col xs={3} className="flex items-center">
          <div className="max-h-20 max-w-20 min-h-20 min-w-20 mr-4 relative">
            <img src={product.image} alt={product.name} className="object-contain absolute" />

            {product.inCart && (
              <div className="h-8 w-8 absolute right-0 bottom-0 bg-priM1 flex items-center justify-center rounded-full">
                <Icon type={"cart_full"} className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          <div>
            <h4>{product.name}</h4>
            <h4 className="text-neutral-500 font-normal">
              {product.amount}
              {product.unit}
            </h4>
          </div>
        </Col>
        <PriceBlock
          store={"pnp"}
          price={product.pnp.price}
          updated={product.pnp.updated}
          onSpecial={!!product.pnp.special}
          isCheapest={
            parseFloat(product.pnp.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
          store={"woolworths"}
          price={product.woolworths.price}
          updated={product.woolworths.updated}
          onSpecial={!!product.woolworths.special}
          isCheapest={
            parseFloat(product.woolworths.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
          store={"checkers"}
          price={product.checkers.price}
          updated={product.checkers.updated}
          onSpecial={!!product.checkers.special}
          isCheapest={
            parseFloat(product.checkers.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
          store={"spar"}
          price={product.spar.price}
          updated={product.spar.updated}
          onSpecial={!!product.spar.special}
          isCheapest={
            parseFloat(product.spar.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <Col xs={1}>
          {admin ? (
            <Stack direction="horizontal" gap={2}>
              <IconBtn
                iconType={"edit"}
                size="md"
                className="opacity-0 group-hover:opacity-100 transition-all duration-150"
                onClick={onEditClick}
              />
              <IconBtn
                iconType={"delete"}
                size="md"
                variant="dark"
                className="opacity-0 group-hover:opacity-100 transition-all duration-150"
                onClick={onDeleteClick}
              />
            </Stack>
          ) : product.inCart ? (
            <IconBtn
              iconType="cart_clear"
              variant="dark"
              className="opacity-0 group-hover:opacity-100 transition-all duration-150"
              onClick={(e) => {
                e.stopPropagation(); // Prevent from going to individual product page
                onRemoveCartClick();
              }}
            />
          ) : (
            <IconBtn
              iconType="cart_add"
              className="opacity-0 group-hover:opacity-100 transition-all duration-150"
              onClick={(e) => {
                e.stopPropagation(); // Prevent from going to individual product page
                onAddCartClick();
              }}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductItem;
