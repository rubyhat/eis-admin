import React from "react";
import useTitle from "../../hooks/useTitle";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AgentCard } from "../../components/AgentCard/AgentCard";
import { DetailsList } from "./components/DetailsList/DetailsList";
import { ImageViewer } from "./components/ImageViewer/ImageViewer";
import { SettingsButtonBar } from "./components/SettingsButtonBar";
import { CustomHr } from "../../components/CustomHr";
import { TitleGroup } from "./components/TitleGroup";

export const EstateDetailsModule = () => {
  useTitle("Детали объекта недвижимости");

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleGroup />
        </Grid>
        <Grid item xs={12} md={5} lg={6}>
          <SettingsButtonBar />
          <CustomHr />
          <AgentCard />
          <Box padding="16px 0">
            <DetailsList />
          </Box>
          <Box>
            <Typography variant="textBodyRegular">
              Тихий двор, неугловая, кухня-студия, улучшенная, пластиковые окна,
              счётчики. Здравствуйте уважаемые покупатели !<br />
              <br />
              Вашему вниманию предлагаем улучшенную 2ух комнатную квартиру на
              Степном-4 !<br />
              <br />
              Квартира после перепланировки и косметического ремонта, увеличили
              санузел, вынесли кухню в другое место, включили в площадь квартиры
              тамбур, сделали натяжной, поменяли трубы отопления и проводку.
              <br />
              <br />
              После продажи недвижимости всё остаётся. ДОКУМЕНТЫ узаконены.
              <br />
              <br />
              На этаже всего лишь две квартиры. Подъезд чистый и ухоженный, во
              дворе большая детская площадка, достаточное количество парковочных
              мест. <br />
              <br />
              Вокруг дома расположились три школы: №23, 39, 5, два детских
              садика, супермаркет Корзина, Норма, торговый дом Алмаз, остановки:
              овощной, швейная, турист, Корзина !<br />
              <br />
              Спасибо за внимание ! По запросу отправляем подробный видеообзор !
              <br />
              <br />
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} lg={6}>
          <ImageViewer />
        </Grid>
      </Grid>
    </Container>
  );
};
