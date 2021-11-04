import React from "react";
import { useForm } from "react-hook-form";
import { FlexContainer, Form, Label, Input, Button } from "../Styles/Styles";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import PrivRoute from "../Helpers/PrivRoute";

function AddSizeComponent(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data.nazwa === "" || data.nazwa === null) {
      alert("Size name is required");
      return 0;
    }

    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "rozmiary"), {
        nazwa: data.nazwa,
      });
      alert(`Added new size to database with ID: ${docRef.id}`);

      const analytics = getAnalytics();
      logEvent(analytics, "add_size", {
        nazwa: data.nazwa,
      });
    } catch (e) {
      alert(`Error while adding new size to database: ${e}`);
    }
  };

  return (
    <PrivRoute>
      <FlexContainer
        width="100%"
        orientation="column"
        fullHeight={true}
        height="100vh"
      >
        <Label>Dodawanie rozmiaru</Label>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label for="nazwaInput">Nazwa</Label>
          <Input id="nazwaInput" {...register("nazwa")}></Input>
          <Button>Dodaj</Button>
        </Form>
      </FlexContainer>
    </PrivRoute>
  );
}

export default AddSizeComponent;
