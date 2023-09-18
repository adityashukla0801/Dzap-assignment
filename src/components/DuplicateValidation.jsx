import React from "react";
import styled from "styled-components";

const ValidateButton = styled.button`
  border: none;
  color: red;
  background: #fff;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
`;

const OuterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Span = styled.span`
  color: red;
  font-size: 16px;
  font-weight: 500;
`;

const DuplicateValidation = ({ keepFirstValue, combineBalance }) => {
  return (
    <OuterContainer>
      <Span>Duplicated</Span>
      <Span>
        <ValidateButton onClick={keepFirstValue}>
          Keep the first one
        </ValidateButton>{" "}
        |{" "}
        <ValidateButton onClick={combineBalance}>
          Combine Balance
        </ValidateButton>
      </Span>
    </OuterContainer>
  );
};

export default DuplicateValidation;
