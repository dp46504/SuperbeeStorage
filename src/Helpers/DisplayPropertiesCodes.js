import { FlexContainer } from "../Styles/Styles";

const displayPropertiesCodes = (item) => {
  const colorCubeStyle = {
    backgroundColor: item.kolor,
    width: "1rem",
    height: "1rem",
    border: "1px solid black",
  };

  const colorCube = <div style={colorCubeStyle}></div>;

  return (
    <FlexContainer style={{ minHeight: "fit-content" }} orientation="column">
      <p>{item.rodzaj}</p>
      <p>{item.projekt}</p>
      <p>{item.marka}</p>
      <p>{item.rozmiar}</p>
      <p>{item.kolor}</p>
      {colorCube}
    </FlexContainer>
  );
};

export default displayPropertiesCodes;
