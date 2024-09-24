// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
import { getCheapestPrice } from "../../utils/priceUtils";

// Third-Party Components
import { Row, Col } from "react-bootstrap";

// Internal Components
// -

// Imagery
import appleTopRedImg from "../../assets/images/grocery-images/Apples_TopRed.png";
import PriceBlock from "../building-blocks/PriceBlock";
import IconBtn from "../button/IconBtn";

// -----------------------------------------------------------

const ProductItem = ({ product }) => {
  // Array of prices from different stores
  const prices = [
    { store: "pnp", price: product.pnp.price },
    { store: "woolworths", price: product.woolworths.price },
    { store: "checkers", price: product.checkers.price },
    { store: "spar", price: product.spar.price },
  ];

  // Get the cheapest price
  const cheapestPrice = getCheapestPrice(prices).cheapestPrice;
  console.log(cheapestPrice);

  return (
    <>
      <Row className="align-items-center group cursor-pointer ">
        {/* Product Information */}
        <Col xs={3} className="flex items-center">
          <img src={appleTopRedImg} alt={product.name} className="h-24" />
          <div>
            <h4 className="font-bold">{product.name}</h4>
            <h4 className="text-neutral-500">
              {product.amount}
              {product.unit}
            </h4>
          </div>
        </Col>
        <PriceBlock
          price={product.pnp.price}
          updated={product.pnp.updated}
          onSpecial={product.pnp.onSpecial}
          isCheapest={product.pnp.price === cheapestPrice}
        />
        <PriceBlock
          price={product.woolworths.price}
          updated={product.woolworths.updated}
          onSpecial={product.woolworths.onSpecial}
          isCheapest={product.woolworths.price === cheapestPrice}
        />
        <PriceBlock
          price={product.checkers.price}
          updated={product.checkers.updated}
          onSpecial={product.checkers.onSpecial}
          isCheapest={product.checkers.price === cheapestPrice}
        />
        <PriceBlock
          price={product.spar.price}
          updated={product.spar.updated}
          onSpecial={product.spar.onSpecial}
          isCheapest={product.spar.price === cheapestPrice}
        />
        <Col xs={1}>
          <IconBtn iconType={"cart_add"} className="hidden group-hover:block " />
        </Col>
      </Row>
    </>
  );
};

export default ProductItem;
