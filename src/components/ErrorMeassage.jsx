import React from "react";
import styled from "styled-components";

const ErrorMeassage = ({ errortext, isDuplicate }) => {
  const AlertMessage = styled.div`
    width: 100%;
    margin: 1rem 0;
    border: ${isDuplicate ? "1px solid red" : "1px solid green"};
    border-radius: 5px;
    color: ${isDuplicate ? "red" : "green"};
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
  `;

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
