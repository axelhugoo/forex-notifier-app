const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const THRESHOLD_MIN = 30;
const THRESHOLD_MAX = 70;

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

const postRSIToPB = async (data) => {
  try {
    const url = "https://api.pushbullet.com/v2/pushes";
    const payload = {
      device_iden: "ujDfGNf4lk4sjys80jvS1s",
      type: "note",
      title: "FX Notif - RSI",
      body: JSON.stringify(data),
    };
    const headers = {
      "Access-Token": "o.dYrbJOb2SzCNMBYsK0GWXiCsPXqXuryS",
    };

    axios.post(url, payload, { headers: headers });
  } catch (error) {
    console.error(error);
  }
};

//Converter object to array
//Receive old structure changes to new structure
const converterObject = (oldStructure) => {
  let newStructure = [];

  for (const [key, value] of Object.entries(oldStructure)) {
    //deconstruct key to date and time
    let deconDateTime = key.split(" ");
    let deconDate = deconDateTime[0];
    let deconTime = deconDateTime[1];

    //convert RSI string to RSI number
    let RSIToInt = Number(value["RSI"]);

    const newEntry = { date: deconDate, time: deconTime, RSI: RSIToInt };
    if (newEntry.RSI < THRESHOLD_MIN || newEntry > THRESHOLD_MAX) {
      newStructure.push(newEntry);
    }
    //console.log(newEntry);
  }

  return newStructure;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/rsi", async (req, res) => {
  let x = await getRSIFromAPI();
  let y = converterObject(x);
  postRSIToPB(y);
  res.send(y);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
