import { useEffect, useState, useReducer } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
      };

    case "FETCH_SUCCESS":
      return {
        amount: "",
        from: action.payload.base,
        to: action.payload.quota,
        result: "",
        perRate: action.payload.rate,
        time: action.payload.date,
        loading: false,
      };

    case "FETCH_ERROR":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

function App() {
  const initialState = {
    currencies: [],
    amount: "",
    from: "",
    to: "",
    result: "",
    perRate: "",
    time: "",
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
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

    dispatch({
      type: "FETCH_START",
    });
    try {
      const API = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;
      const res = await fetch(API);
      const formatData = await res.json();

      dispatch({
        type: "FETCH_SUCCESS",
        payload: formatData,
      });
    } catch (e) {
      dispatch({
        type: "FETCH_ERROR",
        payload: e.message,
      });
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
              <Card key={card.id} sx={{ px: 3 }}>
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
