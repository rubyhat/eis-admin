import { Box, Typography } from "@mui/material";
import React from "react";
import { LinkCard } from "../LinkCard";
import { CustomButton } from "../../../../components/CustomButton";

interface ListLinkStepProps {
  title: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ListLinkStep = (props: ListLinkStepProps) => {
  const { title, onSubmit, onCancel } = props;
  return (
    <Box width={1}>
      <Typography
        component="h3"
        variant="titleSecondRegular"
        textAlign="center"
      >
        {title}
      </Typography>
      <Box sx={{ padding: "32px 0" }}>
        <LinkCard title="Продать" subtitle="Продажа недвижимости" />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <CustomButton
          onClick={onCancel}
          isCancelVariant
          sx={{ marginRight: 2 }}
        >
          Назад
        </CustomButton>
        <CustomButton onClick={onSubmit}>Дальше</CustomButton>
      </Box>
    </Box>
  );
};
