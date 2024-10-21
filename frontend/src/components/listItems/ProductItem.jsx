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

// Imagery
// -

// -----------------------------------------------------------

const ProductItem = ({ product, admin, onViewClick, onEditClick, onDeleteClick, onCartClick }) => {
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
      <Row
        className={`align-items-center group ${!admin && "cursor-pointer"}`}
        onClick={onViewClick}
      >
        {/* Product Information */}
        <Col xs={3} className="flex items-center">
          <img src={product.image} alt={product.name} className="h-20 w-20 object-contain mr-4" />
          <div>
            <h4>{product.name}</h4>
            <h4 className="text-neutral-500 font-normal">
              {product.amount}
              {product.unit}
            </h4>
          </div>
        </Col>
        <PriceBlock
          price={product.pnp.price}
          updated={product.pnp.updated}
          onSpecial={!!product.pnp.special}
          isCheapest={
            parseFloat(product.pnp.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
          price={product.woolworths.price}
          updated={product.woolworths.updated}
          onSpecial={!!product.woolworths.special}
          isCheapest={
            parseFloat(product.woolworths.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
          price={product.checkers.price}
          updated={product.checkers.updated}
          onSpecial={!!product.checkers.special}
          isCheapest={
            parseFloat(product.checkers.price).toFixed(2) === parseFloat(cheapestPrice).toFixed(2)
          }
        />
        <PriceBlock
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
          ) : (
            <IconBtn
              iconType={"cart_add"}
              className="opacity-0 group-hover:opacity-100 transition-all duration-150"
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProductItem;
