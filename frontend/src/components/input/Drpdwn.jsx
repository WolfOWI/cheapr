// IMPORT
// -----------------------------------------------------------
// React & Hooks
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";

// Services
// -

// Utility Functions
// -

// Third-Party Components
// -

// Internal Components
// -

// Imagery
// -

// -----------------------------------------------------------

const Drpdwn = ({
  className = "",
  title = "Dropdown",
  variant = "primary",
  onSelect,
  children,
  ...rest
}) => {
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

    case "dark-outline":
      variantClass =
        "h-14 rounded-xl px-6 bg-transparent text-neutral-700 font-bold border-neutral-700 border-2 hover:bg-neutral-500 hover:border-neutral-500 hover:text-white";
      break;

    default:
      variantClass =
        "h-14 rounded-xl px-6 bg-primary text-white font-bold border-none hover:bg-priP1";
      break;
  }

  // Combine all Tailwind classes for the dropdown toggle
  const combinedClassName = `${variantClass} ${className} transition duration-300 ease-in-out`;

  return (
    <Dropdown {...rest} onSelect={onSelect}>
      <Dropdown.Toggle className={combinedClassName}>{title}</Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  );
};

// PropTypes validation
Drpdwn.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "dark", "dark-outline"]),
  onSelect: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Drpdwn;
