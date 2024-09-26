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
import Icon from "../building-blocks/Icon";

// Imagery
// -
// -----------------------------------------------------------
const IconBtn = ({ className = "", variant = "primary", onClick, iconType }) => {
  let variantClass;
  let iconVariantClass;

  switch (variant) {
    case "primary":
      variantClass = "bg-primary border-none hover:bg-priP1";
      iconVariantClass = "text-white";
      break;

    case "secondary":
      variantClass = "bg-transparent border-primary border-2 hover:bg-primary hover:text-white";
      iconVariantClass = "text-primary group-hover:text-white";
      break;

    case "tertiary":
      variantClass = "border-none bg-transparent hover:bg-primary hover:text-white";
      iconVariantClass = "text-primary group-hover:text-white";
      break;

    case "dark":
      variantClass = "bg-neutral-700 border-none hover:bg-neutral-500";
      iconVariantClass = "text-white";
      break;

    default:
      variantClass = "bg-primary border-none hover:bg-priP1";
      iconVariantClass = "text-white";
      break;
  }

  // Combine all Tailwind classes
  const combinedClassName = `${variantClass} ${className} flex justify-center items-center rounded-full w-14 h-14 transition-transform duration-300 ease-in-out transform hover:scale-110 group`;

  return (
    <Button className={combinedClassName} onClick={onClick}>
      {/* Use the Icon component, passing the icon type */}
      <Icon type={iconType} className={`h-8 w-8 ${iconVariantClass}`} />
    </Button>
  );
};

export default IconBtn;
