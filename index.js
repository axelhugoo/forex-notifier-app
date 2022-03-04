const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const URL =
  "https://www.alphavantage.co/query?function=RSI&symbol=EURUSD&interval=60min&time_period=14&series_type=open&apikey=L1JJOTO2HZTSENMI";

const getRSIFromAPI = async () => {
  try {
    const result = await axios.get(URL);
    const dataResult = result.data["Technical Analysis: RSI"];
    return dataResult;
  } catch (error) {
    console.error(error);
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/rsi", async (req, res) => {
  let x = await getRSIFromAPI();
  res.send(x);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
