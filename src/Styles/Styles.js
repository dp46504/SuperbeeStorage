import styled, { createGlobalStyle, keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

export const colors = {
  // Light
  // menuBackground: "#9b816f",
  // bodyBackground: "#e0c3bf",

  // activeMenuItemText: "#e0c3bf",
  // nonactiveMenuItemText: "#af9885",
  // textColor: "#9b816f",

  // inputBorder: "#af9885",
  // buttonBorder: "#af9885",
  // buttonBackground: "#af9885",

  // Dark
  menuBackground: "#161617",
  bodyBackground: "#171717",

  activeMenuItemText: "#ffffff",
  nonactiveMenuItemText: "#75b6e7",
  textColor: "#75b6e7",
  burgerMenuColor: "#75b6e7",

  special: "#4c3f69",
  specialLight: "#6e5f8b",

  inputBorder: "#75b6e7",
  buttonBorder: "#75b6e7",
  buttonBackground: "#75b6e7",
};

export const GlobalStyles = createGlobalStyle`
html, body{
    margin: 0;
    font-family: 'Lato', sans-serif;
    min-height: 100%;
    font-weight: bold;
    color:${colors.textColor};
  background-color: ${colors.bodyBackground};
  }
*{box-sizing:border-box}
`;

export const MenuItem = styled(NavLink)`
  text-decoration: none;
  color: ${colors.nonactiveMenuItemText};
  font-weight: bold;
  outline: none;
  transition: all 500ms;
  &:hover {
    transform: scale(1.3);
  }
`;

export const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 0;
  width: 100%;
  border: 0.2rem dashed ${colors.special};
  & ${MenuItem} {
    display: block;
    margin: 0.8rem 0;
    color: ${colors.specialLight};
  }
`;

export const ActiveMenuItem = {
  color: colors.activeMenuItemText,
  textShadow: "0.3rem 0.3rem 0.8rem black",
  transform: "scale(1.5)",
};

export const FlexContainer = styled.div`
  width: ${(props) => {
    return props.width;
  }};
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => {
    return props.orientation;
  }};
  min-height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  & img {
    width: fit-content;
  }
`;

export const Label = styled.label`
  font-size: 1.1rem;
  margin: 0.3rem 0;
`;

export const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  margin: 0.5rem 0;
  border: 0.15rem solid ${colors.inputBorder};
  border-radius: 0.5rem;
  background-color: transparent;
  color: ${colors.textColor};
  font-weight: 600;
  outline: none;
  transition: all 500ms;
  &[type="file"] {
    width: fit-content;
    padding: 0.4rem;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &:focus {
    transform: scale(1.2);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  margin: 0.5rem 0;
  border: 0.15rem solid ${colors.inputBorder};
  border-radius: 0.5rem;
  background-color: transparent;
  color: ${colors.textColor};
  outline: none;
  transition: all 500ms;
  font-weight: 600;

  /* ===== Disable arrow ===== */
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
  /* for IE */
  &::-ms-expand {
    display: none;
  }
  &:focus {
    background-color: ${colors.menuBackground};
  }
  /* ===== Disable arrow ===== */
`;

export const Button = styled.button`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.3rem;
  border: none;
  font-size: 1.3rem;
  transition: all 200ms;
  border: 0.15rem solid ${colors.buttonBorder};
  background-color: ${colors.buttonBackground};
  border-radius: 0.5rem;
  & div {
    color: white;
    font-weight: bold;
    mix-blend-mode: exclusion;
  }

  &:active {
    transform: scale(1.15);
  }
`;

const PulseAnimation = keyframes`
from{
  transform:scale(1)
}
to{
  transform:scale(1.3)
}
`;

export const Loader = styled.div`
  position: fixed;
  font-weight: bold;
  height: 4rem;
  width: 6rem;
  padding: 1rem;
  top: calc(50% - 2rem);
  left: calc(50% - 3rem);
  z-index: 10;
  background-color: ${colors.bodyBackground};

  animation: ${PulseAnimation} 500ms both ease-in-out alternate infinite;
`;

export const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Li = styled.li`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  & * {
    margin: 0.5rem;
  }
`;

export const PicturePreview = styled.img`
  position: absolute;
  width: 30rem;
  max-width: 100%;
  left: calc(50% - 15rem);
  z-index: 2;
  display: none;
`;
