import React, { useState, useEffect, useRef } from "react";
import {
  FlexContainer,
  QRCodesItemContainer,
  QRCodesCode,
  QRCodesDesc,
  QRCodeStyles,
  PicturePreview,
  Loader,
} from "../Styles/Styles";
import PrivRoute from "../Helpers/PrivRoute";
import DisplayPropertiesCodes from "../Helpers/DisplayPropertiesCodes";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { QRCode } from "react-qrcode-logo";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function ListOfQrCodesComponent(props) {
  const [colors, setColors] = useState(null);
  const [brands, setBrands] = useState(null);
  const [projects, setProjects] = useState(null);
  const [types, setTypes] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
    getInfo();
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

  const mappingItem = (item) => {
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
      <QRCodesItemContainer
        onClick={() => {
          showPicture();
        }}
      >
        <QRCodesCode>
          <QRCode size={100} value={itemObject.id} />
          {itemObject.id}
        </QRCodesCode>
        <QRCodesDesc>{DisplayPropertiesCodes(itemObject)}</QRCodesDesc>
      </QRCodesItemContainer>
    );
  };

  return (
    <PrivRoute>
      <PicturePreview
        ref={picturePreviewRef}
        onClick={disablePicturePreview}
      ></PicturePreview>
      <QRCodeStyles></QRCodeStyles>
      <Loader ref={loaderRef} style={{ display: "none", color: "white" }}>
        Loading Photo
      </Loader>
      <FlexContainer
        style={{
          width: "100%",
          maxWidth: "100vw",
          minHeight: "fit-content",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {items.map((item) => {
          return mappingItem(item);
        })}
      </FlexContainer>
    </PrivRoute>
  );
}

export default ListOfQrCodesComponent;
