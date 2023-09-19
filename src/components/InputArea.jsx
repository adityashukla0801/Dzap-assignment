import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const TextArea = styled.div`
  width: 100%;
  padding: 10px;
  background: #f5f5fa;
  border-radius: 5px;
  border: 1px solid #f5f5fa;
  font-size: 18px;
  font-weight: bold;
  resize: none;
  min-height: 300px;
`;

const LabelText = styled.p`
  width: 100%;
  color: #4f587b;
  font-size: 15px;
  font-weight: bold;
`;

const InputArea = ({ setInputText, inputText, setIsRender, isRender }) => {
  const contentEditableRef = useRef(null);

  // Function for get the text from textarea
  const handleContentChange = (e) => {
    // Extract the text content of each <li> element
    const liElements = Array.from(e.target.querySelectorAll("li"));
    const liValues = liElements.map((li) => li.textContent);
    setInputText(liValues);
  };

  useEffect(() => {
    if (isRender) {
      const elems = `<ol>${inputText
        .map((ele) => `<li>${ele}</li>`)
        .join("")}</ol>`;

      contentEditableRef.current.innerHTML = elems;
      setIsRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRender]);

  // Order the list on paste
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <>
      <LabelText>Addresses with Amounts</LabelText>
      <TextArea
        contentEditable="true"
        onInput={handleContentChange}
        ref={contentEditableRef}
        onPaste={handlePaste}
      >
        <ol>
          <li></li>
        </ol>
      </TextArea>
      <LabelText>Separated by ',' or '' or '='</LabelText>
    </>
  );
};

export default InputArea;
