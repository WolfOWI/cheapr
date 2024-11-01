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
import StoreLogo from "./StoreLogo";

// Imagery
// -

// -----------------------------------------------------------

const PriceBlock = ({ store, price, updated, onSpecial, isCheapest }) => {
  return (
    <>
      {/* Smaller Mobile View */}
      {price > 0 ? (
        <Col xs={6} className="px-1 lg:hidden">
          <div
            className={`flex  justify-center items-center h-20 my-1 w-full text-center rounded-xl group-hover:bg-highlight group-hover:text-black ${
              isCheapest ? "bg-primary text-white" : "bg-neutral-100 text-black"
            }`}
          >
            <StoreLogo
              store={store}
              type={isCheapest ? "miniWhite" : "mini"}
              className="h-10 mr-2"
            />
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="mr-1 font-bold">R{price}</p>
                {onSpecial && <Icon type="special" className="h-6 text-priP1" />}
              </div>
              {price && <small>{updated}</small>}
            </div>
          </div>
        </Col>
      ) : (
        <Col xs={2} className="px-1 lg:hidden">
          <div className="flex flex-col justify-center items-center h-20 my-1 w-full text-center rounded-xl bg-neutral-100 group-hover:bg-highlight ">
            <small className="hidden group-hover:flex">No Data</small>
            <Icon type="question" className="h-10 text-neutral-400 group-hover:hidden" />
          </div>
        </Col>
      )}
      {/* Larger Desktop View */}
      {price > 0 ? (
        <Col xs={2} className="px-1 hidden lg:flex">
          <div
            className={`flex flex-col justify-center items-center h-20 my-1 w-full text-center rounded-xl group-hover:bg-highlight group-hover:text-black ${
              isCheapest ? "bg-primary text-white" : "bg-neutral-100 text-black"
            }`}
          >
            <div className="flex items-center">
              {onSpecial && <Icon type="special" className="h-6 text-priP1" />}
              <p className="ml-1 font-bold">R{price}</p>
            </div>
            {price && <small>{updated}</small>}
          </div>
        </Col>
      ) : (
        <Col xs={2} className="px-1">
          <div className="flex flex-col justify-center items-center h-20 my-1 w-full text-center rounded-xl bg-neutral-100 group-hover:bg-highlight ">
            <small className="hidden group-hover:flex">No Data</small>
            <Icon type="question" className="h-10 text-neutral-400 group-hover:hidden" />
          </div>
        </Col>
      )}
    </>
  );
};

export default PriceBlock;
