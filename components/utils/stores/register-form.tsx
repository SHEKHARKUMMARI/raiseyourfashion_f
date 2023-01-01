import { useState } from "react"
import { useForm } from "react-hook-form";
import {createRexStore} from 'rex-state';
const useRegister= ()=>{
    const [currentSection,setCurrentSection]=useState('basic');
    const methods=useForm();
    return {
        currentSection,
        setCurrentSection,
        methods
    }
}
const {RexProvider,useStore}=createRexStore(useRegister);
export const RegisterFormProvider=RexProvider;
export const useRegisterFormStore=useStore;
