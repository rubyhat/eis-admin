import React from "react";
import { Box } from "@mui/material";

import { CustomButton } from "../../../../components/CustomButton";
import { useFeedbackOrdersStore } from "../../store";
import { FeedbackOrderFilterFormMobile } from "../FeedbackOrderFilterFormMobile";

export const FeedbackOrderFilterMobileWrapper = () => {
  const { setIsMobileFilterModalOpen } = useFeedbackOrdersStore(
    (state) => state,
  );

  const handleFilterButtonClick = () => setIsMobileFilterModalOpen(true);
  return (
    <Box
      sx={{
        display: {
          xs: "inherit",
          md: "none",
        },
        width: {
          xs: 1,
          sm: "min-content",
        },
        marginTop: {
          xs: 1,
          sm: 0,
        },
        marginLeft: {
          xs: 0,
          sm: 2,
        },
      }}
    >
      <CustomButton
        onClick={handleFilterButtonClick}
        fullWidth
        size="small"
        sx={{
          maxWidth: {
            xs: 1,
            sm: 120,
          },
          height: 34,
        }}
      >
        Фильтры
      </CustomButton>
      <FeedbackOrderFilterFormMobile />
    </Box>
  );
};
