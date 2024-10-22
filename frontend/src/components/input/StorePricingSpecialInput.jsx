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
    <div className={`mb-16 ${className}`}>
      <Form.Label>
        <div className="flex items-center">
          <StoreLogo store={storeKey} className="h-4" />
          <p className="ml-2">Price</p>
        </div>
      </Form.Label>
      <InputGroup className="mb-2 h-[58px]">
        <InputGroup.Text className="input-style h-[58px] font-bold">R</InputGroup.Text>
        <Form.Control
          type="number"
          className="input-style h-[58px]"
          value={storePrice}
          onChange={(e) => setStorePrice(e.target.value)}
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
