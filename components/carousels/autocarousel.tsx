import {
  Center,
  Box,
  useColorModeValue,
  Stack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
const images = [
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
];

function AutoCarousel({ noOfCards = 3 }: any) {
  const timeRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const resetTimeInterval = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  };
  useEffect(() => {
    resetTimeInterval();
    timeRef.current = setTimeout(() => {
      setCurrentIndex((currentIndex) => {
        if (currentIndex === noOfCards - 1) {
          return 0;
        }
        return currentIndex + 1;
      });
    }, 1000);
  }, [currentIndex]);
  return (
    <>
      <Box margin={"0 auto"} overflow="hidden" maxWidth="400px">
        <Box
          as="div"
          display="flex"
          whiteSpace="nowrap"
          transition="ease 1000ms"
          style={{ transform: `translate3d(${-currentIndex * 120}%, 0, 0)` }}
        >
          <Box>
            {images.map((image, index) => {
              return (
                <>
                  <Center
                    as="div"
                    display="inline-block"
                    height="400px"
                    width="100%"
                    borderRadius="40px"
                  >
                    <Box
                      role={"group"}
                      maxW={"330px"}
                      w={"full"}
                      bg={useColorModeValue("white", "gray.800")}
                      boxShadow={"2xl"}
                      rounded={"lg"}
                      pos={"relative"}
                      zIndex={1}
                    >
                      <Box
                        rounded={"lg"}
                        pos={"relative"}
                        height={"230px"}
                        _after={{
                          transition: "all .3s ease",
                          content: '""',
                          w: "full",
                          h: "full",
                          pos: "absolute",
                          top: 5,
                          left: 0,
                          backgroundImage: `url(${image})`,
                          filter: "blur(15px)",
                          zIndex: -1,
                        }}
                        _groupHover={{
                          _after: {
                            filter: "blur(20px)",
                          },
                        }}
                      >
                        <Image
                          rounded={"lg"}
                          height={230}
                          width={282}
                          objectFit={"cover"}
                          src={image}
                        />
                      </Box>
                      <Stack pt={10} align={"center"}>
                        <Text
                          color={"gray.500"}
                          fontSize={"sm"}
                          textTransform={"uppercase"}
                        >
                          Brand
                        </Text>
                        <Heading
                          fontSize={"2xl"}
                          fontFamily={"body"}
                          fontWeight={500}
                        >
                          Nice Chair, pink
                        </Heading>
                        <Stack direction={"row"} align={"center"}>
                          <Text fontWeight={800} fontSize={"xl"}>
                            $57
                          </Text>
                          <Text
                            textDecoration={"line-through"}
                            color={"gray.600"}
                          >
                            $199
                          </Text>
                        </Stack>
                      </Stack>
                    </Box>
                  </Center>
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AutoCarousel;
