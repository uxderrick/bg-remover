/* eslint-disable no-unused-vars */
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import TheNavbar from "./Navbar";
import { Flex, Text, colorProp } from "@radix-ui/themes";
import Preview from "../assets/Preview.png";
import Empty from "../assets/Empty.png";
import Gradient from "../assets/Gradient.png";

const Home = () => {
  //set bg color to black
  document.body.style.backgroundColor = "#000509";

  const [selectedFile, setSelectedFile] = useState(null);
  const [displayImageSrc, setDisplayImageSrc] = useState("");
  const [fileURL, setFileURL] = useState(
    "https://images.unsplash.com/photo-1523464862212-d6631d073194?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <img
        height={"1200px"}
        width={"1200px"}
        src={Gradient}
        style={{
          position: "absolute",
          zIndex: "-1",
          left: "50%",
          transform: "translateX(-50%)",
          top: "16%",
          opacity: "0.5",
        }}
      ></img>
      <Flex
        gap={"5"}
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
            {` of any image`}
          </Text>
          <img
            height={"180px"}
            width={"180px"}
            src={Preview}
            style={{
              position: "absolute",
              top: "280px",
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
            marginTop: "60px",
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
              className="image-preview"
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
              <Form.Control type="file" onChange={handleFileChange} />
              <Button
                {...(selectedFile
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
                      onClick: () => {},
                      disabled: true,
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
            }}
          >
            <Flex
              className="image-preview"
              style={{
                height: "320px",
                width: "100%",
                backgroundColor: "white",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",
              }}
            >
              {displayImageSrc ? (
                <img
                  src={`data:image/png;base64,${displayImageSrc}`}
                  alt="displayImage"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ) : (
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
                    src={`${Empty}`}
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
              )}
            </Flex>
            <Button
              {...(displayImageSrc
                ? {
                    variant: "soft",
                    style: {
                      width: "100%",
                      backgroundColor: "#DE12FF",
                      color: "white",
                    },
                  }
                : {
                    variant: "soft",
                    style: {
                      disabled: true,
                      width: "100%",
                      backgroundColor: "#E4E4E9",
                      color: "white",
                    },
                    onClick: () => {},
                    disabled: true,
                  })}
            >
              Download image
            </Button>
          </Flex>
        </Flex>

        <Flex
          // direction={"column"}
          // align={"center"}
          wrap={{
            initial: "wrap",
            xs: "wrap",
            sm: "nowrap",
            md: "nowrap",
            lg: "nowrap",
            xl: "nowrap",
          }}
          gap={"8"}
          style={{
            width: "100%",
            mixBlendMode: "luminosity",
            marginTop: "60px",
            backgroundColor: "#0B0B0B",
            padding: "80px 280px",
            borderRadius: "120px 120px 0 0",
          }}
        >
          <Flex
            direction={"column"}
            align={"center"}
            gap={"3"}
            style={{
              display: "flex",
              gap: "8px",
              width: "100%",
            }}
          >
            <img
              src={
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="displayImage"
              style={{
                height: "60px",
                width: "60px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
            <Text
              size={"3"}
              align={"center"}
              style={{
                color: "#8B8D98",
              }}
            >
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nisi id justo aliquam aliquet. Donec id justo aliquam aliquet. Donec id justo aliquam aliquet.`}
            </Text>
          </Flex>
          <Flex
            align={"center"}
            direction={"column"}
            gap={"3"}
            style={{
              display: "flex",
              gap: "8px",
              width: "100%",
            }}
          >
            <img
              src={
                "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="displayImage"
              style={{
                height: "60px",
                width: "60px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
            <Text
              size={"3"}
              align={"center"}
              style={{
                color: "#8B8D98",
              }}
            >
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in nisi id justo aliquam aliquet. Donec id justo aliquam aliquet. Donec id justo aliquam aliquet.`}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
