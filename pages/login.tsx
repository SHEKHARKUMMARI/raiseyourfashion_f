import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
} from "@chakra-ui/react";
import SuccessAlert from "../components/utils/modals/successmodal";
import { stringify } from "query-string";
import { EmailValidator } from "../utils/validator";
import type { LoginWithEmail } from "../components/interfaces";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Product from "../components/product";
import { useRouter } from "next/router";
import axios from "axios";
export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm<any>({
    reValidateMode: "onSubmit",
  });
  const { errors } = formState;
  const inputRef = useRef<any>();
  const autoFocus = useCallback((inputElement: any) => {
    if (!inputRef?.current) {
      inputElement.focus();
      inputRef.current = true;
    }
  }, []);
  const {
    isOpen: isLoginAlertOpen,
    onOpen: onLoginAlertOpen,
    onClose: onLOginAlertClose,
  } = useDisclosure();
  const router = useRouter();
  const postLogin = () => {
    let redirectUrl = "/";
    if (router?.query?.hasOwnProperty("next")) {
      const { next, ...rest } = router?.query;
      const additionalqueries = stringify(rest, {
        skipEmptyString: true,
        skipNull: true,
      });
      redirectUrl = next + additionalqueries;
    }
    onLoginAlertOpen();
    setTimeout(() => {
      onLOginAlertClose();
      router.push(redirectUrl);
    }, 5000);
  };
  const submitHandler = async (data: LoginWithEmail) => {
    const payload = data;
    try {
      const res = await axios.post("/api/login", payload);
      console.log("log in response in page", res);
      postLogin();
    } catch (error) {
      console.log(error);
    }
  };
  console.log("errors==", errors);
  return (
    <>
    {
      isLoginAlertOpen&&<SuccessAlert />
    }
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our hot <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(submitHandler)}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors?.email}>
                <FormLabel>Email/Number number</FormLabel>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  ref={register({
                    required: { value: true, message: "email is required" },
                    pattern: {
                      value: EmailValidator,
                      message: "provide a valid email",
                    },
                  })}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors?.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  ref={register({
                    required: {
                      value: true,
                      message: "password is required",
                    },
                  })}
                />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
    </>
    
  );
}
