import { BoxStyleProps } from "@twilio-paste/core/box";

export const outerContainerStyles: BoxStyleProps = {
    /*
     * position: "fixed",
     * alignItems: "flex-end"
     */
    bottom: "space50",
    right: "space60",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
};

export const innerContainerStyles: BoxStyleProps = {
    boxShadow: "shadow",
    display: "flex",
    flexDirection: "column",
    /*
     * width: "320px",
     * height: "590px",
     * height: "590px",
     */
    width: "100%",
    height: "810px",
    marginBottom: "space50",
    borderRadius: "borderRadius30",
    backgroundColor: "colorBackgroundBody"
};
