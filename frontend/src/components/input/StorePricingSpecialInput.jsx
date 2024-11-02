// IMPORT
// -----------------------------------------------------------
// React & Hooks
import React, { useState } from "react";

// Services
// -

// Utility Functions
// -

// Third-Party Components
import { Form, InputGroup, FloatingLabel } from "react-bootstrap";

// Internal Components
import StoreLogo from "../building-blocks/StoreLogo";

// Imagery
// -

// -----------------------------------------------------------

const StorePricingSpecialInput = ({
  storeKey,
  storePrice,
  setStorePrice,
  onSpecial,
  setOnSpecial,
  storeSpecialDate,
  setStoreSpecialDate,
  className,
}) => {
  // console.log("props", {
  //   storeKey,
  //   storePrice,
  //   setStorePrice,
  //   storeSpecial,
  //   setStoreSpecial,
  //   storeSpecialDate,
  //   setStoreSpecialDate,
  // });
  // console.log("storeSpecialDate", storeSpecialDate);
  return (
    <div className={` ${className}`}>
      <Form.Label>
        <div className="flex items-center">
          <StoreLogo store={storeKey} className="h-4" />
          <p className="ml-2">Price</p>
        </div>
      </Form.Label>
      <InputGroup className="mb-2 h-[58px]">
        <InputGroup.Text className="input-style h-[58px] font-bold">R</InputGroup.Text>
        <Form.Control
          type="text"
          inputMode="decimal"
          className="input-style h-[58px]"
          value={storePrice}
          onChange={(e) => {
            // Replace commas with periods and allow only numbers and periods
            let inputValue = e.target.value.replace(/,/g, ".").replace(/[^0-9.]/g, "");

            // Ensure only one decimal point exists
            const parts = inputValue.split(".");
            if (parts.length > 2) {
              inputValue = `${parts[0]}.${parts[1]}`; // Keep only the first period
            }

            // Limit to two digits after the decimal point if there is a decimal
            if (parts[1] && parts[1].length > 2) {
              inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
            }

            setStorePrice(inputValue);
          }}
          maxLength={10}
        />
      </InputGroup>

      <Form.Group className="mb-2" controlId={`formBasicCheckbox-${storeKey}`}>
        <Form.Check
          type="checkbox"
          label="On Special"
          checked={onSpecial}
          onChange={() => setOnSpecial(!onSpecial)}
        />
      </Form.Group>
      {onSpecial && (
        <Form.Floating>
          <FloatingLabel controlId={`floatingInput-${storeKey}`} label="Until" className="mb-4">
            <Form.Control
              type="date"
              placeholder=""
              value={storeSpecialDate}
              onChange={(e) => setStoreSpecialDate(e.target.value)}
              className="input-style"
            />
          </FloatingLabel>
        </Form.Floating>
      )}
    </div>
  );
};

export default StorePricingSpecialInput;
