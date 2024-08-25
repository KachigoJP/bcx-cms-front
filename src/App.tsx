// React imports
import React from "react";
import { BrowserRouter } from "react-router-dom";
// import { PayPalScriptProvider } from '@paypal/react-paypal-js'

// Static import
import "./i18n";
import "./scss/styles.scss";

// Import CSS
import "react-datepicker/dist/react-datepicker.css";

// App imports
import AuthProvider from "./contexts/auth";
import PrefProvider from "./contexts/preferrence";
import { PAYPAL_CLIENT_ID } from "./helpers/constants";

import Routers from "./routers";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PrefProvider>
          <Routers />
        </PrefProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
