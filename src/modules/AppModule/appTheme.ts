import { createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";

const titleLarge = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "34px",
  fontStyle: "normal",
  lineHeight: "41px" /* 120.588% */,
  letterSpacing: "-0.4px",
};

const titleFirst = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "28px",
  fontStyle: "normal",
  lineHeight: "34px" /* 121.429% */,
  letterSpacing: "-0.4px",
};

const titleSecond = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "22px",
  fontStyle: "normal",
  lineHeight: "28px" /* 127.273% */,
  letterSpacing: "-0.4px",
};

const titleThird = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "20px",
  fontStyle: "normal",
  lineHeight: "25px" /* 125% */,
  letterSpacing: "-0.4px",
};

const textBody = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "17px",
  fontStyle: "normal",
  lineHeight: "22px" /* 129.412% */,
  letterSpacing: "-0.4px",
};

const textCallout = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "16px",
  fontStyle: "normal",
  lineHeight: "21px" /* 131.25% */,
  letterSpacing: "-0.4px",
};

const textSubheadline = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "15px",
  fontStyle: "normal",
  lineHeight: "20px",
  letterSpacing: "-0.4px",
};

const textFootnote = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "13px",
  fontStyle: "normal",
  lineHeight: "18px",
  letterSpacing: "-0.4px",
};

const captionFirst = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "12px",
  fontStyle: "normal",
  lineHeight: "16px",
  letterSpacing: "-0.4px",
};

const captionSecond = {
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: "11px",
  fontStyle: "normal",
  lineHeight: "13px",
  letterSpacing: "-0.4px",
};

export let appTheme = createTheme({});
appTheme = createTheme(
  {
    components: {
      MuiButton: {
        styleOverrides: {
          sizeSmall: { padding: "4px 16px", fontSize: "14px" },
          sizeMedium: { padding: "8px 16px", fontSize: "15px" },
          sizeLarge: { padding: "12px 16px", fontSize: "16px" },
        },
      },
    },
    typography: {
      fontFamily: `"SF Pro", "SF Pro Display", "Helvetica", "Roboto", sans-serif`,
      // Titles
      titleLargeRegular: {
        ...titleLarge,
        fontWeight: 400,
      },
      titleLargeEmphasized: {
        ...titleLarge,
        fontWeight: 700,
      },
      titleFirstRegular: {
        ...titleFirst,
        fontWeight: 400,
      },
      titleFirstEmphasized: {
        ...titleFirst,
        fontWeight: 700,
      },
      titleSecondRegular: {
        ...titleSecond,
        fontWeight: 400,
      },
      titleSecondEmphasized: {
        ...titleSecond,
        fontWeight: 700,
      },
      titleThirdRegular: {
        ...titleThird,
        fontWeight: 400,
      },
      titleThirdEmphasized: {
        ...titleThird,
        fontWeight: 600,
      },
      // Text
      textBodyRegular: {
        ...textBody,
        fontWeight: 400,
      },
      textBodyEmphasized: {
        ...textBody,
        fontWeight: 600,
      },
      textCalloutRegular: {
        ...textCallout,
        fontWeight: 400,
      },
      textCalloutEmphasized: {
        ...textCallout,
        fontWeight: 600,
      },
      textSubheadlineRegular: {
        ...textSubheadline,
        fontWeight: 400,
      },
      textSubheadlineEmphasized: {
        ...textSubheadline,
        fontWeight: 600,
      },
      textFootnoteRegular: {
        ...textFootnote,
        fontWeight: 400,
      },
      textFootnoteEmphasized: {
        ...textFootnote,
        fontWeight: 600,
      },
      captionFirstRegular: {
        ...captionFirst,
        fontWeight: 400,
      },
      captionFirstEmphasized: {
        ...captionFirst,
        fontWeight: 500,
      },
      captionSecondRegular: {
        ...captionSecond,
        fontWeight: 400,
      },
      captionSecondEmphasized: {
        ...captionSecond,
        fontWeight: 500,
      },
    },
    palette: {
      primary: {
        // main: "hsla(211, 100%, 50%, 1)",
        main: "hsla(29, 100%, 50%, 1)",
        contrastText: "#fff",
      },

      customColors: {
        colorsWhite: "hsla(0, 0%, 100%, 1)",
        colorsRed: "hsla(1, 100%, 56%, 1)",
        colorsRedDark: "hsla(3, 100%, 59%, 1)",
        colorsOrange: "hsla(29, 100%, 50%, 1)",
        colorsOrangeDark: "hsla(30, 100%, 54%, 1)",
        colorsYellow: "hsla(48, 100%, 50%, 1)",
        colorsYellowDark: "hsla(49, 100%, 54%, 1)",
        colorsGreen: "hsla(123, 59%, 45%, 1)",
        colorsGreenDark: "hsla(125, 60%, 47%, 1)",
        colorsBlue: "hsla(211, 100%, 50%, 1)",
        colorsBlueDark: "hsla(213, 100%, 53%, 1)",
        colorsIndigo: "hsla(233, 65%, 61%, 1)",
        colorsIndigoDark: "hsla(234, 76%, 65%, 1)",
        colorsPurple: "hsla(283, 61%, 59%, 1)",
        colorsPurpleDark: "hsla(284, 89%, 66%, 1)",

        labelsPrimary: "hsla(0, 0%, 0%, 1)",
        labelsSecondary: "hsla(240, 6%, 25%, 0.6)",
        labelsTertiary: "hsla(240, 6%, 25%, 0.3)",
        labelsQuaternary: "hsla(240, 6%, 25%, 0.18)",

        gradientPrimary:
          "linear-gradient(180deg, hsla(0, 0%, 100%, 0.17) 0%, hsla(0, 0%, 100%, 0) 100%) ,hsla(29, 100%, 50%, 1)",
        gradientGreen:
          "linear-gradient(180deg, hsla(0, 0%, 100%, 0.17) 0%, hsla(0, 0%, 100%, 0) 100%), hsla(135, 59%, 49%, 1)",
      },
    },
  },
  ruRU,
);
