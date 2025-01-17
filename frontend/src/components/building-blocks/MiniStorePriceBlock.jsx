// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

// Services
// -

// Utility Functions
// -

// Third-Party Components
// -

// Internal Components
import StoreLogo from "./StoreLogo";

// Imagery
// -

// -----------------------------------------------------------

const MiniStorePriceBlock = ({ store, price, updated, className }) => {
  return (
    <>
      <div className={`flex items-center ${className}`}>
        <StoreLogo store={store} type="mini" className="h-12" />
        <div className="ml-2">
          {price ? (
            <>
              <h4 className="fw-bold">R{parseFloat(price).toFixed(2)}</h4>
              <p className="text-sm">{updated}</p>
            </>
          ) : (
            <>
              <p>No data</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MiniStorePriceBlock;
