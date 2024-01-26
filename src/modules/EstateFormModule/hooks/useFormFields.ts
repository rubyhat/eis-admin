import { FieldValues, useForm } from "react-hook-form";
import { useCreateEstateStore } from "../../CreateEstateModule/store";
import { FormFieldsData } from "../../../shared/interfaces/EstateObjectTypes";

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
