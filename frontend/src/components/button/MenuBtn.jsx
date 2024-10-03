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
import Icon from "../building-blocks/Icon";

// Imagery
// -

// -----------------------------------------------------------

const MenuBtn = ({ type, onClick }) => {
  let iconType = "";
  let labelText = "";
  let exampleText = "";

  switch (type) {
    case "subcategory":
      labelText = "Subcategory";
      exampleText = "(Like Baked Goods)";
      iconType = "oven";
      break;
    case "type":
      labelText = "Product Type";
      exampleText = "(Like Cakes & Pies)";
      iconType = "cakes";
      break;
    case "product":
      labelText = "Product";
      exampleText = "(Like Blueberry Pie 300g)";
      iconType = "pie";
      break;

    default:
      break;
  }

  return (
    <>
      <div
        className="flex flex-col justify-center items-center bg-neutral-100 p-8 rounded-xl cursor-pointer w-full h-64 group hover:bg-primary"
        onClick={onClick}
      >
        <Icon type={iconType} className="w-24 group-hover:w-32 transition-all duration-150 mb-4" />
        <h3 className="group-hover:text-white">{labelText}</h3>
        <p className="opacity-0 group-hover:text-white group-hover:opacity-100">{exampleText}</p>
      </div>
    </>
  );
};

export default MenuBtn;
