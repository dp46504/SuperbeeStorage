import React from "react";
import { useForm } from "react-hook-form";
import { FlexContainer, Form, Label, Input, Button } from "../Styles/Styles";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

function AddProjectComponent(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data.nazwa === "" || data.nazwa === null) {
      alert("Project name is required");
      return 0;
    }

    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "projekty"), {
        nazwa: data.nazwa,
      });
      alert(`Added new Project to database with ID: ${docRef.id}`);

      const analytics = getAnalytics();
      logEvent(analytics, "add_project", {
        nazwa: data.nazwa,
      });
    } catch (e) {
      alert(`Error while adding new Project to database: ${e}`);
    }
  };

  return (
    <FlexContainer
      width="100%"
      orientation="column"
      fullHeight={true}
      height="100vh"
    >
      <Label>Dodawanie projektu</Label>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label for="nazwaInput">Nazwa</Label>
        <Input id="nazwaInput" {...register("nazwa")}></Input>
        <Button>Dodaj</Button>
      </Form>
    </FlexContainer>
  );
}

export default AddProjectComponent;
