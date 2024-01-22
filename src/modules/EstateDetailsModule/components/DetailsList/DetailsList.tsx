import { Box } from "@mui/material";
import React from "react";
import { DetailsListItem } from "../DetailsListItem";
import { DisplayEstateObject } from "../../../CreateEstateModule/store";
import { estateObjectDictionary } from "../../../../shared/dictionaries/EstateObjectDictionary";

interface DetailsListProps {
  estateDetails: DisplayEstateObject;
}

// todo: use usePriceNormalize for display price with discount
// add accordion to show all properties?

export const DetailsList = ({ estateDetails }: DetailsListProps) => {
  const squareText = estateDetails.kitchenSquare
    ? `Общая ${estateDetails.houseSquare} м², кухня — ${estateDetails.kitchenSquare} м²`
    : `Общая ${estateDetails.houseSquare} м²`;
  return (
    <Box
      component="ul"
      sx={{
        padding: 2,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "customColors.labelsQuaternary",
      }}
    >
      <DetailsListItem
        title={estateObjectDictionary.category[estateDetails.category]}
        label="Категория"
      />
      {estateDetails.isCommercial && (
        <DetailsListItem title="Да" label="Коммерческий объект?" />
      )}
      <DetailsListItem
        title={estateObjectDictionary.type[estateDetails.type]}
        label="Тип услуги"
      />
      {estateDetails.houseCondition && (
        <DetailsListItem
          title={
            estateObjectDictionary.houseCondition[estateDetails.houseCondition]
          }
          label="Состояние"
        />
      )}
      {estateDetails.price && (
        <DetailsListItem
          title={estateDetails.price.toLocaleString("ru")}
          label="Стоимость"
        />
      )}
      <DetailsListItem title={estateDetails.geoPosition.city} label="Город" />
      <DetailsListItem
        title={`${estateDetails.geoPosition.street}, ${estateDetails.geoPosition.houseNumber}`}
        label="Адрес"
        link={estateDetails.geoPosition.mapLink}
      />
      {Boolean(estateDetails.roomCount) && (
        <DetailsListItem
          title={String(estateDetails.roomCount)}
          label="Количество комнат"
        />
      )}
      {estateDetails.furniture && (
        <DetailsListItem
          title={estateObjectDictionary.furniture[estateDetails.furniture]}
          label="Мебелирован?"
        />
      )}
      {Boolean(estateDetails.countFloor) && (
        <DetailsListItem
          title={String(estateDetails.countFloor)}
          label="Этажей в квартире/доме"
        />
      )}
      {Boolean(estateDetails.ceilingHeight) && (
        <DetailsListItem
          title={String(estateDetails.ceilingHeight)}
          label="Высота потолков"
        />
      )}
      {Boolean(estateDetails.toiletCount) && (
        <DetailsListItem
          title={String(estateDetails.toiletCount)}
          label="Количество сан. узлов"
        />
      )}
      {estateDetails.houseType && (
        <DetailsListItem
          title={estateObjectDictionary.houseType[estateDetails.houseType]}
          label="Тип дома"
        />
      )}
      {estateDetails.houseWallMaterial && (
        <DetailsListItem
          title={
            estateObjectDictionary.houseWallMaterial[
              estateDetails.houseWallMaterial
            ]
          }
          label="Стены дома"
        />
      )}
      {estateDetails.houseRoofMaterial && (
        <DetailsListItem
          title={
            estateObjectDictionary.houseRoofMaterial[
              estateDetails.houseRoofMaterial
            ]
          }
          label="Крыша дома"
        />
      )}
      {estateDetails.houseBuildingYear && (
        <DetailsListItem
          title={String(estateDetails.houseBuildingYear)}
          label="Год постройки"
        />
      )}
      {estateDetails.targetFloor && estateDetails.totalFloor && (
        <DetailsListItem
          title={`${estateDetails.targetFloor} из ${estateDetails.totalFloor}`}
          label="Этаж"
        />
      )}
      {estateDetails.houseSquare && (
        <DetailsListItem title={squareText} label="Площадь, м²" />
      )}
      {estateDetails.plotSquare && (
        <DetailsListItem
          title={String(estateDetails.plotSquare)}
          label="Площадь земельного участка"
        />
      )}
      {estateDetails.electricType && (
        <DetailsListItem
          title={
            estateObjectDictionary.electricType[estateDetails.electricType]
          }
          label="Электричество"
        />
      )}
      {estateDetails.heatingType && (
        <DetailsListItem
          title={estateObjectDictionary.heatingType[estateDetails.heatingType]}
          label="Отопление"
        />
      )}
      {estateDetails.waterType && (
        <DetailsListItem
          title={estateObjectDictionary.waterType[estateDetails.waterType]}
          label="Вода"
        />
      )}
      {estateDetails.sewerType && (
        <DetailsListItem
          title={estateObjectDictionary.sewerType[estateDetails.sewerType]}
          label="Канализация"
        />
      )}
      {estateDetails.gasType && (
        <DetailsListItem
          title={estateObjectDictionary.gasType[estateDetails.gasType]}
          label="Газ"
        />
      )}
      {estateDetails.toiletType && (
        <DetailsListItem
          title={estateObjectDictionary.toiletType[estateDetails.toiletType]}
          label="Сан. узел"
        />
      )}
      {estateDetails.ethernet && (
        <DetailsListItem
          title={estateObjectDictionary.ethernet[estateDetails.ethernet]}
          label="Сан. узел"
        />
      )}
      <DetailsListItem
        title={
          estateDetails.isDocumentsGood ? "В порядке" : "Требуется проверка"
        }
        label="Документы"
      />
      <DetailsListItem
        title={
          estateDetails.mortgage
            ? "Подходит под ипотеку"
            : "Не подходит под ипотеку"
        }
        label="Ипотека"
      />
      <DetailsListItem
        title={estateDetails.hasSwap ? "Есть обмен" : "Нет обмена"}
        label="Обмен"
      />
      {estateDetails.hasBasement && (
        <DetailsListItem title="Есть" label="Цокольный этаж" />
      )}
      {estateDetails.hasMansard && (
        <DetailsListItem title="Есть" label="Мансарда" />
      )}
      {estateDetails.videoLink && (
        <DetailsListItem
          label="Видео обзор"
          videoLink={estateDetails.videoLink}
        />
      )}
    </Box>
  );
};
