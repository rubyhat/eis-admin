export const selectStyles = {
  height: "36px",
  width: "100%",
  fontSize: "15px",
  "&:hover": {
    "& fieldset": {
      borderColor: "hsla(213, 100%, 53%, 1) !important",
    },
  },
  "& fieldset": {
    borderColor: "customColors.labelsQuaternary",
  },
};

export const selectInputProps = {
  padding: 1,
  fontSize: 16,
};
