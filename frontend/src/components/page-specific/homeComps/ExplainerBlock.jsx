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
// -

// Imagery
import braaiIcon from "../../../assets/icons/braai.svg";
import chartIcon from "../../../assets/icons/chart.svg";
import carryIcon from "../../../assets/icons/people_carry.svg";
import piggyIcon from "../../../assets/icons/piggy_bank.svg";

// -----------------------------------------------------------

const ExplainerBlock = ({ iconType, heading, children }) => {
  let iconsMap = {
    braai: braaiIcon,
    chart: chartIcon,
    carry: carryIcon,
    piggy: piggyIcon,
  };

  return (
    <>
      <div className="flex flex-col text-center bg-neutral-100 rounded-3xl py-10 px-16">
        <img src={iconsMap[iconType]} alt="icon" className="max-h-32 mb-4" />
        <h3>{heading}</h3>
        {children}
      </div>
    </>
  );
};

export default ExplainerBlock;
