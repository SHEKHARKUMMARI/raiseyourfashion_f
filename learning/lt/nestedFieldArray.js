import { Input, Box, VStack } from "@chakra-ui/react";
import React from "react";
import { useFieldArray } from "react-hook-form";

export default Nested = ({ nestIndex, control, register }) => {
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
