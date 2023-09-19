import React, { useState } from "react";
import InputArea from "../InputArea";
import ErrorMeassage from "../ErrorMeassage";
import Button from "../Button";
import DuplicateValidation from "../DuplicateValidation";

const Main = () => {
  const [inputText, setInputText] = useState("");
  const [errortext, setErrortext] = useState("");
  const [isRender, setIsRender] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [changeBtnClr, setChangeBtnClr] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Check the value is valid number
  var isNumber = function isNumber(value) {
    return typeof +value === "number" && value > 0 && isFinite(value);
  };

  // Find the duplicate adderess
  function findDuplicateValuesWithIndices(arr) {
    const valueIndices = new Map();
    const duplicates = [];

    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];

      if (valueIndices.has(value)) {
        const indices = valueIndices.get(value);
        indices.push(i);
      } else {
        valueIndices.set(value, [i]);
      }
    }

    for (const [value, indices] of valueIndices.entries()) {
      if (indices.length > 1) {
        duplicates.push({ value, indices });
      }
    }

    return duplicates;
  }

  // Function for validate input like Non number and duplicate
  const validateInput = () => {
    let wrongAmount = [];
    let allAddress = [];

    // Check amount value is a number
    inputText.length &&
      inputText.map((element, index) => {
        allAddress.push(element.split(/[,= ]+/)[0]);
        if (!isNumber(element.split(/[,= ]+/)[1])) {
          wrongAmount.push(index + 1);
          setErrortext(`Line ${wrongAmount} wrong amount`);
          setIsValid(false);
        }
        return element;
      });

    if (wrongAmount.length) return;
    // Check for duplicate values
    const duplicateValues = findDuplicateValuesWithIndices(allAddress);
    const isDuplicate = duplicateValues.some(
      (address) => address.indices.length > 1
    );
    if (isDuplicate) {
      let warningText = "";
      duplicateValues.map((address) => {
        warningText += `Address ${
          address.value
        } encountered in Line : ${address.indices.map((ind) => ind + 1)}<br />`;
        return address;
      });
      setErrortext(warningText);
      setIsDuplicate(true);
      setIsValid(false);
      return;
    } else {
      inputText.length && setErrortext(`Valid Address and Amount`);
    }
    setIsDuplicate(false);
  };

  // Function for reset all values
  const setValueClearState = (newValues) => {
    setInputText(newValues);
    setIsRender(true);
    setIsDuplicate(false);
    setErrortext("");
    setChangeBtnClr(true);
    setIsValid(true);
  };

  // Function for Combine all values
  const combineBalance = () => {
    const addresses = {};

    for (const item of inputText) {
      const [address, valueStr] = item.split(/[=, ]+/);
      const value = parseInt(valueStr, 10);

      if (!addresses[address]) {
        addresses[address] = 0;
      }

      addresses[address] += value;
    }

    const combinedArray = [];

    for (const address in addresses) {
      const combinedValue = addresses[address];
      combinedArray.push(`${address}=${combinedValue}`);
    }
    setValueClearState(combinedArray);
  };

  // Function for keep first values
  const keepFirstValue = () => {
    const uniqueAddresses = {};
    const resultArray = [];

    for (const item of inputText) {
      // Split each item using =, comma, and space as delimiters
      const parts = item.split(/[=, ]+/);
      const address = parts[0];

      // Check if the address is not already in uniqueAddresses
      if (!uniqueAddresses[address]) {
        // Add it to the uniqueAddresses object and to the result array
        uniqueAddresses[address] = true;
        resultArray.push(item);
      }
    }
    setValueClearState(resultArray);
  };

  return (
    <div>
      <InputArea
        setInputText={setInputText}
        inputText={inputText}
        isRender={isRender}
        setIsRender={setIsRender}
      />
      {isDuplicate ? (
        <DuplicateValidation
          keepFirstValue={keepFirstValue}
          combineBalance={combineBalance}
        />
      ) : null}
      {errortext ? (
        <ErrorMeassage errortext={errortext} isValid={isValid} />
      ) : (
        ""
      )}
      <Button clickFunction={validateInput} changeBtnClr={changeBtnClr} />
    </div>
  );
};

export default Main;
