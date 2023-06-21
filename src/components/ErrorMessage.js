import React from "react";

const ErrorMessage = ({ error }) => {
  console.log(error);
  return (
    <div className="card w-100 mb-5">
      <p
        className="card-text text-danger d-flex justify-content-center"
        style={{ heigth: "120px" }}
      >
        ERROR
      </p>
    </div>
  );
};
export default ErrorMessage;
