/* eslint-disable no-unused-vars */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState(
    "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );

  //

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const fileURL = URL.createObjectURL(file);
    setFileURL(fileURL);
    // console.log(fileURL);
  };

  /////////////////////////////////////
  //API for bg removal

  /////////////////////////////////////

  return (
    <>
      <div
        className="upload-image"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "400px",
            backgroundColor: "lightgrey",
            textAlign: "center",
            paddingTop: "20px",
            fontSize: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "20px",
            borderRadius: "20px",
          }}
        >
          <div
            className="image-preview"
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              textAlign: "center",
              paddingTop: "20px",
              fontSize: "20px",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "10px",
              backgroundImage: `url(${fileURL})`,
              backgroundSize: "contain",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <>
            <Form.Group controlId="formFile" className="">
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </>
        </div>
        <div
          style={{
            height: "400px",
            width: "400px",
            backgroundColor: "lightgrey",
            textAlign: "center",
            paddingTop: "20px",
            fontSize: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "20px",
            borderRadius: "20px",
          }}
        >
          <div
            className="image-preview"
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "white",
              textAlign: "center",
              //   padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <img
              src={fileURL}
              className="image-output"
              style={{
                alignItems: "center",
              }}
            ></img>
          </div>
        </div>
      </div>
      <Button
        variant="outline-primary"
        style={{
          marginTop: "20px",
          width: "100px",
        }}
      >
        Generate
      </Button>
    </>
  );
};

export default Home;
