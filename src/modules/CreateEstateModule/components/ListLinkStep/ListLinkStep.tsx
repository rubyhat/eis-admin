import { Box, Typography } from "@mui/material";
import React from "react";
import { LinkCard } from "../LinkCard";
import { CustomButton } from "../../../../components/CustomButton";
import { StepData } from "../../store";

interface ListLinkStepProps {
  title: string;
  data: StepData[];
  onSubmit: () => void;
  onCancel: () => void;
}

export const ListLinkStep = (props: ListLinkStepProps) => {
  const { title, data, onSubmit, onCancel } = props;
  const [selected, setSelected] = React.useState(data[0].id);

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
        {data.map(({ id, title, subtitle }) => (
          <Box
            key={id}
            sx={{
              marginBottom: 2,
              "&:last-child": {
                marginBottom: 0,
              },
            }}
          >
            <LinkCard
              id={id}
              title={title}
              subtitle={subtitle}
              selected={selected}
              onClick={() => setSelected(id)}
            />
          </Box>
        ))}
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
