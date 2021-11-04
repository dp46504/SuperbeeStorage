import styled, { createGlobalStyle, keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

export const colors = {
  // Light
  menuBackground: "#9b816f",
  bodyBackground: "#e0c3bf",

  activeMenuItemText: "#e0c3bf",
  nonactiveMenuItemText: "#af9885",
  textColor: "#9b816f",

  inputBorder: "#af9885",
  buttonBorder: "#af9885",
  buttonBackground: "#af9885",

  // Dark
};

export const GlobalStyles = createGlobalStyle`
html, body{
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  & ${MenuItem} {
    display: block;
    margin: 0.8rem 0;
    color: ${colors.darkText};
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
  &[type="file"] {
    width: fit-content;
    padding: 0.4rem;
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  margin: 0.5rem 0;
  border: 0.15rem solid ${colors.inputBorder};
  border-radius: 0.5rem;

  /* ===== Disable arrow ===== */
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
  /* for IE */
  &::-ms-expand {
    display: none;
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

  animation: ${PulseAnimation} 500ms both ease-in-out alternate infinite;
`;
