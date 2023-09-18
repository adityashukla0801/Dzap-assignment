import React from "react";
import styled from "styled-components";

const AlertMessage = styled.div`
  width: 100%;
  margin: 1rem 0;
  border: 1px solid red;
  border-radius: 5px;
  color: red;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
`;

const ErrorMeassage = ({ errortext }) => {
  return (
    <>
      <AlertMessage>
        <i class="fa fa-exclamation-circle mr-6"></i>
        <div dangerouslySetInnerHTML={{ __html: errortext }}></div>
      </AlertMessage>
    </>
  );
};

export default ErrorMeassage;
