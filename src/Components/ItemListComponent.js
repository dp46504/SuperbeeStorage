import React, { useEffect, useState } from "react";
import { FlexContainer, Label, Loader, Form, Select, Button } from "../Styles/Styles";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import PrivRoute from "../Helpers/PrivRoute";
import { useForm } from "react-hook-form";

function ItemListComponent(props) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState(null);
  const [brands, setBrands] = useState(null);
  const [projects, setProjects] = useState(null);
  const [types, setTypes] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [items, setItems]=useState(null);

  useEffect(() => {
    const downloadItems = async () => {
      try {
        const db = getFirestore();
        const colorsRef = await getDocs(collection(db, "kolory"));
        const brandsRef = await getDocs(collection(db, "marki"));
        const projectsRef = await getDocs(collection(db, "projekty"));
        const typesRef = await getDocs(collection(db, "rodzaje"));
        const sizesRef = await getDocs(collection(db, "rozmiary"));
        const itemsRef = await getDocs(collection(db, "przedmioty"))

        let kolory = [];
        let marki = [];
        let projekty = [];
        let rodzaje = [];
        let rozmiary = [];
        let przedmioty = [];

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

        itemsRef.forEach((item) => {
          przedmioty.push(item);
        });

        setColors(kolory);
        setBrands(marki);
        setProjects(projekty);
        setTypes(rodzaje);
        setSizes(rozmiary);
        setItems(przedmioty);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (e) {
        alert(`Error while getting info from database: ${e}`);
      }
    };

    downloadItems();
  }, []);

  const onSubmit = async (data) => {
    alert("yo")
  }

  return (
    <>
      {loading === true ? (
        <Loader>Loading...</Loader>
      ) : (
        <PrivRoute>
          <FlexContainer
            width="100%"
            orientation="column"
            fullHeight={true}
            height="100vh"
          >
              <Label>Filters</Label>
            <Form orientation="row" width="100%" onSubmit={handleSubmit(onSubmit)}>
              {/* Color Filter */}
              <Select
                id="colorInput"
                {...register("kolor")}
              >
                {colors.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  kolor
                </option>
              </Select>
              
              {/* Brand Filter */}
              <Select id="brandsInput" {...register("marka")}>
                {brands.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  marka
                </option>
              </Select>

                {/* Project Filter */}
              <Select id="projectsInput" {...register("projekt")}>
                {projects.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  projekt
                </option>
              </Select>

                {/* Type Filter */}
              <Select id="typesInput" {...register("rodzaj")}>
                {types.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  typ
                </option>
              </Select>

                {/* Size Filter */}
              <Select id="sizesInput" {...register("rozmiar")}>
                {sizes.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  rozmiar
                </option>
              </Select>
              <Button>Filtruj</Button>
              </Form>
          </FlexContainer>
        </PrivRoute>
      )}
    </>
  );
}

export default ItemListComponent;
