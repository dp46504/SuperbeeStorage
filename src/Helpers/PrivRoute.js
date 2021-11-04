import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FlexContainer, Label } from "../Styles/Styles";

function PrivComponent(props) {
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setLoading(false);
      } else {
        setLoggedIn(false);
        setLoading(false);
        // User is signed out
        // ...
      }
    });
  }, []);
  const logInInfo = (
    <FlexContainer
      width="100%"
      orientation="column"
      fullHeight={true}
      height="100vh"
    >
      <Label style={{ fontSize: "3rem" }}>Zaloguj się</Label>
    </FlexContainer>
  );

  return (
    <>{loggedIn === true && loading === false ? props.children : logInInfo}</>
  );
}

export default PrivComponent;
