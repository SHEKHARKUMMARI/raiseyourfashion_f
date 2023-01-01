import AddressForm from "./address";
import ContactForm from "./contact";
import BasicForm from "./basic";
import { FormProvider } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import {
  RegisterFormProvider,
  useRegisterFormStore,
} from "../utils/stores/register-form";
const Form = (props: any) => {
  const { methods, currentSection } = useRegisterFormStore();
  const submitHandler = (data: any) => {
    console.log(data);
  };
  // let activeSatge;
  // switch (currentSection) {
  //   case "basic":
  //     activeSatge = <BasicForm />;
  //     break;
  //   case "address":
  //     activeSatge = <AddressForm />;
  //     break;
  //   case "contact":
  //     activeSatge = <ContactForm />;
  //     break;
  //   default:
  //     activeSatge = <BasicForm />;
  // }
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>
          {/* {currentSection === "basic" && (
            <BasicForm />
          )}
          {currentSection === "address" && (
            <AddressForm />
          )}
          {currentSection === "contact" && (
            <ContactForm />
          )}
          
          {currentSection === "success" && (
            <Button type="submit">Create Account</Button>
          )} */}
          <BasicForm />
          <AddressForm />
          <ContactForm />
          <Button type="submit">Create Account</Button>
        </form>
      </FormProvider>
    </>
  );
};
export default Form;
