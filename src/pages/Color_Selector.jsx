/* eslint-disable no-unused-vars */
import { Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const Color_Selector = () => {
  const colors = ["White", "Red", "Orange", "Yellow", "Green", "Cyan"];
  const [selectedColor, setSelectedColor] = useState("");

  return (
    <>
      <Flex
        style={{
          //   backgroundColor: "white",
          width: "60%",
        }}
      >
        <Form.Select
          aria-label="Default select example"
          defaultValue={"White"}
          onChange={(e) => {
            console.log(e.target.value);
            setSelectedColor(e.target.value);
          }}
        >
          <option>Color</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </Form.Select>
      </Flex>
    </>
  );
};

export default Color_Selector;
