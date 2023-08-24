import React from 'react';

import "./ErrorPage.css"
const ErrorPage = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?size=626&ext=jpg" alt="404 Error" />
    </div>
  );
};

export default ErrorPage;
