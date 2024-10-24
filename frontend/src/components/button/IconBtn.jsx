// IMPORT
// -----------------------------------------------------------
// React & Hooks
// -

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
const IconBtn = ({ className = "", variant = "primary", onClick, iconType, size }) => {
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

    case "tertiary-special":
      variantClass = "border-none bg-transparent hover:bg-priP1";
      iconVariantClass = "text-primary";
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

  let btnSize = "";
  let iconSize = "";
  if (size === "sm") {
    btnSize = "w-8 h-8";
    iconSize = "w-5 h-5";
  } else if (size === "md") {
    btnSize = "w-10 h-10";
    iconSize = "w-5 h-5";
  } else {
    btnSize = "w-12 h-12";
    iconSize = "w-6 h-6";
  }

  // Combine all Tailwind classes
  const combinedClassName = `${variantClass} ${className} ${btnSize} cursor-pointer flex justify-center items-center rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110 group`;

  return (
    <Button className={`${combinedClassName} p-0`} onClick={onClick}>
      {/* Use the Icon component, passing the icon type */}
      <Icon type={iconType} className={`${iconSize} ${iconVariantClass}`} />
    </Button>
  );
};

export default IconBtn;
