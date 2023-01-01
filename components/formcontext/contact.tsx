import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useRegisterFormStore } from "../utils/stores/register-form";

const ContactForm = (props: any) => {
  const { setCurrentSection } = useRegisterFormStore();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Stack minH={"10vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>Contact Form</Heading>
            <FormControl isInvalid={errors?.contact?.mobile}>
              <FormLabel>Enter Mobile Number</FormLabel>
              <Input
                name="contact.mobile"
                ref={register}
                placeholder="enter your mobile number"
              />
              <FormErrorMessage>
                {errors?.contact?.mobile?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.contact?.email}>
              <FormLabel>Enter Email</FormLabel>
              <Input
                name="contact.email"
                ref={register}
                placeholder="enter your email"
              />
              <FormErrorMessage>
                {errors?.contact?.email?.message}
              </FormErrorMessage>
            </FormControl>
            <HStack spacing={6}>
              <Button
                colorScheme={"blue"}
                variant={"solid"}
                onClick={() => {
                  setCurrentSection("success");
                }}
              >
                Next
              </Button>
            </HStack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
};
export default ContactForm;
