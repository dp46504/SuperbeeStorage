import React, { useState } from "react";
import { Button, FlexContainer, Label } from "../Styles/Styles";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function LoginPage(props) {
  const provider = new GoogleAuthProvider();
  const [loggedIn, setLoggedIn] = useState(getAuth().currentUser);
  const [userName, setUserName] = useState(null);

  const Login = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // // ...
        alert("Pomyślnie zalogowano");
        setLoggedIn(true);
        setUserName(getAuth().currentUser);
      })
      .catch((error) => {
        alert(`Wystąpił błąd przy logowaniu: ${error.message}`);
        setLoggedIn(false);
        setUserName(getAuth().currentUser);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
      });
  };

  const Logout = () => {
    const auth = getAuth();
    auth.signOut();
    setLoggedIn(null);
  };

  return (
    <FlexContainer
      width="100%"
      orientation="column"
      fullHeight={true}
      height="100vh"
    >
      <Label>
        {loggedIn !== null
          ? getAuth().currentUser.displayName
          : "NIEZALOGOWANY"}
      </Label>
      <Button
        style={{ width: "80%" }}
        onClick={() => {
          Login();
        }}
      >
        Login
      </Button>

      <Button
        style={{ width: "80%" }}
        onClick={() => {
          Logout();
        }}
      >
        Logout
      </Button>
    </FlexContainer>
  );
}

export default LoginPage;
