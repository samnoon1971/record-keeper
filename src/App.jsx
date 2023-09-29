import "./App.css";
import List from "./components/List";
import { Container } from "@mui/material";
import store from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
        <List />
    </Provider>
  );
}

export default App;
