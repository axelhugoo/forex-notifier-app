const car = {
  color: "white",
  number_of_wheels: 4,
  make: "honda",
  model: "civic",
  wheels: [
    {
      id: "front-left",
      brand: "Bridgestone",
      condition: "Poor",
      smoothness: 25,
    },
    {
      id: "front-right",
      brand: "Bridgestone",
      condition: "Good",
      smoothness: 50,
    },
    {
      id: "back-left",
      brand: "Bridgestone",
      condition: "Poor",
      smoothness: 30,
    },
    {
      id: "back-right",
      brand: "Bridgestone",
      condition: "Poor",
      smoothness: 10,
    },
  ],
};

const printPoorWheels = () => {
  let total = 0;
  let smoothnessTotal = 0;
  let smoothnessAvg = 0;
  for (let i = 0; i < car.number_of_wheels; i++) {
    if (car.wheels[i].condition == "Poor") {
      total = total + 1;
      smoothnessTotal += car.wheels[i].smoothness;
      smoothnessAvg = smoothnessTotal / total;
      console.log(car.wheels[i]);
    }
  }
  console.log("Smoothness Average of all bad wheels:" + smoothnessAvg);
};

printPoorWheels();
