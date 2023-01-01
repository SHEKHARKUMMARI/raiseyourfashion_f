import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useRegisterFormStore } from "../utils/stores/register-form";
const AddressForm = (props: any) => {
  const { setCurrentSection } = useRegisterFormStore();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Flex
        minH={"10vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Address Form
          </Heading>

          <FormControl isInvalid={errors?.address?.country}>
            <FormLabel>country</FormLabel>
            <Input
              name="address.country"
              ref={register}
              placeholder="enter country here"
            />
            <FormErrorMessage>
              {errors?.address?.country?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.address?.state}>
            <FormLabel>State</FormLabel>
            <Input
              name="address.state"
              ref={register}
              placeholder="enter state here"
            />
            <FormErrorMessage>
              {errors?.address?.state?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.address?.city}>
            <FormLabel>city</FormLabel>
            <Input
              name="address.city"
              ref={register}
              placeholder="enter city here"
            />
            <FormErrorMessage>
              {errors?.address?.city?.message}
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => {
                setCurrentSection("contact");
              }}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};
export default AddressForm;
