export const selectStatusWrapperStyles = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  pb: 2,
};
export const menuItemStyles = { display: "flex", alignItems: "center", gap: 1 };
export const statusDotStyles = (color: string) => {
  return {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: color,
  };
};
