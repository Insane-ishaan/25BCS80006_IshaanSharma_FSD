import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState("");

  let ApiResponse;
  const response = async () => {
    const API = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;
    const res = await fetch(API);
    const format = await res.json();
    setResult(format.rate * amount);
  };
  return (
    <>
      Amount
      <input type="number" onChange={(e) => setAmount(e.target.value)} />
      <br />
      From
      <input type="text" onChange={(e) => setFrom(e.target.value)} />
      <br />
      To
      <input type="text" onChange={(e) => setTo(e.target.value)} />
      <br />
      <button onClick={response}>Convertor</button>
      {result}
    </>
  );
}

export default App;
