export const cardWrapperStyles = (color: string) => {
  return {
    display: "flex",
    flexDirection: "column",
    padding: 2,
    border: "2px solid",
    borderColor: color,
    borderRadius: 2,
    height: 1,
  };
};

export const titleWrapperStyles = {
  width: 1,
  display: "flex",
  justifyContent: "space-between",
  gap: 1,
};

export const infoWrapperStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const buttonsWrapperStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  marginBottom: 1,
  gap: 1,
};
