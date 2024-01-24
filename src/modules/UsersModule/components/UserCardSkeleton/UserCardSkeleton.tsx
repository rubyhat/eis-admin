import { Box, Skeleton } from "@mui/material";
import React from "react";

export const UserCardSkeleton = () => {
  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid",
        borderColor: "customColors.labelsQuaternary",
        borderRadius: 2,
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ marginBottom: 1, borderRadius: 2 }}
        width={"100%"}
        height={40}
      />
      <Skeleton
        variant="rectangular"
        sx={{ marginBottom: 1, borderRadius: 2 }}
        width={"50%"}
        height={40}
      />
      <Skeleton
        variant="rectangular"
        sx={{ marginBottom: 1, borderRadius: 2 }}
        width={"80%"}
        height={40}
      />
      <Skeleton
        variant="rectangular"
        sx={{ marginBottom: 1, borderRadius: 2 }}
        width={"60%"}
        height={40}
      />
    </Box>
  );
};
