import React from "react";
import lodash from "lodash";

import { Box, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { apiCatalogModule } from "../../api/apiCatalogModule";

export const CatalogSearch = () => {
  const [searchStreet, setSearchStreet] = React.useState("");
  const queryClient = useQueryClient();

  const fetchCatalog = React.useCallback(
    lodash.debounce(async (queryParams: string) => {
      await queryClient.fetchQuery({
        queryKey: ["catalogItems"],
        queryFn: () => apiCatalogModule.fetchCatalog(queryParams),
      });
    }, 333), // Задержка в миллисекундах
    [],
  );

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const v = e.currentTarget.value;
    setSearchStreet(v);

    const queryParams = new URLSearchParams({ searchStreet: v }).toString();
    fetchCatalog(queryParams);
  };

  React.useEffect(() => {
    return () => {
      fetchCatalog.cancel(); // Отмена выполнения при размонтировании компонента
    };
  }, [fetchCatalog]);

  return (
    <Box pt={2} width={1}>
      <TextField
        id="streetSearch"
        label="Поиск"
        placeholder="Введите название улицы"
        value={searchStreet}
        onChange={(e) => handleInputChange(e)}
        sx={{
          width: 1,
          borderRadius: 2,
          outlineColor: "customColors.colorsOrange",
          "&::placeholder": {
            fontSize: 16,
            color: "customColors.labelsTertiary",
          },
          "& fieldset": {
            borderRadius: 2,
            borderColor: "customColors.labelsQuaternary",
          },
        }}
        InputLabelProps={{ sx: { color: "customColors.labelsTertiary" } }}
      />
    </Box>
  );
};
