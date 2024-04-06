import React from "react";
import { Box, Skeleton } from "@mui/material";

export const FeedbackOrderCardSkeleton = () => {
  return (
    <Box display={{ xs: "block", sm: "flex" }} gap={2}>
      <Skeleton
        variant="rectangular"
        sx={{ marginBottom: 1, borderRadius: 2 }}
        width={"100%"}
        height={300}
      />
      <Skeleton
        variant="rectangular"
        sx={{ marginBottom: 1, borderRadius: 2 }}
        width={"100%"}
        height={300}
      />
    </Box>
  );
};
