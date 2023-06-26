import React from 'react'
import "../Resources/Stylesheets/404page.css";


const ErrorPage = () => {
  return (
   
    <div className="pg_not_found">
        <h1 className="error">
          4
          <span>
          0
          </span>
          4
        </h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
        <button className="btn">Go Back</button>
    </div>
  );
}


export default ErrorPage;