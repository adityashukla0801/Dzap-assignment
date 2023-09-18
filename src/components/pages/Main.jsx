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
  const [duplicateArr, setDuplicateArr] = useState([]);
  const [changeBtnClr, setChangeBtnClr] = useState(false);

  var isNumber = function isNumber(value) {
    return typeof +value === "number" && isFinite(value);
  };

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

  const validateInput = () => {
    let wrongAmount = [];
    let allAddress = [];

    // Check amount value is a number
    inputText.length &&
      inputText.map((element, index) => {
        allAddress.push(element.split(" ")[0]);
        if (!isNumber(element.split(" ")[1])) {
          wrongAmount.push(index + 1);
          setErrortext(`Line ${wrongAmount} wrong amount`);
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
      setDuplicateArr(duplicateValues);
      return;
    }
    setIsDuplicate(false);
  };

  const setValueClearState = (newValues) => {
    setInputText(newValues);
    setIsRender(true);
    setIsDuplicate(false);
    setDuplicateArr([]);
    setErrortext("");
    setChangeBtnClr(true);
  };

  const combineBalance = () => {
    const newValues = duplicateArr.map((item) => {
      let sum = 0;
      item.indices.map((ind) => {
        debugger;
        const currVal = inputText[ind].split(" ")[1];
        sum += +currVal;
        return ind;
      });
      return `${item.value} ${sum}`;
    });
    setValueClearState(newValues);
  };

  const keepFirstValue = () => {
    const newValues = duplicateArr.map((item) => {
      const firstIndex = item?.indices?.[0];
      const currentValue = inputText[firstIndex];
      return currentValue;
    });
    setValueClearState(newValues);
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
      {errortext ? <ErrorMeassage errortext={errortext} /> : ""}
      <Button clickFunction={validateInput} changeBtnClr={changeBtnClr} />
    </div>
  );
};

export default Main;
