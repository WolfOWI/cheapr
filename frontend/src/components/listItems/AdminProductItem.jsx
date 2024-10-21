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
  onFlagDismiss,
  onFlagDone,
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
      <div className="flex justify-between group my-4 w-full">
        <div className="flex items-center w-full">
          <img src={product.image} alt={product.name} className="h-56" />
          <div className="ml-4">
            <Stack direction="horizontal" gap={4}>
              <h3 className="font-bold">{product.name}</h3>
              <h3 className="text-neutral-500">
                {product.amount}
                {product.unit}
              </h3>
            </Stack>
            {Object.keys(breadcrumb).length > 0 && (
              <p>{`${formatName(breadcrumb.category)} > ${formatName(
                breadcrumb.subcategory
              )} > ${formatName(breadcrumb.type)}`}</p>
            )}
            <Stack direction="horizontal" gap={5} className="mt-6">
              <MiniStorePriceBlock
                store="pnp"
                price={product.pnp.price}
                updated={product.pnp.updated}
              />
              <MiniStorePriceBlock
                store="woolworths"
                price={product.woolworths.price}
                updated={product.woolworths.updated}
              />
              <MiniStorePriceBlock
                store="checkers"
                price={product.checkers.price}
                updated={product.checkers.updated}
              />
              <MiniStorePriceBlock
                store="spar"
                price={product.spar.price}
                updated={product.spar.updated}
              />
            </Stack>
          </div>
        </div>
        {/* Type: Approve & Reject */}
        {type === "approveDeny" ? (
          <Stack direction="horizontal" gap={2}>
            <IconBtn
              iconType={"wrong"}
              variant="dark"
              className="opacity-30 group-hover:opacity-100 transition-all duration-150"
              onClick={() => onReject(productId)}
            />
            <Btn
              className="opacity-30 group-hover:opacity-100 transition-all duration-150"
              onClick={() => onApprove(productId)}
            >
              Approve
            </Btn>
          </Stack>
        ) : type === "approveDelete" ? (
          <Stack direction="horizontal" gap={2}>
            <IconBtn
              iconType={"delete"}
              variant="dark"
              className="opacity-30 group-hover:opacity-100 transition-all duration-150"
              onClick={() => onDelete(productId)}
            />
            <Btn
              className="opacity-30 group-hover:opacity-100 transition-all duration-150"
              onClick={() => onApprove(productId)}
            >
              Approve
            </Btn>
          </Stack>
        ) : (
          <div className="flex flex-col justify-between bg-neutral-100 p-4 rounded-2xl my-4 w-[30%]">
            <div>
              <h4>Message:</h4>
              <p>{product.flagMessage}</p>
            </div>
            <Stack direction="horizontal" gap={2} className="w-full">
              <IconBtn iconType={"edit"} className="min-w-12" />
              <IconBtn iconType={"delete"} variant="dark" className="min-w-12" />
              <Btn variant="secondary" className="w-full">
                Done
              </Btn>
            </Stack>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProductItem;
