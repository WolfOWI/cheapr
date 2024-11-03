// IMPORT
// -----------------------------------------------------------
// React & Hooks
import { useState, useEffect } from "react";

// Services
import { getBreadcrumbByProductId } from "../../services/breadcrumbService";

// Utility Functions
import { formatName } from "../../utils/wordFormatUtils";

// Third-Party Components
import { Row, Col, Stack } from "react-bootstrap";

// Internal Components
import IconBtn from "../button/IconBtn";
import Btn from "../button/Btn";
import MiniStorePriceBlock from "../building-blocks/MiniStorePriceBlock";

// Imagery
// -

// -----------------------------------------------------------

const AdminProductItem = ({
  productId,
  product,
  type,
  onReject,
  onApprove,
  onDelete,
  onEdit,
  onReApprove,
}) => {
  const [breadcrumb, setBreadcrumb] = useState({});

  // Get breadcrumb data when productId is received/changes
  useEffect(() => {
    const fetchBreadcrumb = async () => {
      const data = await getBreadcrumbByProductId(productId);
      setBreadcrumb(data);
    };
    fetchBreadcrumb();
  }, [productId]);

  // useEffect(() => {
  //   if (breadcrumb) {
  //     console.log("breadcrumb", breadcrumb);
  //   }
  // }, [breadcrumb]);

  // console.log("productId:", productId);
  // console.log("product:", product);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-end md:items-center group my-16 md:my-8  xl:my-4 w-full md:w-[45%] lg:w-full">
        <div className="flex flex-col lg:flex-row md:items-center w-full">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="h-64 lg:h-56 xl:h-56 object-contain md:w-fit"
            loading="lazy"
          />
          {/* Product Details */}
          <div className="mt-4 lg:mt-0 lg:ml-4 w-full">
            {/* Title */}
            <Stack direction="horizontal" gap={4}>
              <h3 className="font-bold">{product.name}</h3>
              <h3 className="text-neutral-500">
                {product.amount}
                {product.unit}
              </h3>
            </Stack>
            {/* Breadcrumb */}
            {Object.keys(breadcrumb).length > 0 && (
              <p>{`${formatName(breadcrumb.category)} > ${formatName(
                breadcrumb.subcategory
              )} > ${formatName(breadcrumb.type)}`}</p>
            )}
            {/* Prices */}
            <div className="flex mt-6 flex-col xl:flex-row xl:space-x-6 space-y-6 xl:space-y-0 items-center lg:items-start w-full">
              <div className="flex xl:flex-row xl:space-y-0 space-x-6 xl:space-x-6 w-full">
                <MiniStorePriceBlock
                  store="pnp"
                  price={product.pnp.price}
                  updated={product.pnp.updated}
                  className={"w-full"}
                />
                <MiniStorePriceBlock
                  store="woolworths"
                  price={product.woolworths.price}
                  updated={product.woolworths.updated}
                  className={"w-full"}
                />
              </div>
              <div className="flex xl:flex-row xl:space-y-0 space-x-6 xl:space-x-6 w-full">
                <MiniStorePriceBlock
                  store="checkers"
                  price={product.checkers.price}
                  updated={product.checkers.updated}
                  className={"w-full"}
                />
                <MiniStorePriceBlock
                  store="spar"
                  price={product.spar.price}
                  updated={product.spar.updated}
                  className={"w-full"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        {type === "approveDeny" ? (
          // Type: Approve & Reject
          <div className="flex space-x-2 items-center mt-8 lg:mt-0 w-full lg:w-fit">
            <IconBtn
              iconType={"wrong"}
              variant="dark"
              className="opacity-30 group-hover:opacity-100 transition-all duration-150 min-w-12"
              onClick={() => onReject(productId)}
            />
            <Btn
              className="opacity-30 group-hover:opacity-100 transition-all duration-150 w-full min-w-48"
              onClick={() => onApprove(productId)}
            >
              Approve
            </Btn>
          </div>
        ) : type === "approveDelete" ? (
          // Type: Approve & Delete
          <div className="flex space-x-2 items-center mt-8 lg:mt-0 w-full lg:w-fit">
            <IconBtn
              iconType={"delete"}
              variant="dark"
              className="opacity-30 group-hover:opacity-100 transition-all duration-150 min-w-12"
              onClick={() => onDelete(productId)}
            />
            <Btn
              className="opacity-30 group-hover:opacity-100 transition-all duration-150 w-full min-w-48"
              onClick={() => onApprove(productId)}
            >
              Approve
            </Btn>
          </div>
        ) : (
          // Type: Flagged
          <div className="w-full lg:w-[30%] flex flex-col">
            <div className="flex flex-col justify-between bg-neutral-100 p-4 rounded-2xl mb-4 mt-4 lg:mt-0">
              <h4>Reason:</h4>
              <p>{product.flagMessage}</p>
            </div>
            <Stack direction="horizontal" gap={2} className="w-full">
              <IconBtn
                iconType={"edit"}
                className="min-w-12 opacity-30 group-hover:opacity-100 transition-all duration-150"
                onClick={() => onEdit(productId)}
              />
              <IconBtn
                iconType={"wrong"}
                variant="dark"
                className="min-w-12 opacity-30 group-hover:opacity-100 transition-all duration-150"
                onClick={() => onReject(productId)}
              />
              <IconBtn
                iconType={"right"}
                className="min-w-12 opacity-30 group-hover:opacity-100 transition-all duration-150 hidden lg:flex xl:hidden"
                onClick={() => onReApprove(productId)}
              />
              <Btn
                variant="secondary"
                className="w-full opacity-30 group-hover:opacity-100 transition-all duration-150 lg:hidden xl:block"
                onClick={() => onReApprove(productId)}
              >
                Re-Approve
              </Btn>
            </Stack>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductItem;
