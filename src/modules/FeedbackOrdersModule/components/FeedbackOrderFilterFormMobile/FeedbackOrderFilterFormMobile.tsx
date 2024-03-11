import React from "react";
import { Box, SwipeableDrawer } from "@mui/material";

import { useFeedbackOrdersStore } from "../../store";
import { FeedbackOrderFilterForm } from "../FeedbackOrderFilterForm";

export const FeedbackOrderFilterFormMobile = () => {
  const { isMobileFilterModalOpen, setIsMobileFilterModalOpen } =
    useFeedbackOrdersStore((state) => state);

  const handleModalClose = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsMobileFilterModalOpen(false);
  };

  const handleModalOpen = () => setIsMobileFilterModalOpen(true);
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isMobileFilterModalOpen}
      onClose={handleModalClose}
      onOpen={handleModalOpen}
      PaperProps={{
        sx: {
          width: 1,
          borderRadius: "8px 8px 0 0",
        },
      }}
    >
      <Box>
        <Box display="flex" justifyContent="center">
          <Box
            sx={{ padding: "12px 0 4px 0", width: "20%", cursor: "pointer" }}
            onClick={handleModalClose}
          >
            <Box
              sx={{
                width: "100%",
                height: 4,
                borderRadius: 4,
                backgroundColor: "customColors.labelsQuaternary",
              }}
            ></Box>
          </Box>
        </Box>
        <Box>
          <FeedbackOrderFilterForm />
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};
