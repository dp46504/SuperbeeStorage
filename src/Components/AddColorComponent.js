import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FlexContainer, Form, Label, Input, Button } from "../Styles/Styles";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

function AddColorComponent(props) {
  const { register, handleSubmit } = useForm();
  const [buttonColor, setButtonColor] = useState("lightgray");

  const onSubmit = async (data) => {
    if (data.nazwa === "" || data.nazwa === null) {
      alert("Color name is required");
      return 0;
    }

    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "kolory"), {
        nazwa: data.nazwa,
        rgb: data.rgb,
      });
      alert(`Added new color to database with ID: ${docRef.id}`);

      const analytics = getAnalytics();
      logEvent(analytics, "add_color", {
        rgb: data.rgb,
      });
    } catch (e) {
      alert(`Error while adding new color to database: ${e}`);
    }
  };

  return (
    <FlexContainer
      width="100%"
      orientation="column"
      fullHeight={true}
      height="100vh"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label for="nazwaInput">Nazwa</Label>
        <Input id="nazwaInput" {...register("nazwa")}></Input>
        <Label for="rgbInput">RGB</Label>
        <Input
          id="rgbInput"
          {...register("rgb")}
          onChange={(e) => {
            setButtonColor(e.target.value);
          }}
        ></Input>
        <Button
          style={{ backgroundColor: buttonColor, borderColor: buttonColor }}
        >
          Dodaj
        </Button>
      </Form>
    </FlexContainer>
  );
}

export default AddColorComponent;
