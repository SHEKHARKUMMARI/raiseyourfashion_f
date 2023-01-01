import { Box } from "@chakra-ui/react";
import React from "react";

function BoxRotating() {
  return (
    <>
      <Box
        className="rotator"
        width={"40px"}
        height="40px"
        background={"red"}
      ></Box>
      <style jsx>
        {`
          .rotator {
            transform: rotate(45deg);
          }
        `}
      </style>
    </>
  );
}

export default BoxRotating;
