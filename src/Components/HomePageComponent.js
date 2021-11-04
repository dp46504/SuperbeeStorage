import React, { useEffect, useState } from "react";
import { FlexContainer, Label, Loader } from "../Styles/Styles";
import { collection, getDocs, getFirestore } from "firebase/firestore";

function HomePageComponent(props) {
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState(null);
  const [brands, setBrands] = useState(null);
  const [projects, setProjects] = useState(null);
  const [types, setTypes] = useState(null);
  const [sizes, setSizes] = useState(null);

  useEffect(() => {
    const downloadItems = async () => {
      try {
        const db = getFirestore();
        const colorsRef = await getDocs(collection(db, "kolory"));
        const brandsRef = await getDocs(collection(db, "marki"));
        const projectsRef = await getDocs(collection(db, "projekty"));
        const typesRef = await getDocs(collection(db, "rodzaje"));
        const sizesRef = await getDocs(collection(db, "rozmiary"));

        let kolory = [];
        let marki = [];
        let projekty = [];
        let rodzaje = [];
        let rozmiary = [];

        colorsRef.forEach((item) => {
          kolory.push(item);
        });

        brandsRef.forEach((item) => {
          marki.push(item);
        });

        projectsRef.forEach((item) => {
          projekty.push(item);
        });

        typesRef.forEach((item) => {
          rodzaje.push(item);
        });

        sizesRef.forEach((item) => {
          rozmiary.push(item);
        });

        setColors(kolory);
        setBrands(marki);
        setProjects(projekty);
        setTypes(rodzaje);
        setSizes(rozmiary);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (e) {
        alert(`Error while getting info from database: ${e}`);
      }
    };

    downloadItems();
  }, []);

  return (
    <>
      {loading === true ? (
        <Loader>Loading...</Loader>
      ) : (
        <FlexContainer
          width="100%"
          orientation="column"
          fullHeight={true}
          height="100vh"
        >
          <Label
            style={{
              borderTop: ".2rem solid black",
              width: "100%",
              textAlign: "center",
            }}
          >
            Kolory
          </Label>
          {colors.map((item) => {
            return (
              <div key={item.id} value={item.id}>
                {item.data().nazwa} {item.data().rgb}
              </div>
            );
          })}

          <Label
            style={{
              borderTop: ".2rem solid black",
              width: "100%",
              textAlign: "center",
            }}
          >
            Marki
          </Label>
          {brands.map((item) => {
            return (
              <div key={item.id} value={item.id}>
                {item.data().nazwa}
              </div>
            );
          })}

          <Label
            style={{
              borderTop: ".2rem solid black",
              width: "100%",
              textAlign: "center",
            }}
          >
            Rodzaje
          </Label>
          {types.map((item) => {
            return (
              <div key={item.id} value={item.id}>
                {item.data().nazwa}
              </div>
            );
          })}

          <Label
            style={{
              borderTop: ".2rem solid black",
              width: "100%",
              textAlign: "center",
            }}
          >
            Rozmiary
          </Label>
          {sizes.map((item) => {
            return (
              <div key={item.id} value={item.id}>
                {item.data().nazwa}
              </div>
            );
          })}

          <Label
            style={{
              borderTop: ".2rem solid black",
              width: "100%",
              textAlign: "center",
            }}
          >
            Projekty
          </Label>
          {projects.map((item) => {
            return (
              <div key={item.id} value={item.id}>
                {item.data().nazwa}
              </div>
            );
          })}
        </FlexContainer>
      )}
    </>
  );
}

export default HomePageComponent;
