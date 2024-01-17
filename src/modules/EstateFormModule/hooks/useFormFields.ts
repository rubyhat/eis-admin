import { FieldValues, useForm } from "react-hook-form";
import {
  FormFieldsData,
  useCreateEstateStore,
} from "../../CreateEstateModule/store";

// todo: remove, deprecated
export const useFormFields = () => {
  const { formFieldsData, setFormFieldsData } = useCreateEstateStore(
    (state) => state,
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      ...formFieldsData,
    },
  });

  const updateFormFields = (data: FieldValues) => {
    setFormFieldsData(data as FormFieldsData);
  };

  // Дополнительная логика при необходимости

  return { control, register, handleSubmit, errors, updateFormFields };
};
