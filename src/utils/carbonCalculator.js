// Emission factors: kg CO2 per km (IPCC / GHG Protocol)
// Cost: INR per working day (22 days/month assumed)
// Speed: km/h average

export function calculateCommute(distance, days = 22) {

  const modes = [
    { name: "Walking",     co2: 0.000, cost: 0,   speed: 5  },
    { name: "Bicycle",     co2: 0.000, cost: 1,   speed: 14 },
    { name: "E-Scooter",   co2: 0.022, cost: 10,  speed: 28 },
    { name: "Metro Rail",  co2: 0.041, cost: 19,  speed: 35 },
    { name: "EV Car",      co2: 0.050, cost: 14,  speed: 30 },
    { name: "City Bus",    co2: 0.089, cost: 6,   speed: 18 },
    { name: "Shared Cab",  co2: 0.130, cost: 38,  speed: 25 },
    { name: "Petrol Bike", co2: 0.103, cost: 30,  speed: 30 },
    { name: "CNG Car",     co2: 0.130, cost: 26,  speed: 30 },
    { name: "Diesel Car",  co2: 0.171, cost: 48,  speed: 30 },
    { name: "Petrol Car",  co2: 0.192, cost: 54,  speed: 30 },
  ];

  return modes.map((mode) => {
    const monthlyCo2 = mode.co2 * distance * 2 * days;
    const monthlyCost = mode.cost * days * 2;
    const time = (distance / mode.speed) * 60;

    return {
      name: mode.name,
      co2: monthlyCo2.toFixed(2),
      cost: monthlyCost.toFixed(0),
      time: time.toFixed(0),
    };
  });
}
