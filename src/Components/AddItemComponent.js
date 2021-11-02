import React from "react";
import QrReader from "react-qr-reader";

function AddItemComponent(props) {
  const handleError = () => {};

  const handleScan = () => {};

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "60%", margin: "0 auto" }}
      />
    </div>
  );
}

export default AddItemComponent;
