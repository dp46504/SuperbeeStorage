import React, { useEffect, useState } from "react";
import { Button, FlexContainer, Label } from "../Styles/Styles";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

function LoginPage(props) {
  const provider = new GoogleAuthProvider();
  const [loggedIn, setLoggedIn] = useState(getAuth().currentUser);
  // eslint-disable-next-line
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      setLoggedIn(user);
    });
  }, []);

  const Login = () => {
    const auth = getAuth();
    const analytics = getAnalytics();

    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Pomyślnie zalogowano");
        logEvent(analytics, "login_succesfull", {
          user_name: result.user,
        });
        setLoggedIn(true);
        setUserName(getAuth().currentUser);
      })
      .catch((error) => {
        alert(`Wystąpił błąd przy logowaniu: ${error.message}`);
        logEvent(analytics, "login_failed", {
          user_name: error.email,
        });
        setLoggedIn(false);
        setUserName(getAuth().currentUser);
      });
  };

  const Logout = () => {
    const auth = getAuth();
    const analytics = getAnalytics();
    logEvent(analytics, "logout", {
      user_name: auth.currentUser,
    });
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

      {loggedIn === null ? (
        <Button
          style={{ width: "80%" }}
          onClick={() => {
            Login();
          }}
        >
          Login
        </Button>
      ) : (
        <Button
          style={{ width: "80%" }}
          onClick={() => {
            Logout();
          }}
        >
          Logout
        </Button>
      )}
    </FlexContainer>
  );
}

export default LoginPage;
