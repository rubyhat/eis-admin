// mui.d.ts
import "@mui/material/styles";
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    sizeSmall: true;
    sizeMedium: true;
    sizeLarge: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    titleLargeRegular: true;
    titleLargeEmphasized: true;
    titleFirstRegular: true;
    titleFirstEmphasized: true;
    titleSecondRegular: true;
    titleSecondEmphasized: true;
    titleThirdRegular: true;
    titleThirdEmphasized: true;

    textBodyRegular: true;
    textBodyEmphasized: true;
    textCalloutRegular: true;
    textCalloutEmphasized: true;
    textSubheadlineRegular: true;
    textSubheadlineEmphasized: true;
    textFootnoteRegular: true;
    textFootnoteEmphasized: true;

    captionFirstRegular: true;
    captionFirstEmphasized: true;
    captionSecondRegular: true;
    captionSecondEmphasized: true;
  }
}
declare module "@mui/material/styles/createTypography" {
  interface Typography {
    titleLargeRegular: React.CSSProperties;
    titleLargeEmphasized: React.CSSProperties;
    titleFirstRegular: React.CSSProperties;
    titleFirstEmphasized: React.CSSProperties;
    titleSecondRegular: React.CSSProperties;
    titleSecondEmphasized: React.CSSProperties;
    titleThirdRegular: React.CSSProperties;
    titleThirdEmphasized: React.CSSProperties;

    textBodyRegular: React.CSSProperties;
    textBodyEmphasized: React.CSSProperties;
    textCalloutRegular: React.CSSProperties;
    textCalloutEmphasized: React.CSSProperties;
    textSubheadlineRegular: React.CSSProperties;
    textSubheadlineEmphasized: React.CSSProperties;
    textFootnoteRegular: React.CSSProperties;
    textFootnoteEmphasized: React.CSSProperties;

    captionFirstRegular: React.CSSProperties;
    captionFirstEmphasized: React.CSSProperties;
    captionSecondRegular: React.CSSProperties;
    captionSecondEmphasized: React.CSSProperties;
  }
}

declare module "@mui/material/styles" {
  // Шрифты
  interface TypographyVariants {
    titleLargeRegular: React.CSSProperties;
    titleLargeEmphasized: React.CSSProperties;
    titleFirstRegular: React.CSSProperties;
    titleFirstEmphasized: React.CSSProperties;
    titleSecondRegular: React.CSSProperties;
    titleSecondEmphasized: React.CSSProperties;
    titleThirdRegular: React.CSSProperties;
    titleThirdEmphasized: React.CSSProperties;

    textBodyRegular: React.CSSProperties;
    textBodyEmphasized: React.CSSProperties;
    textCalloutRegular: React.CSSProperties;
    textCalloutEmphasized: React.CSSProperties;
    textSubheadlineRegular: React.CSSProperties;
    textSubheadlineEmphasized: React.CSSProperties;
    textFootnoteRegular: React.CSSProperties;
    textFootnoteEmphasized: React.CSSProperties;

    captionFirstRegular: React.CSSProperties;
    captionFirstEmphasized: React.CSSProperties;
    captionSecondRegular: React.CSSProperties;
    captionSecondEmphasized: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    titleLargeRegular?: React.CSSProperties;
    titleLargeEmphasized?: React.CSSProperties;
    titleFirstRegular?: React.CSSProperties;
    titleFirstEmphasized?: React.CSSProperties;
    titleSecondRegular?: React.CSSProperties;
    titleSecondEmphasized?: React.CSSProperties;
    titleThirdRegular?: React.CSSProperties;
    titleThirdEmphasized?: React.CSSProperties;

    textBodyRegular?: React.CSSProperties;
    textBodyEmphasized?: React.CSSProperties;
    textCalloutRegular?: React.CSSProperties;
    textCalloutEmphasized?: React.CSSProperties;
    textSubheadlineRegular?: React.CSSProperties;
    textSubheadlineEmphasized?: React.CSSProperties;
    textFootnoteRegular?: React.CSSProperties;
    textFootnoteEmphasized?: React.CSSProperties;

    captionFirstRegular?: React.CSSProperties;
    captionFirstEmphasized?: React.CSSProperties;
    captionSecondRegular?: React.CSSProperties;
    captionSecondEmphasized?: React.CSSProperties;
  }
  // Цвета
  interface Palette {
    customColors?: PaletteCustomColors;
  }
  interface PaletteOptions {
    customColors?: PaletteCustomColors;
  }
  interface PaletteCustomColors {
    colorsWhite: string;
    colorsRed: string;
    colorsRedDark: string;
    colorsOrange: string;
    colorsOrangeDark: string;
    colorsYellow: string;
    colorsYellowDark: string;
    colorsGreen: string;
    colorsGreenDark: string;
    colorsBlue: string;
    colorsBlueDark: string;
    colorsIndigo: string;
    colorsIndigoDark: string;
    colorsPurple: string;
    colorsPurpleDark: string;

    gradientPrimary: string;
    gradientGreen: string;

    labelsPrimary: string;
    labelsSecondary: string;
    labelsTertiary: string;
    labelsQuaternary: string;
  }
}
