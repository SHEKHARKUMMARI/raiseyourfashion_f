import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Image } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

function Carousel({ products }: any) {
  const noOfCards = products?.length || 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeRef = useRef<any>(null);
  const _array = [0, 1, 2];
  const [array, setArray] = useState(_array);
  const resetTimeInterval = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  };
  const handleNextClick = () => {
    setCurrentIndex((index) => {
      return index === noOfCards - 1 ? 0 : index + 1;
    });
  };
  const handlePrevoiusClick = () => {
    setCurrentIndex((index) => {
      return index === 0 ? noOfCards - 1 : index - 1;
    });
  };
  useEffect(() => {
    let j = 0;
    for (let i = currentIndex; i >= 0; i--) {
      _array[i] = j;
      j--;
    }
    j = 1;
    for (let i = currentIndex + 1; i < noOfCards; i++) {
      _array[i] = j;
      j++;
    }
    setArray([..._array]);
    resetTimeInterval();
    timeRef.current = setTimeout(() => {
      setCurrentIndex((currentIndex) => {
        if (currentIndex === noOfCards - 1) {
          return 0;
        }
        return currentIndex + 1;
      });
    }, 2000);
    return () => resetTimeInterval();
  }, [currentIndex]);
  return (
    <Box
      w="100%"
      p={4}
      color="white"
      height="30vh"
      display="grid"
      placeItems="center"
    >
      <Box
        as="div"
        className="slider"
        width="100%"
        maxWidth="1000px"
        height="28vh"
        backgroundColor={"purple"}
        position="relative"
        overflow={"hidden"}
      >
        {products?.map((product: any, idx: any) => {
          return (
            <>
              <Box
                as="div"
                key={idx}
                className="slide"
                width={"100%"}
                maxWidth="1000px"
                height="28vh"
                position={"absolute"}
                transition="all 0.5s"
                transform={`translateX(${200 * array[idx]}%)`}
              >
                <Image
                  src={product?.Image}
                  alt=""
                  width="100%"
                  height="300px"
                  object-fit="contain"
                />
              </Box>
            </>
          );
        })}

        <Box
          as="button"
          display={'grid'}
          backgroundColor={"F4F0EF"}
          placeItems='center'
          className="btn btn-next"
          onClick={() => {
            handleNextClick();
          }}
        >
          <ChevronRightIcon color={"purple"} />
        </Box>
        <Box
          as="button"
          backgroundColor={"F4F0EF"}
          display={'grid'}
          placeItems='center'
          className="btn btn-prev"
          onClick={() => {
            handlePrevoiusClick();
          }}

        >
          <ChevronLeftIcon color={"purple"} />
        </Box>
      </Box>
    </Box>
  );
}

export default Carousel;
