import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

  return <>{loggedIn === true && loading === false ? props.children : null}</>;
}

export default PrivComponent;
