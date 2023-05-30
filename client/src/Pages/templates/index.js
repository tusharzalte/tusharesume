import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../../Components/DefaultLayout";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import { Button } from "antd";
import "../../Resources/Stylesheets/templates.css";

function Templates() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const params = useParams();
  const navigate = useNavigate();
  const getTemplate = () => {
    switch (params.id) {
      case "1": {
        return <Template1 />;
      }
      case "2": {
        return <Template2 />;
      }
      case "3": {
        return <Template3 />;
      }
      default: {
        return <Template1 />;
      }
    }
  };
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-end my-5 mx-5">
        <Button className="backButton" onClick={() => navigate("/home")}>
          Back
        </Button>
        <Button className="mx-5 printButton" onClick={handlePrint}>
          Print
        </Button>
      </div>
      <div ref={componentRef}>{getTemplate()}</div>
    </DefaultLayout>
  );
}

export default Templates;
