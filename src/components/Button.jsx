import React from "react";
import styled from "styled-components";

const Button = ({ clickFunction, changeBtnClr }) => {
  const SubmitButton = styled.button`
    width: 100%;
    background: ${changeBtnClr ? "#6c3fc0" : "#1537a1"};
    color: #fff;
    border: 1px solid #1537a1;
    border-radius: 5px;
    margin: 1rem 0;
    padding: 1rem 0;
    font-size: 20px;
    cursor: pointer;
  `;

  return (
    <>
      <SubmitButton onClick={clickFunction}>Next</SubmitButton>
    </>
  );
};

export default Button;
