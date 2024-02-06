/* eslint-disable no-unused-vars */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayImageSrc, setDisplayImageSrc] = useState("");
  const [fileURL, setFileURL] = useState(
    "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [fileName, setFileName] = useState("");

  //

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileURL(URL.createObjectURL(file));
    setFileName(file.name);

    // console.log(file);
    // console.log(file.name);
  };

  /////////////////////////////////////
  //API for bg removal
  // const API_URL = "https://api.remove.bg/v1.0/removebg";
  const API_URL = "https://sdk.photoroom.com/v1/segment";

  // kiz5fKUj3kGNBbR8G68GD9Rc
  //4eaab18fd693fc0c64bbb4c07a777c2dfd248175
  // const apiKey = "kiz5fKUj3kGNBbR8G68GD9Rc";
  const apiKey = "4eaab18fd693fc0c64bbb4c07a777c2dfd248175";

  const removeBackground = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const form = new FormData();
    form.append("image_file", selectedFile);

    const options = {
      method: "POST",
      url: "https://sdk.photoroom.com/v1/segment",
      headers: {
        Accept: "application/json",
        "x-api-key": "4eaab18fd693fc0c64bbb4c07a777c2dfd248175",
      },
      data: form,
    };

    try {
      const data = await axios.request(options);
      setDisplayImageSrc(data.data.result_b64);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

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
            {displayImageSrc && (
              <img
                src={`data:image/png;base64,${displayImageSrc}`}
                alt="displayImage"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Button
        variant="outline-primary"
        style={{
          marginTop: "20px",
          width: "100px",
        }}
        onClick={() => {
          removeBackground(selectedFile);
        }}
      >
        Generate
      </Button>
    </>
  );
};

export default Home;
