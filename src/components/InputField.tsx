import React, { InputHTMLAttributes } from "react";
import { format } from "path";
import { FormErrorMessage, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &{
    name: string;
    label: string;
    placeholder: string;
    textarea?: boolean
};

export const InputField: React.FC<InputFieldProps> = ({
    label, 
    textarea,
    size: _,
    ...props
}) => {
    let InputOrTextarea = Input;
    if(textarea){
        InputOrTextarea = Textarea;
    
    }
    const [field, {error}] = useField(props);
    return (
        <FormControl isInvalid = {!!error}>
            
            <FormLabel htmlFor = {field.name}>{label}</FormLabel>
                <InputOrTextarea 
                {...field}
                {...props}
                id = {field.name} 
                />  
            {error ? <FormErrorMessage>{error}</FormErrorMessage>: null}
        </FormControl>
    )
} 