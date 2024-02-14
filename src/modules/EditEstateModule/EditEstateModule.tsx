import React from "react";
import useTitle from "../../hooks/useTitle";
import { EstateFormModule } from "../EstateFormModule";

export const EditEstateModule = () => {
  useTitle("Редактирование объекта");
  return <EstateFormModule />;
};
