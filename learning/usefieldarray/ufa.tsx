import React, { Fragment } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Button,
  Input,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
const TEMPLATE = { car: "", cost: 0 };
const Vehicles = ({ register, control, pIndex }: any) => {
  const { fields, append, remove } = useFieldArray({
    name: `person[${pIndex}].vehicle`,
    control,
  });
  return (
    <>
      <Box>
        <VStack>
          {fields.map((field, index) => {
            return (
              <Box key={field.id}>
                <HStack>
                  <Box as="button" onClick={() => remove(index)} color="red">
                    <DeleteIcon />
                  </Box>
                  <FormControl>
                    <FormLabel>select a car:</FormLabel>
                    <Input
                      ref={register()}
                      name={`person[${pIndex}].vehicle[${index}].name`}
                      defaultValue={field.name}
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel>cost</FormLabel>
                  <Input
                    ref={register()}
                    name={`person[${pIndex}].vehicle[${index}].car`}
                    defaultValue={field.car}
                  />
                </FormControl>
              </Box>
            );
          })}
          <Box
            as="button"
            onClick={() => {
              append({ name: "", car: 0 });
            }}
          >
            +Add vehicle
          </Box>
        </VStack>
      </Box>
    </>
  );
};
const Partner = ({ register, control }: any) => {
  const { fields, append, remove } = useFieldArray({
    name: "person",
    control,
  });
  return (
    <>
      <Box
        as="button"
        onClick={() => {
          append({ name: "" });
        }}
      >
        +Add partner
      </Box>
      {fields.map((field, index) => {
        // console.log("pIndex", index);

        return (
          <Box key={field.id}>
            <HStack>
              <Box
                as="button"
                // onClick={()=>remove(pIndex)}
                onClick={() => {
                  remove(index);
                  console.log("delted", index);
                }}
              >
                <DeleteIcon />
              </Box>
              <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input
                  name={`person[${index}].name`}
                  ref={register()}
                  defaultValue={field.name}
                />
              </FormControl>

              <Vehicles pIndex={index} {...{ control, register }} />
            </HStack>
            <hr />
          </Box>
        );
      })}
    </>
  );
};
function Fun() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();
  const submitHandler = (data: any) => {
    console.log("data==", data);
  };
  console.log("getindg data===", getValues());
  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Heading>Persons Vehicles Data</Heading>
          <VStack>
            <Partner {...{ register, control }} />
            <Box as="button" type="submit">
              Submit
            </Box>
            <hr />
          </VStack>
        </form>
      </Box>
    </>
  );
}

export default Fun;
