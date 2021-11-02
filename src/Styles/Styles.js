import styled, { createGlobalStyle } from "styled-components";
import { NavLink } from "react-router-dom";

export const colors = [];

export const GlobalStyles = createGlobalStyle`
html, body{
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100%;
}
*{box-sizing:border-box}
`;

export const MenuItem = styled(NavLink)`
  text-decoration: none;
  color: lightgrey;
  font-weight: bold;
  outline: none;
  transition: all 500ms;
`;

export const ActiveMenuItem = {
  color: "white",
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
  height: ${(props) => {
    if (props.height) {
      return props.height;
    } else {
      return "fit-content";
    }
  }};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

export const Label = styled.label`
  font-size: 1.1rem;
  margin: 0.3rem 0;
`;

export const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin: 0.5rem 0;
`;

export const Button = styled.button`
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.3rem;
  border: none;
  font-size: 1.3rem;
  transition: all 200ms;
  border: 0.15rem solid #999999;

  &:active {
    transform: scale(1.15);
  }
`;
