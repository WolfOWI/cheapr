// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Col } from "react-bootstrap";

// Internal Components
import Icon from "./Icon";

// Imagery
// -

// -----------------------------------------------------------

const PriceBlock = ({ price, updated, onSpecial, isCheapest }) => {
  return (
    <>
      {price > 0 ? (
        <Col xs={2} className="px-1">
          <div
            className={`flex flex-col justify-center items-center h-20 my-1 w-full text-center rounded-xl group-hover:bg-highlight group-hover:text-black ${
              isCheapest ? "bg-primary text-white" : "bg-neutral-100 text-black"
            }`}
          >
            <div className="flex items-center">
              {onSpecial && <Icon type="special" className="h-6" />}
              <p className="ml-1 font-bold">R{price}</p>
            </div>
            {price && <small>{updated}</small>}
          </div>
        </Col>
      ) : (
        <Col xs={2} className="px-1">
          <div className="flex flex-col justify-center items-center h-20 my-1 w-full text-center rounded-xl bg-neutral-100 group-hover:bg-highlight ">
            <p className="hidden group-hover:flex">No Info</p>
            <Icon type="question" className="h-10 text-neutral-400 group-hover:hidden" />
          </div>
        </Col>
      )}
    </>
  );
};

export default PriceBlock;
