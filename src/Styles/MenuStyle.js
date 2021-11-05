import { colors } from "./Styles";

export const styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "40px",
    height: "30px",
    right: "20px",
    bottom: "20px",
  },
  bmBurgerBars: {
    background: colors.burgerMenuColor,
  },
  bmBurgerBarsHover: {},
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
    display: "none",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: colors.menuBackground,
    width: "100%",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    overflow: "hidden",
    borderRight: `0.1rem solid ${colors.burgerMenuColor}`,
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  bmItem: {},
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
