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
`;

const LabelText = styled.p`
  width: 100%;
  color: #4f587b;
  font-size: 15px;
  font-weight: bold;
`;

const InputArea = ({ setInputText, inputText, setIsRender, isRender }) => {
  const contentEditableRef = useRef(null);
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

  return (
    <>
      <LabelText>Addresses with Amounts</LabelText>
      <TextArea
        contentEditable="true"
        onInput={handleContentChange}
        ref={contentEditableRef}
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
