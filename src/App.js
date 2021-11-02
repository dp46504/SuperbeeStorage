import { slide as Menu } from "react-burger-menu";
import { styles } from "./Styles/MenuStyle";
import { GlobalStyles, MenuItem, ActiveMenuItem } from "./Styles/Styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddItemComponent from "./Components/AddItemComponent";
import AddColorComponent from "./Components/AddColorComponent";
import { initializeApp } from "firebase/app";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDJKFs3w4I4uqyQKxBeC2Uh6KuiYTZXaLU",
    authDomain: "superbeestorage-f778a.firebaseapp.com",
    projectId: "superbeestorage-f778a",
    storageBucket: "superbeestorage-f778a.appspot.com",
    messagingSenderId: "1091745430163",
    appId: "1:1091745430163:web:9bed889dcd025184566b66",
    measurementId: "G-Y4KG9HDGLH",
  };
  initializeApp(firebaseConfig);
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <Router>
        <Menu isOpen={false} styles={styles}>
          <MenuItem exact activeStyle={ActiveMenuItem} to="/addcolor">
            Add new Color
          </MenuItem>
          <MenuItem exact activeStyle={ActiveMenuItem} to="/">
            Add Item
          </MenuItem>
        </Menu>
        <Switch>
          <Route exact path="/addcolor" component={AddColorComponent}></Route>
          <Route exact path="/" component={AddItemComponent}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
