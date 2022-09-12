import { HStack,VStack,Box,Input } from "@chakra-ui/react";
import React from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues }) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "test"
  });

  renderCount++;

  return (
    <>
      <VStack>
        {fields.map((item, index) => {
          return (
            < Box key={item.id}>
              <Input
                name={`test[${index}].name`}
                ref={register()}
                defaultValue={item.name}
              />

              <Box as="button" onClick={() => remove(index)}>
                Delete
              </Box>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </Box>
          );
        })}
      </VStack>

      <section>
        <Box 
          as="button"
          onClick={() => {
            append({ name: "append" });
          }}
        >
          append
        </Box>
{/* 
        <button
          type="button"
          onClick={() => {
            setValue("test", [
              ...getValues().test,
              {
                name: "append",
                nestedArray: [{ field1: "append", field2: "append" }]
              }
            ]);
          }}
        >
          Append Nested
        </button>

        <button
          type="button"
          onClick={() => {
            prepend({ name: "append" });
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            setValue("test", [
              {
                name: "append",
                nestedArray: [{ field1: "Prepend", field2: "Prepend" }]
              },
              ...getValues().test
            ]);
          }}
        >
          prepend Nested
        </button>*/}
      </section> 

    </>
  );
}
