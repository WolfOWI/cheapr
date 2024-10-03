// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Row, Col, Stack } from "react-bootstrap";

// Internal Components
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
        <div className="flex items-center w-full">
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
        {type === "approveDeny" ? (
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
        ) : (
          <div className="flex flex-col justify-between bg-neutral-100 p-4 rounded-2xl my-4">
            <div>
              <h4>Reported for:</h4>
              <p>There is a spelling mistake on the word “apple”.</p>
            </div>
            <Stack direction="horizontal" gap={2} className="justify-end">
              <IconBtn iconType={"edit"} />
              <IconBtn iconType={"delete"} variant="dark" />
              <Btn variant="secondary">Done</Btn>
            </Stack>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductItem;
