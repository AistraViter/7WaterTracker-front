import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import { store, persistor } from "./redux/store.js";
import App from "./components/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>

    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <HelmetProvider>
            <App />
        </HelmetProvider>
      </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
