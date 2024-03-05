import React from "react";
import useTitle from "../../hooks/useTitle";
import { EditEstateFormModule } from "../EditEstateFormModule";
import { useLocation } from "react-router-dom";
import { CircularProgress, Container, Grid } from "@mui/material";
import { FormFieldsDataInitial } from "../../shared/constants/FormFieldsDataInitital";

export const EditEstateModule = () => {
  useTitle("Редактирование объекта");
  const location = useLocation();

  if (location.state?.estateDetails) {
    const clearData = {
      ...FormFieldsDataInitial,
      ...location.state.estateDetails,
      geoPosition: {
        ...FormFieldsDataInitial.geoPosition,
        ...location.state.estateDetails.geoPosition,
      },
      ownerInfo: {
        ...FormFieldsDataInitial.ownerInfo,
        ...location.state.estateDetails.ownerInfo,
      },
      estateAgent: location.state.estateDetails.estateAgent?._id,
      existingImages: location.state.estateDetails.images,
      images: null,
    };

    return (
      <EditEstateFormModule
        _id={location.state.estateDetails._id}
        editEstateData={clearData}
        currentImages={location.state.estateDetails.images}
      />
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CircularProgress />
        </Grid>
      </Grid>
    </Container>
  );
};
