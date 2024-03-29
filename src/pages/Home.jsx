/* eslint-disable no-unused-vars */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import TheNavbar from "./Navbar";
import { Flex, Text } from "@radix-ui/themes";
import Spinner from "react-bootstrap/Spinner";
import Color_Selector from "./Color_Selector";
import html2canvas from "html2canvas";

const Home = () => {
  document.body.style.backgroundColor = "#000509";

  const [selectedFile, setSelectedFile] = useState(null);
  const [displayImageSrc, setDisplayImageSrc] = useState("");
  const [fileURL, setFileURL] = useState(
    "https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [bgColor, setBgColor] = useState("black");

  const downloadImage = () => {
    const options = {
      logging: true,
      useCORS: true,
      allowTaint: true,
      scale: 5,
      backgroundColor: bgColor,
      removeContainer: true,
    };
    html2canvas(document.querySelector(".image-preview"), options).then(
      (canvas) => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    );
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    // console.log(color);
  };

  useEffect(() => {
    switch (selectedColor) {
      case "Color":
        setBgColor("transparent");
        break;
      case "Gray":
        setBgColor("lightgray");
        break;
      case "Red":
        setBgColor("red");
        break;
      case "Orange":
        setBgColor("orange");
        break;
      case "Yellow":
        setBgColor("yellow");
        break;
      case "Green":
        setBgColor("green");
        break;
      case "Cyan":
        setBgColor("cyan");
        break;
      default:
        setBgColor("white");
    }
  }, [selectedColor]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileURL(URL.createObjectURL(file));
    setFileName(file.name);
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

    setIsLoading(true);

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
      setIsDisabled(true);
      setIsLoading(false);
      // console.log(data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  /////////////////////////////////////

  return (
    <>
      {/* <img
        src={Gradient}
        style={{
          // zIndex: "-1",
          position: "absolute",
        }}
      ></img> */}
      <Flex
        style={{
          // width: "1200px",
          height: "100%",
          position: "absolute",
          zIndex: "-1",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {/* <img
          src={Gradient}
          style={
            {
              // position: "absolute",
              // width: "100%",
              // height: "100%",
              // objectFit: "cover",
            }
          }
        ></img> */}
      </Flex>
      <Flex
        // gap={"5"}
        align={"center"}
        direction={"column"}
        style={{
          padding: "20px",
          marginTop: "120px",
        }}
      >
        <TheNavbar />
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          style={{
            maxWidth: "680px",
            width: "100%",
          }}
        >
          <Text
            size={"9"}
            style={{
              color: "white",
              fontWeight: "bolder",
            }}
          >
            {`Remove the `}
            {
              <Text
                size={"9"}
                style={{
                  background: `linear-gradient(90deg, #EEE73C 5%, #DE12FF 64%)`,
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                background
              </Text>
            }
            {` of any image in 3, 2, 1...`}
          </Text>
          <img
            height={"180px"}
            width={"180px"}
            src={"https://uxderrick.files.wordpress.com/2024/02/preview.png"}
            style={{
              position: "relative",
              top: "60px",
              zIndex: "1",
            }}
          ></img>
        </Flex>
        <Flex
          className="upload-image"
          justify={"center"}
          style={{
            display: "flex",
            gap: "16px",
            width: "100%",
            height: "100%",
            // marginTop: "60px",
          }}
          wrap={"wrap"}
        >
          <Flex
            style={{
              // height: "100%",
              // width: "100%",
              maxWidth: "320px",
              minWidth: "320px",
              backgroundColor: "#fff",
              padding: "8px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "8px",
              borderRadius: "8px",
            }}
          >
            <Flex
              // className="image-preview"
              style={{
                height: "320px",
                width: "100%",
                backgroundColor: "white",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "4px",
                backgroundImage: `url(${fileURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            ></Flex>
            <Form.Group
              controlId="formFile"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "8px",
              }}
            >
              <Form.Control
                type="file"
                onChange={handleFileChange}
                onClick={(e) => {
                  setIsDisabled(false);
                }}
              />
              <Button
                className="button"
                {...(selectedFile && !isDisabled
                  ? {
                      variant: "soft",
                      style: {
                        width: "100px",
                        backgroundColor: "#DE12FF",
                        color: "white",
                      },
                      onClick: removeBackground,
                    }
                  : {
                      variant: "soft",
                      style: {
                        disabled: true,
                        width: "100px",
                        backgroundColor: "#E4E4E9",
                        color: "white",
                      },
                    })}
              >
                Generate
              </Button>
            </Form.Group>
          </Flex>
          <Flex
            style={{
              height: "100%",
              width: "100%",
              maxWidth: "320px",
              minWidth: "320px",
              backgroundColor: "#fff",
              padding: "8px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "8px",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            <Flex
              className="image-preview"
              direction={"column"}
              style={{
                height: "320px",
                width: "100%",
                backgroundColor: bgColor,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",
                clipPath: "inset(0px 0px 0px 0px round 4px)",
              }}
            >
              {displayImageSrc && !isLoading ? (
                <img
                  id="image-preview"
                  src={`data:image/png;base64,${displayImageSrc}`}
                  alt="displayImage"
                  style={{
                    // height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    // borderRadius: "4px",
                    backgroundColor: bgColor,
                  }}
                />
              ) : !isLoading ? (
                <Flex
                  direction={"column"}
                  align={"center"}
                  gap={"3"}
                  style={{
                    width: "160px",
                    mixBlendMode: "luminosity",
                  }}
                >
                  <img
                    src={
                      "https://uxderrick.files.wordpress.com/2024/02/empty.png"
                    }
                    alt="displayImage"
                    style={{
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                    }}
                  />
                  <Text
                    size={"2"}
                    style={{
                      color: "#8B8D98",
                    }}
                  >
                    {`Your generated image will appear here`}
                  </Text>
                </Flex>
              ) : (
                <Spinner animation="border" variant="secondary" />
              )}
            </Flex>
            <Flex direction={"row"} gap={"2"}>
              <Color_Selector
                {...{
                  onColorChange: handleColorChange,
                }}
              />
              <Button
                className="button"
                {...(displayImageSrc
                  ? {
                      variant: "soft",
                      style: {
                        width: "100%",
                        backgroundColor: "#DE12FF",
                        color: "white",
                      },
                      onClick: downloadImage,
                    }
                  : {
                      variant: "soft",
                      style: {
                        disabled: true,
                        width: "100%",
                        backgroundColor: "#E4E4E9",
                        color: "white",
                      },
                      disabled: true,
                    })}
              >
                Download image
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
