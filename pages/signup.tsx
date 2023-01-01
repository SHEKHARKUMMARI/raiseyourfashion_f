import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Form from "../components/formcontext/useFormContext";
import { RegisterFormProvider } from "../components/utils/stores/register-form";
function App() {
  return (
    <>
      <Box>
        <RegisterFormProvider>
          <Form />
        </RegisterFormProvider>
      </Box>
    </>
  );
}

export default App;
