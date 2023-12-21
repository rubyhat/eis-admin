import { Box, SwipeableDrawer } from "@mui/material";
import React from "react";
import { useFilterStore } from "../../store/useFilterStore";
import { FilterForm } from "../FilterForm";

export const FilterMobile = () => {
  const { isMobileFilterModalOpen, setIsMobileFilterModalOpen } =
    useFilterStore((state) => state);

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
          // maxHeight: "90vh",
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
          <FilterForm />
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};
