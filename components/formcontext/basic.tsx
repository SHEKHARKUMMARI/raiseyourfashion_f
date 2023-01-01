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
import { useRegisterFormStore } from "../utils/stores/register-form";
import { useFormContext } from "react-hook-form";
const BasicForm = (props: any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const {setCurrentSection}=useRegisterFormStore();
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
            Basic Form
          </Heading>
          <FormControl isInvalid={errors?.name?.firstName}>
            <FormLabel>Enter First Name</FormLabel>
            <Input
              name="name.firstName"
              ref={register}
              placeholder="enter your first name"
            />
            <FormErrorMessage>
              {errors?.name?.firstName?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.name?.lastName}>
            <FormLabel>Enter First Name</FormLabel>
            <Input
              name="name.lastName"
              ref={register}
              placeholder="enter your last name"
            />
            <FormErrorMessage>
              {errors?.name?.lastName?.message}
            </FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={()=>{
                setCurrentSection('address');
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
export default BasicForm;
