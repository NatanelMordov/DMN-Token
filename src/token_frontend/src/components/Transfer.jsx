import React,{useState} from "react";
import { Principal } from "@dfinity/principal";
import { token_backend } from "../../../declarations/token_backend";

function Transfer() {
  
  const[recive, setRecive]=useState("");
  const[sum, setSum]=useState("");
  const[massage, setMassage]=useState("");
  const[disable,isDisabled]=useState(false);
  const[isHidden,setIsHidden]=useState(true);

  async function handleClick() {
    setIsHidden(true);
    isDisabled(true);
    let newRecive=Principal.fromText(recive);
    let newSum=Number(sum);
    const result=await token_backend.transfer(newRecive,newSum);
    setMassage(result);
    setIsHidden(false);
    isDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recive}
                onChange={(e)=>{setRecive(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={sum}
                onChange={(e)=>{setSum(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer"
           onClick={handleClick}
           disabled={disable}
            >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{massage}</p>
      </div>
    </div>
  );
}

export default Transfer;
