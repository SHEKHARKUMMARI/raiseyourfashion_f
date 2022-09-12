import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
// import FieldArray from "./fieldArray";
import { Box, VStack, HStack, Input } from "@chakra-ui/react";

const Nested = ({ nestIndex, control, register }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `test[${nestIndex}].nestedArray`,
  });

  return (
    <VStack>
      {fields.map((item, k) => {
        return (
          <Box key={item.id} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            <input
              name={`test[${nestIndex}].nestedArray[${k}].field1`}
              ref={register({ required: true })}
              defaultValue={item.field1}
              style={{ marginRight: "25px" }}
            />

            <Input
              name={`test[${nestIndex}].nestedArray[${k}].field2`}
              ref={register()}
              defaultValue={item.field2}
            />
            <Box as="button" type="button" onClick={() => remove(k)}>
              Delete Nested
            </Box>
          </Box>
        );
      })}

      <Box
        as="button"
        onClick={() =>
          append({
            field1: "field1",
            field2: "field2",
          })
        }
      >
        Append Nested
      </Box>

      <hr />
    </VStack>
  );
};

function Fields({ control, register, setValue, getValues }: any) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "test",
  });

  return (
    <>
      <VStack>
        {fields.map((item, index) => {
          return (
            <Box key={item.id}>
              <Input
                name={`test[${index}].name`}
                ref={register()}
                defaultValue={item.name}
              />

              <Box as="button" onClick={() => remove(index)}>
                Delete
              </Box>
              <Nested nestIndex={index} {...{ control, register }} />
            </Box>
          );
        })}
      </VStack>

      <section>
        <Box
          as="button"
          onClick={() => {
            append({ name: "" });
          }}
        >
          append
        </Box>
      </section>
    </>
  );
}
export default function App() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue,
  } = useForm();
  const onSubmit = (data:any) => console.log("data", data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fields {...{ control, register, getValues, setValue, errors }} />

      <Box as="button" type="submit">
        Submit
      </Box>
    </form>
  );
}
