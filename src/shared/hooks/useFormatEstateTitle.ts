import { livingSpaces } from "../constants/FormFieldsDataInitital";
import { estateObjectDictionary } from "../dictionaries/EstateObjectDictionary";
import { CategoryType } from "../interfaces/EstateObjectTypes";

interface FormatEstateTitleProps {
  category: CategoryType;
  roomCount?: number;
  houseSquare?: number;
}

export const useFormatEstateTitle = ({
  category,
  roomCount,
  houseSquare,
}: FormatEstateTitleProps) => {
  let title = estateObjectDictionary.category[category];
  if (livingSpaces.includes(category) && roomCount)
    title = title + " | Комнат: " + roomCount;
  if (houseSquare) title = title + " | Площадь: " + houseSquare + "м²";
  return { title };
};
