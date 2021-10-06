import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Toplearn from "./Toplearn";
import { ToastContainer } from "react-toastify";

const App = () => {
  useEffect(() => {
    require("../utils/script");
  }, []);

  return (
    <BrowserRouter>
      <Toplearn />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
