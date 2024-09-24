// IMPORT
// -----------------------------------------------------------
// React & Hooks
import PropTypes from "prop-types";

// Services
// -

// Utility Functions
// -

// Third-Party Components
import Button from "react-bootstrap/esm/Button";

// Internal Components
// -

// Imagery
import addIcon from "../../assets/icons/add.svg";
// -----------------------------------------------------------

const Btn = ({ className = "", children, variant = "primary", onClick, ...rest }) => {
  let variantClass;

  switch (variant) {
    case "primary":
      variantClass =
        "h-14 rounded-xl px-6 bg-primary text-white font-bold border-none hover:bg-priP1";
      break;

    case "secondary":
      variantClass =
        "h-14 rounded-xl px-6 bg-transparent text-primary font-bold border-primary border-2 hover:bg-primary hover:text-white";
      break;

    case "dark":
      variantClass =
        "h-14 rounded-xl px-6 bg-neutral-700 text-white font-bold border-none hover:bg-neutral-500";
      break;

    default:
      variantClass =
        "h-14 rounded-xl px-6 bg-primary text-white font-bold border-none hover:bg-priP1";
      break;
  }

  // Combine all Tailwind classes
  const combinedClassName = `${variantClass} ${className} transition duration-300 ease-in-out`;

  return (
    <Button className={combinedClassName} onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

export default Btn;
