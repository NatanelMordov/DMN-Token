import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";
import Footer from "./Footer";

function App() {

  return (
    <div id="screen">
      <Header />
      <Balance />
      <Faucet />
      <Transfer />
      <Footer />
    </div>
  );
}

export default App;
