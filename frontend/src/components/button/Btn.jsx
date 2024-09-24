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
// -
// -----------------------------------------------------------

const Btn = ({
  className,
  children,
  variant = "primary",
  icon = null,
  circular = false,
  onClick,
  ...rest
}) => {
  // Variants
  const variantClass =
    variant === "secondary"
      ? // Secondary
        "h-14 px-6 bg-transparent text-primary font-bold border-primary border-2 rounded-xl hover:bg-primary hover:text-white"
      : // Primary
        "h-14 px-6 bg-primary text-white font-bold rounded-xl hover:bg-priP1";

  // Circular button classes using Tailwind
  const circularClass = circular ? "rounded-full p-2" : "rounded-md";

  // Icon spacing (only if not circular)
  const iconClass = icon && !circular ? "mr-2" : "";

  // Combine all Tailwind classes
  const combinedClassName = `${variantClass} ${circularClass} ${className} transition duration-300 ease-in-out`;

  return (
    <button className={combinedClassName} onClick={onClick} {...rest}>
      {icon && <span className={iconClass}>{icon}</span>}
      {!circular && children}
    </button>
  );
};

// PropTypes for the component
Btn.propTypes = {
  children: PropTypes.node, // Button content
  variant: PropTypes.oneOf(["primary", "secondary"]), // Variants
  size: PropTypes.oneOf(["sm", "md", "lg"]), // Size options
  icon: PropTypes.node, // Optional icon
  circular: PropTypes.bool, // If true, renders a circular button
  onClick: PropTypes.func, // Click handler
};

export default Btn;
