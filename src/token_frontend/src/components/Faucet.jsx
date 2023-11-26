import React,{useState}from "react";
import { token_backend } from "../../../declarations/token_backend";

function Faucet() {

  const [disable, setDisable]=useState(false);
  const [text, setText]=useState("Gimme Gimme");

  async function handleClick(event) {
    setDisable(true);
    const result= await token_backend.payOut(); 
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DMN tokens here! Claim 10,000 DMN coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" 
        onClick={handleClick}
        disabled={disable}
        >
          {text}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
