import React, { useState, useEffect, useRef } from "react";
import QrReader from "react-qr-reader";
import {
  Button,
  FlexContainer,
  Label,
  Ul,
  Li,
  Input,
  PicturePreview,
  Loader,
} from "../Styles/Styles";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import PrivRoute from "../Helpers/PrivRoute";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function SellItemComponent(props) {
  // States
  const [result, setResult] = useState(null);
  const [list, setList] = useState([]);
  const [colors, setColors] = useState(null);
  const [brands, setBrands] = useState(null);
  const [projects, setProjects] = useState(null);
  const [types, setTypes] = useState(null);
  const [sizes, setSizes] = useState(null);

  // Refs
  let picturePreviewRef = useRef(null);
  let loaderRef = useRef(null);

  // Getting info about parameters of an item from db
  useEffect(() => {
    const getInfo = async () => {
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

      setColors(kolory);
      setBrands(marki);
      setProjects(projekty);
      setTypes(rodzaje);
      setSizes(rozmiary);
    };
    getInfo();
  }, []);

  // Item class to download and store data about item
  class Item {
    constructor(id) {
      this.id = id;
      this.getItemInfo();
    }

    getItemInfo = async () => {
      const db = getFirestore();
      const collectionRef = collection(db, "przedmioty");
      try {
        const item = await getDoc(doc(collectionRef, this.id));

        const kolorComp = (kolorDoc) => {
          return kolorDoc.id === item.data().kolor;
        };
        const markaComp = (markaDoc) => {
          return markaDoc.id === item.data().marka;
        };
        const projektComp = (projektDoc) => {
          return projektDoc.id === item.data().projekt;
        };
        const rodzajComp = (rodzajDoc) => {
          return rodzajDoc.id === item.data().rodzaj;
        };
        const rozmiarComp = (rozmiarDoc) => {
          return rozmiarDoc.id === item.data().rozmiar;
        };

        this.ilosc = 0;
        this.maxIlosc = item.data().ilosc;
        this.kolor = colors.filter(kolorComp)[0].data.rgb;
        this.marka = brands.filter(markaComp)[0].data.nazwa;
        this.projekt = projects.filter(projektComp)[0].data.nazwa;
        this.rodzaj = types.filter(rodzajComp)[0].data.nazwa;
        this.rozmiar = sizes.filter(rozmiarComp)[0].data.nazwa;
      } catch (err) {
        alert(
          `There was an error while downloading info about this item: ${err}`
        );
      }
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

  // Handling error while loading QRreader
  const handleError = (err) => {
    alert(err);
  };

  // Adding result of scan to result state
  // @param {string} data value of QRreader scanner
  const handleScan = (data) => {
    setResult(data);
  };

  // Get actual result of scan to the list avoiding duplicates
  // @return {int} 0 if duplicate was found
  // @return {int} 0 if result == null
  const handleScanToList = () => {
    if (result === null) {
      return 0;
    }
    const filtr = (value) => {
      return value.id === result;
    };

    try {
      let item = new Item(result);
      let newList = [...list];
      let duplicates = newList.filter(filtr);

      if (duplicates.length !== 0) {
        return 0;
      }

      newList.push(item);
      setList(newList);
    } catch (err) {
      alert("ERROR");
    }
  };

  // Setting display "none" to picturepPreview
  const disablePicturePreview = () => {
    picturePreviewRef.current.style.display = "none";
  };

  // Generates DOM representation of item
  // @params {string} id ID of an item
  // @return {JSX} visRep Visual representation of an item
  const getDomObjectOfItem = (item) => {
    const comp = (value) => {
      return value !== item;
    };

    const deleteItem = () => {
      let newList = list.filter(comp);
      setList(newList);
    };

    const showPicture = () => {
      loaderRef.current.style = "flex";
      if (item.photo === null || item.photo === undefined) {
        item.getItemPhoto();
        setTimeout(() => {
          picturePreviewRef.current.src = item.photo;
          loaderRef.current.style.display = "none";
          picturePreviewRef.current.style.display = "flex";
        }, 500);
      } else {
        picturePreviewRef.current.src = item.photo;
        loaderRef.current.style.display = "none";
        picturePreviewRef.current.style.display = "flex";
      }
    };

    const buttonStyle = {
      width: "3rem",
    };

    const inputStyle = {
      width: "3rem",
    };

    const colorCubeStyle = {
      backgroundColor: item.kolor,
      width: "1rem",
      height: "1rem",
    };

    const infoStyle = {
      margin: 0,
      fontSize: "1rem",
    };

    const colorCube = <div style={colorCubeStyle}></div>;

    return (
      <Li key={item.id}>
        <div style={infoStyle}>
          {item.rodzaj} {item.projekt} {item.rozmiar}
        </div>
        {colorCube}
        <Input
          style={inputStyle}
          type="number"
          max={item.maxIlosc}
          min={0}
          id={item.id}
          onChange={(e) => {
            item.ilosc = e.target.value;
          }}
        ></Input>
        <Button style={buttonStyle} onClick={showPicture}>
          📷
        </Button>
        <Button style={buttonStyle} onClick={deleteItem}>
          ❌
        </Button>
      </Li>
    );
  };

  const handleSubmit = () => {
    let errorList = [];
    let errorID = [];
    list.forEach((item) => {
      // Skipping if provided number is larger than one in database
      let tmpErrorCount = 0;
      if (item.ilosc > item.maxIlosc) {
        errorList.push(
          `There is less of an item with id: ${item.id} in the databse`
        );
        errorID.push(item.id);
        tmpErrorCount += 1;
      }

      // Skipping if provided number is larger than one in database
      if (tmpErrorCount === 0) {
        updateDoc(doc(collection(getFirestore(), "przedmioty"), item.id), {
          ilosc: item.maxIlosc - item.ilosc,
        }).catch((error) => {
          errorID.push(item.id);
          errorList.push(error);
          alert(`Error while updating values. ${error}`);
        });
      }
    });
    if (errorList.length !== 0) {
      alert(
        errorList.reduce((acc, current) => {
          return acc + " | " + current;
        })
      );

      // Deleting from list items that succesfully updates
      let comp = (value) => {
        return errorID.includes(value.id);
      };

      // Deleting from list items that succesfully updates
      setList(list.filter(comp));
    } else {
      alert(`Succesfuly updated state of a database`);
      setList([]);
    }
  };

  return (
    <PrivRoute>
      <FlexContainer orientation="column" fullHeight>
        <PicturePreview
          ref={picturePreviewRef}
          onClick={disablePicturePreview}
        ></PicturePreview>
        <Loader ref={loaderRef} style={{ display: "none" }}>
          Loading Photo
        </Loader>
        <Label>Sprzedaż</Label>
        <QrReader
          delay={500}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "50%" }}
        ></QrReader>
        <Label style={{ height: "2rem" }}>{result}</Label>
        <Button style={{ width: "80%" }} onClick={handleScanToList}>
          Dodaj do listy
        </Button>
        <Ul>
          {list.map((item) => {
            return getDomObjectOfItem(item);
          })}
        </Ul>
        {list.length === 0 ? null : (
          <Button style={{ width: "80%" }} onClick={handleSubmit}>
            Sprzedaj
          </Button>
        )}
      </FlexContainer>
    </PrivRoute>
  );
}

export default SellItemComponent;
