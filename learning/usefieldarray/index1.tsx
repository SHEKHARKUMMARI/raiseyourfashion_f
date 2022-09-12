import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, useDisclosure } from "@chakra-ui/react";
import { isOptionDisabled } from "react-select/src/builtins";
// interface Data{
//   firstName:string;
//   lastName:string;
// }
const Edit=({index,register,value}:any)=>{
  return(<>
  <FormControl>
    <FormLabel>
      First Name
    </FormLabel>
    <Input ref={register} name={`name.${index}.firstName`} defaultValue={value.firstName} />
  </FormControl>
  <FormControl>
    <FormLabel>
      Last Name
    </FormLabel>
    <Input ref={register} name={`name.${index}.lastName`} defaultValue={value.lastName} />
  </FormControl>
  </>)
}
const AddField = ({ append,onClose }: any) => {
  const {handleSubmit,register,formState:{errors}}=useForm();
  const submitHandler=(data:any)=>{
    append(data);
    onClose();
  }
  return(
    <>
    <form onSubmit={handleSubmit(submitHandler)}>
    <FormControl isInvalid={errors?.firstName}>
      <FormLabel >
      FirstName
      </FormLabel>
      <Input name={'firstName'} ref={register({required:{
        value:true,
        message:'First Name is required'
      }})} />
      <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors?.lastName}>
      <FormLabel >
      LastName
      </FormLabel>
      <Input name={'lastName'} ref={register({required:{
        value:true,
        message:'Last Name is required'
      }})} />
      <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
    </FormControl>
    <Button type='submit'>Submit To Append</Button>
    </form>
    </>
  )
};
function MyApp() {
  const { handleSubmit, control,register } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { fields,append, insert, remove } = useFieldArray({
    name: "myname",
    control,
  });
  const submit = (data: any) => {
    console.log("data===", data);
  };
  console.log("fields==",fields);
  return (
    <>
      {isOpen && <AddField append={append} onClose={onClose} />}
      <form onSubmit={handleSubmit(submit)}>
        {fields.map((field, index) => {
          return (
            <>
              
              <Edit  index={index} value={field} register={register} />
            </>
          );
        })}
      <Button type='submit'>Submit</Button>

      </form>
      <Button onClick={onOpen}>Append</Button>
    </>
  );
}

export default MyApp;
