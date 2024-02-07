/* eslint-disable no-unused-vars */
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Flex, Text, Button } from "@radix-ui/themes";

const TheNavbar = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar fixed="top" variant="dark">
        <Container
          style={{
            padding: "2rem",
            height: "80px",
            width: "100%",
            backgroundColor: "#1D1E23",
            borderRadius: "999px",
            border: "1px solid #1F1F21",
          }}
        >
          <Navbar.Brand onClick={reload} className="mouse">
            <Flex gap={"2"} align={"center"}>
              <img
                src="https://s3-alpha-sig.figma.com/img/09a8/66c2/de9fdf8821a80d0b862c9df74ef4f0b1?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=faiZB5f1asBGrXtcSlVQ1tbo5ZfNAPPb3A2A2sRf5di6W~gc-zEozX32R1NUUGwh0R7zB38QnRpATWdifsWrmXV~zgZ8exYTZUSXovWvAevCzb3NAGumQaaNBPrDFwKtOAstc14mEX61BSlKb6Z4i16e8GPnHZwnEB~yYIdTt1PTWuKtnUQUhFJkZLnhLgppuNipvMbCxwmOJxkJye53ZY8T0RINSsIX0b0~842j2YYjE6eohMhds1Qvzk-eWL44YCVxCyTJISXX52W~z2USJODtyx13m5EaBO8ESFZjHZ~gXxZX5vOVND1eIEnr4M0Xp1U9jwx~EdwKu8Y5EEwW1Q__"
                height={24}
                width={24}
              ></img>
              <Text
                size="4"
                style={{
                  fontWeight: "bold",
                }}
              >
                PhotoGbee
              </Text>
            </Flex>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Flex gap={"2"}>
              <Button
                radius="full"
                style={{
                  backgroundColor: "#DE13FF",
                }}
              >
                Log in
              </Button>
              <Button
                radius="full"
                style={{
                  backgroundColor: "#fff",
                  color: "#DE13FF",
                  border: "1px solid #DE13FF",
                }}
              >
                Sign up
              </Button>
            </Flex>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TheNavbar;
