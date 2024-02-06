/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import Form from "react-bootstrap/Form";

const Color_Selector = ({ onColorChange }) => {
  const colors = ["White", "Red", "Orange", "Yellow", "Green", "Cyan"];
  const [selectedColor, setSelectedColor] = useState("White");

  const handleColorChange = (e) => {
    const color = e.target.value;
    setSelectedColor(color);
    onColorChange(color);
  };

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
          onChange={handleColorChange}
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
