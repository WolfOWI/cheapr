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
import MiniStorePriceBlock from "../building-blocks/MiniStorePriceBlock";

// Imagery
import appleTopRedImg from "../../assets/images/grocery-images/Apples_TopRed.png";

// -----------------------------------------------------------

const AdminProductItem = ({ product, type }) => {
  return (
    <>
      <div className="flex justify-between group my-4 w-full">
        <div className="flex items-center">
          <img src={appleTopRedImg} alt={product.name} className="h-56" />
          <div className="ml-4">
            <Stack direction="horizontal" gap={2}>
              <h3 className="font-bold">{product.name}</h3>
              <h4 className="text-neutral-500">
                {product.amount}
                {product.unit}
              </h4>
            </Stack>
            <p>{`Food > Fruit & Vegetables > Fresh Fruit`}</p>
            <Stack direction="horizontal" gap={4} className="mt-6">
              <MiniStorePriceBlock
                store="pnp"
                price={product.pnp.price}
                updated={product.pnp.updated}
              />
              <MiniStorePriceBlock
                store="woolworths"
                price={product.woolworths.price}
                updated={product.woolworths.updated}
              />
              <MiniStorePriceBlock
                store="checkers"
                price={product.checkers.price}
                updated={product.checkers.updated}
              />
              <MiniStorePriceBlock
                store="spar"
                price={product.spar.price}
                updated={product.spar.updated}
              />
            </Stack>
          </div>
        </div>
        <Stack direction="horizontal" gap={2}>
          <IconBtn
            iconType={"wrong"}
            variant="dark"
            className="opacity-30 group-hover:opacity-100 transition-all duration-150"
          />
          <Btn className="opacity-30 group-hover:opacity-100 transition-all duration-150">
            Approve
          </Btn>
        </Stack>

        {/* <Col xs={1}>
          {type === "editDelete" ? (
            <Stack direction="horizontal" gap={2}>
              <IconBtn
                iconType={"edit"}
                size="md"
                className="opacity-0 group-hover:opacity-100 transition-all duration-150"
              />
              <IconBtn
                iconType={"delete"}
                size="md"
                variant="dark"
                className="opacity-0 group-hover:opacity-100 transition-all duration-150"
              />
            </Stack>
          ) : type === "approveDeny" ? (
            <Stack direction="horizontal" gap={2}>
              <IconBtn
                iconType={"wrong"}
                size="md"
                variant="dark"
                className="opacity-30 group-hover:opacity-100 transition-all duration-150"
              />
              <IconBtn
                iconType={"right"}
                size="md"
                className="opacity-30 group-hover:opacity-100 transition-all duration-150"
              />
            </Stack>
          ) : (
            <IconBtn
              iconType={"cart_add"}
              className="opacity-0 group-hover:opacity-100 transition-all duration-150"
            />
          )}
        </Col> */}
      </div>
      {/* {type === "approveDeny" ? (
        <div className="mb-8 flex justify-between bg-green-50">
          <div>
            <h4>Reported for:</h4>
            <p>There is a spelling mistake on the word “apple”.</p>
          </div>
          <Stack direction="horizontal" gap={2}>
            <IconBtn iconType={"edit"} size="md" />
            <IconBtn iconType={"delete"} size="md" variant="dark" />
            <Btn variant="secondary">Done</Btn>
          </Stack>
        </div>
      ) : type === "flagging" ? (
        <div className="mb-8 flex justify-between bg-green-50">
          <div>
            <h4>Reported for:</h4>
            <p>There is a spelling mistake on the word “apple”.</p>
          </div>
          <Stack direction="horizontal" gap={2}>
            <IconBtn iconType={"edit"} size="md" />
            <IconBtn iconType={"delete"} size="md" variant="dark" />
            <Btn variant="secondary">Done</Btn>
          </Stack>
        </div>
      ) : (
        ""
      )} */}
    </>
  );
};

export default AdminProductItem;
