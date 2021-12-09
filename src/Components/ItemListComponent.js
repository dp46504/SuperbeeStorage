import React, { useEffect, useState, useRef } from "react";
import { FlexContainer, Label, Loader, Form, Select, Button,ItemListRow, PicturePreview } from "../Styles/Styles";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import PrivRoute from "../Helpers/PrivRoute";
import { useForm } from "react-hook-form";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function ItemListComponent(props) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState(null);
  const [brands, setBrands] = useState(null);
  const [projects, setProjects] = useState(null);
  const [types, setTypes] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [items, setItems]=useState(null);

  let picturePreviewRef = useRef(null);
  let loaderRef = useRef(null);

  // Setting display "none" to picturepPreview
  const disablePicturePreview = () => {
    picturePreviewRef.current.style.display = "none";
  };

  // Getting info about parameters and items from db
  useEffect(() => {
    const getInfo = async () => {
      const db = getFirestore();
      const colorsRef = await getDocs(collection(db, "kolory"));
      const brandsRef = await getDocs(collection(db, "marki"));
      const projectsRef = await getDocs(collection(db, "projekty"));
      const typesRef = await getDocs(collection(db, "rodzaje"));
      const sizesRef = await getDocs(collection(db, "rozmiary"));
      const itemsRef = await getDocs(collection(db, "przedmioty"));

      let kolory = [];
      let marki = [];
      let projekty = [];
      let rodzaje = [];
      let rozmiary = [];
      let przedmioty = [];

      colorsRef.forEach((item) => {
        kolory.push({ id: item.id, data: item.data() });
      });

      brandsRef.forEach((item) => {
        marki.push({ id: item.id, data: item.data() });
      });

      projectsRef.forEach((item) => {
        projekty.push({ id: item.id, data: item.data() });
      });

      typesRef.forEach((item) => {
        rodzaje.push({ id: item.id, data: item.data() });
      });

      sizesRef.forEach((item) => {
        rozmiary.push({ id: item.id, data: item.data() });
      });

      itemsRef.forEach((item) => {
        przedmioty.push({ id: item.id, data: item.data() });
      });

      setColors(kolory);
      setBrands(marki);
      setProjects(projekty);
      setTypes(rodzaje);
      setSizes(rozmiary);
      setItems(przedmioty);
    };
    try{
      getInfo();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (e) {
      alert(`Error while getting info from database: ${e}`);
    }
    
  }, []);
  // Item class to download and store data about item
  class Item {
    constructor(item) {
      this.id = item.id;
      this.data = item.data;
      this.getItemInfo();
    }

    getItemInfo = async () => {
      const kolorComp = (kolorDoc) => {
        return kolorDoc.id === this.data.kolor;
      };
      const markaComp = (markaDoc) => {
        return markaDoc.id === this.data.marka;
      };
      const projektComp = (projektDoc) => {
        return projektDoc.id === this.data.projekt;
      };
      const rodzajComp = (rodzajDoc) => {
        return rodzajDoc.id === this.data.rodzaj;
      };
      const rozmiarComp = (rozmiarDoc) => {
        return rozmiarDoc.id === this.data.rozmiar;
      };

      this.ilosc = 0;
      this.maxIlosc = this.data.ilosc;
      this.kolor = colors.filter(kolorComp)[0].data.rgb;
      this.marka = brands.filter(markaComp)[0].data.nazwa;
      this.projekt = projects.filter(projektComp)[0].data.nazwa;
      this.rodzaj = types.filter(rodzajComp)[0].data.nazwa;
      this.rozmiar = sizes.filter(rozmiarComp)[0].data.nazwa;
    };

    getItemPhoto = () => {
      const storage = getStorage();
      const pathReference = ref(storage, this.id);
      getDownloadURL(pathReference)
        .then((url) => {
          this.photo = url;
        })
        .catch((e) => {
          alert(`Error while downloading image for item with id ${this.id}`);
        });
    };
  }

  const mappingItem = (item, index) => {
    let itemObject = new Item(item);

    const showPicture = () => {
      loaderRef.current.style = "flex";
      if (itemObject.photo === null || itemObject.photo === undefined) {
        itemObject.getItemPhoto();
        setTimeout(() => {
          picturePreviewRef.current.src = itemObject.photo;
          loaderRef.current.style.display = "none";
          picturePreviewRef.current.style.display = "flex";
        }, 1000);
      } else {
        picturePreviewRef.current.src = itemObject.photo;
        loaderRef.current.style.display = "none";
        picturePreviewRef.current.style.display = "flex";
      }
    };

    return (
    <ItemListRow>
      <div>{index+1}</div>
      <div>{itemObject.marka}</div>
      <div>{itemObject.rodzaj}</div>
      <div>{itemObject.kolor}</div>
      <div>{itemObject.rozmiar}</div>
      <div>{itemObject.projekt}</div>
      <div>{itemObject.maxIlosc}</div>
      <div onClick={()=>{showPicture()}}>📷</div>
      </ItemListRow>
    );
  };


  const onSubmit = async (data) => {
    console.log(items)
  }

  return (
    <>
      {loading === true ? (
        <Loader>Loading...</Loader>
      ) : (
        <PrivRoute>
          <PicturePreview
        ref={picturePreviewRef}
        onClick={disablePicturePreview}
      ></PicturePreview>
      <Loader ref={loaderRef} style={{ display: "none", color: "white" }}>
        Loading Photo
      </Loader>
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
                {colors!==null && colors.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data.nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  kolor
                </option>
              </Select>
              
              {/* Brand Filter */}
              <Select id="brandsInput" {...register("marka")}>
                {brands!==null && brands.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data.nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  marka
                </option>
              </Select>

                {/* Project Filter */}
              <Select id="projectsInput" {...register("projekt")}>
                {projects!==null&&projects.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data.nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  projekt
                </option>
              </Select>

                {/* Type Filter */}
              <Select id="typesInput" {...register("rodzaj")}>
                {types!==null&&types.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data.nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  typ
                </option>
              </Select>

                {/* Size Filter */}
              <Select id="sizesInput" {...register("rozmiar")}>
                {sizes!==null &&sizes.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.data.nazwa}
                    </option>
                  );
                })}
                <option key={null} value={null} selected>
                  rozmiar
                </option>
              </Select>
              <Button>Filtruj</Button>
              </Form>
              {/* Table Column Names */}
                <ItemListRow>
                  <div>Index</div>
                  <div>marka</div>
                  <div>rodzaj</div>
                  <div>kolor</div>
                  <div>rozmiar</div>
                  <div>projekt</div>
                  <div>ilosc</div>
                  <div>photo</div>
                </ItemListRow>
                {items!==null && items.map((item,index)=>{
                  return mappingItem(item, index)
                })}
          </FlexContainer>
        </PrivRoute>
      )}
    </>
  );
}

export default ItemListComponent;
