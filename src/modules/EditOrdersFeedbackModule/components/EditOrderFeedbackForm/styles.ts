export const formStyles = {
  width: 1,
  borderRadius: 2,
  boxShadow:
    "0px 0px 0px 0.5px rgba(0, 0, 0, 0.05), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30)",
  height: "fit-content",
};

export const textareaStyles = {
  width: 1,
  minHeight: 150,
  border: `1px solid`,
  borderColor: "customColors.labelsQuaternary",
  borderRadius: "5px",
  fontSize: 16,
  padding: 1,
  outlineColor: "customColors.colorsOrange",
  "&::placeholder": {
    fontSize: 14,
    color: "customColors.labelsTertiary",
  },
};
