import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FlexContainer,
  Form,
  Label,
  Select,
  Button,
  Loader,
  Input,
} from "../Styles/Styles";
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import PrivRoute from "../Helpers/PrivRoute";

function AddItemComponent(props) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState(null);
  const [brands, setBrands] = useState(null);
  const [projects, setProjects] = useState(null);
  const [types, setTypes] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [btnColor, setBtnColor] = useState(null);
  const [photo, setPhoto] = useState(null);
  let imageRef = useRef(null);
  const fr = new FileReader();

  fr.onload = function () {
    imageRef.current.src = fr.result;
  };

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

  const onSubmit = async (data) => {
    if (photo === null) {
      alert("Upload a photo");
      return 0;
    }
    try {
      // Uploading document to database
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "przedmioty"), {
        kolor: data.kolor,
        rozmiar: data.rozmiar,
        marka: data.marka,
        projekt: data.projekt,
        rodzaj: data.rodzaj,
        ilosc: parseInt(data.ilosc),
      });
      alert(`Added new Item to database with ID: ${docRef.id}`);

      // Uploading photo to storage
      const storage = getStorage();
      const storageRef = ref(storage, docRef.id);
      uploadBytes(storageRef, photo).catch((e) => {
        alert(`Error while adding photo to storage: ${e}`);
      });

      const analytics = getAnalytics();
      logEvent(analytics, "add_item", {
        kolor: data.kolor,
        rozmiar: data.rozmiar,
        marka: data.marka,
        projekt: data.projekt,
        rodzaj: data.rodzaj,
        ilosc: data.ilosc,
      });
    } catch (e) {
      alert(`Error while adding new Item to database: ${e}`);
    }
  };

  const getColor = (id) => {
    const filtr = (value) => {
      return value.id === id;
    };
    return colors.filter(filtr)[0].data().rgb;
  };

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
            <Label>Dodawanie przedmiotu</Label>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Label for="colorInput">Kolor</Label>
              <Select
                id="colorInput"
                {...register("kolor")}
                onClick={(e) => {
                  setBtnColor(getColor(e.target.value));
                }}
                onChange={(e) => {
                  setBtnColor(getColor(e.target.value));
                }}
              >
                {colors.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
              </Select>
              <div
                style={{
                  width: "100%",
                  height: "2rem",
                  backgroundColor: btnColor,
                  borderRadius: "0.2rem",
                }}
              ></div>

              <Label for="brandsInput">Marka</Label>
              <Select id="brandsInput" {...register("marka")}>
                {brands.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
              </Select>

              <Label for="projectsInput">Projekt</Label>
              <Select id="projectsInput" {...register("projekt")}>
                {projects.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
              </Select>

              <Label for="typesInput">Rodzaj</Label>
              <Select id="typesInput" {...register("rodzaj")}>
                {types.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
              </Select>

              <Label for="sizesInput">Rozmiar</Label>
              <Select id="sizesInput" {...register("rozmiar")}>
                {sizes.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data().nazwa}
                    </option>
                  );
                })}
              </Select>

              <Label for="iloscInput">Ilosc</Label>
              <Input
                type="number"
                id="iloscInput"
                required
                {...register("ilosc")}
              ></Input>

              <Label for="photoInput">Zdj??cie</Label>
              <Input
                type="file"
                id="photoInput"
                {...register("photo")}
                onChange={(e) => {
                  setPhoto(
                    new Blob([e.target.files[0]], { type: "image/png" })
                  );
                  fr.readAsDataURL(e.target.files[0]);
                }}
              ></Input>
              <img ref={imageRef} width="50%" alt="Podgl??dowe zdj??cie"></img>

              <Button>Dodaj</Button>
            </Form>
          </FlexContainer>
        </PrivRoute>
      )}
    </>
  );
}

export default AddItemComponent;
