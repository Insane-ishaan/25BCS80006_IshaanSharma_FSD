import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState("");
  const [original, setOriginal] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const cards = [
    {
      id: 1,
      title: "Per Unit Rate",
      description: `1 ${from} = ${original} ${to}`,
    },
    {
      id: 2,
      title: "Parsed Result",
      description: `${amount} ${from} = ${result} ${to}`,
    },
    {
      id: 3,
      title: "Time",
      description: time,
    },
  ];

  useEffect(() => {
    const fetchAvailCurrencies = async () => {
      try {
        const API = "https://api.frankfurter.dev/v2/currencies";
        const currencys = await fetch(API);
        const format = await currencys.json();
        setCurrencies(format);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAvailCurrencies();
  }, []);

  console.log(currencies);
  const response = async () => {
    if (!from || !to || !amount) {
      return;
    }
    try {
      setLoading(true);
      const API = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;
      const res = await fetch(API);
      const format = await res.json();
      setOriginal(format.rate);
      setTime(format.date);
      setResult(format.rate * Number(amount));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Card sx={{ minWidth: 500, m: 5, p: 2 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="FROM"
                helperText="Please select your currency"
                onChange={(e) => setFrom(e.target.value)}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.iso_numeric} value={option.iso_code}>
                    {option.symbol} &nbsp;&nbsp;&nbsp; {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency-native"
                select
                label="TO"
                helperText="Please select your currency"
                onChange={(e) => setTo(e.target.value)}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.iso_numeric} value={option.iso_code}>
                    {option.symbol} &nbsp;&nbsp;&nbsp; {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
          <TextField
            required
            type="number"
            id="filled-required"
            label="Eg. 50"
            variant="filled"
            min={1}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            onClick={response}
            disabled={loading}
            sx={{ marginTop: 3 }}
          >
            {loading ? "Converting" : "Convert"}
          </Button>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
              gap: 2,
              marginTop: 8,
              justifyContent: "center",
            }}
          >
            {cards.map((card) => (
              <Card key={card.id} sx={{px:3}}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
