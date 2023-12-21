import { Box } from "@mui/material";
import React from "react";
import { DetailsListItem } from "../DetailsListItem";

export const DetailsList = () => {
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
      <DetailsListItem title="Продажа" label="Тип услуги" />
      <DetailsListItem title="Караганда" label="Город" />
      <DetailsListItem
        title="Проспект Нуркена Абдирова, 124/3а"
        label="Адрес"
        link="https://go.2gis.com/32yh5"
      />
      <DetailsListItem title="Панельный" label="Тип дома" />
      <DetailsListItem title="1989" label="Год постройки" />
      <DetailsListItem title="1 из 10" label="Этаж" />
      <DetailsListItem
        title="59.6 м², Площадь кухни — 16.6 м²"
        label="Площадь, м²"
      />
      <DetailsListItem title="Хорошее" label="Состояние" />
      <DetailsListItem
        label="Видео обзор"
        videoLink="https://www.instagram.com/reel/C0yxbgDt63W/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=="
      />
    </Box>
  );
};
