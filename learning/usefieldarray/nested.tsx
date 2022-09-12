import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { appendErrors, useFieldArray, useForm } from "react-hook-form";
const DEAFULT_PARTNER = {
  name: "partner",
  nestedAarry: [{ fName: "XYZ", lName: "ABC" }],
};
const DEFAULT_LINER={fname:'1',lname:'2'};
const NestedFields = ({
  control,
  register,
  errors,
  getValues,
  setvalues,
  index,
}: any) => {
  const { fields, append, remove } = useFieldArray({
    name: "liners",
    control,
  });
  return <>
  <Box>
  <Heading size={'md'}>Liners</Heading>
<HStack>
    {
        fields.map((field,index2)=>{
            return (<>
            <HStack key={field.id}>
            <VStack>
            <FormControl isInvalid={errors?.[`partner${index}`]?.[`liner${index2}`]?.fname}>
                <FormLabel>
                    First Name:
                </FormLabel>
                <Input 
                name={`partner${index}.liner${index2}.fname`}
                ref={register({required:{
                    value:true,
                    message:`liners ${index2} first name is required`
                
                }})}
                defaultValue={field.fname}
                />
                <FormErrorMessage>
                    {errors?.[`partner${index}`]?.[`liner${index2}`]?.fname?.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.[`partner${index}`]?.[`liner${index2}`]?.lname} >
                <FormLabel>
                    Last Name:
                </FormLabel>
                <Input 
                name={`partner${index}.liner${index2}.lname`}
                ref={register({required:{
                    value:true,
                    message:`liners ${index2} last name is required`
                
                }})}
                defaultValue={field.lname}
                />
                <FormErrorMessage>
                    {errors?.[`partner${index}`]?.[`liner${index2}`]?.lname?.message}
                </FormErrorMessage>
            </FormControl>
            </VStack>
            <Button
            onClick={()=>{
                remove(index2);
            }}
            >Remove Liner</Button>
            </HStack>

            </>)
        })
    }
    
</HStack>
<Button
onClick={()=>{
    append(DEFAULT_LINER)
}}
>Add Liner</Button>
  </Box>

  </>;
};
function FieldArray({ register, control, getValues, setValue, errors }: any) {
  const { append, remove, fields } = useFieldArray({
    name: "partner",
    control,
  });
  return (
    <>
      <Box>
        {fields.map((field, index) => {
          return (
            <>
              <VStack key={field.id}>
                <HStack>
                  <FormControl isInvalid={errors?.[`partner${index}`]?.name}>
                    <FormLabel>Partner Name:</FormLabel>
                    <Input
                      name={`partner${index}.name`}
                      ref={register({
                        required: {
                          value: true,
                          message: `partner${index} name is required.`,
                        },
                      })}
                      defaultValue={field.name}
                    />
                    <FormErrorMessage>
                      {errors?.[`partner${index}`]?.name?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Remove Partner
                  </Button>
                </HStack>
                <NestedFields {...{register, control, getValues, setValue, errors,index}} />
              </VStack>
            </>
          );
        })}
        <Button
          onClick={() => {
            append(DEAFULT_PARTNER);
          }}
        >
          Add Partner
        </Button>
      </Box>
    </>
  );
}
const App = () => {
  const {
    register,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = (data: any) => {
    console.log("data=", data);
  };
  return (
    <>
      <Box overflowY='auto'>
      <Heading>Learning neste useFieldArray</Heading>
      <form onSubmit={handleSubmit(submit)}>
      <Button type={'submit'}>Submit</Button>
     <FieldArray {...{ register, control, getValues, setValue, errors }} />
      </form>
      </Box>
    </>
  );
};
export default App;
