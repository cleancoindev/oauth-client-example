import React from "react";
import rollAPI from "../api";
import Button from "../components/button";
import { SessionContext } from "../components/sessionManager";

export default function HasBalance() {
  const session = React.useContext(SessionContext);

  const [inputState, setInputState] = React.useState({
    amount: "",
    symbol: "",
  });

  const [errMessage, setErrMessage] = React.useState("");

  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubmit = (e) => {
    const { amount, symbol } = inputState;

    setErrMessage("");

    let n = Number(amount);

    // user must provide a valid number to check balance
    if (isNaN(n)) {
      setErrMessage("please provide a valid number");
      return;
    }

    // pass in the user's userID, the token symbol, and the amount.
    // the amount does not need to be converted. The user input amount can be passed in directly (must be a number type)
    rollAPI.user
      .hasBalance(session.user.userID, symbol, amount)
      .then(({ hasbalance }) => setSuccessMessage(`has balance: ${hasbalance}`))
      .catch((err) => setErrMessage(err.message));
  };

  return (
    <div className='has-balance-container'>
      <div>
        <h3>Check user balance</h3>
        <p>Returns true or false</p>
        <input
          placeholder='amount'
          value={inputState.amount}
          onChange={(e) =>
            setInputState({ ...inputState, amount: e.target.value })
          }
        />
        <input
          placeholder='symbol'
          value={inputState.symbol}
          onChange={(e) =>
            setInputState({
              ...inputState,
              symbol: e.target.value.toUpperCase(),
            })
          }
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <p>{errMessage}</p>
      <p>{successMessage}</p>
    </div>
  );
}
