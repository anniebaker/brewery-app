require("dotenv").config();
const fetch = require("node-fetch");

const baseURL = "https://sandbox-api.brewerydb.com/v2/";

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`What's your zip code? `, zipCode => {
  console.log(`We're finding breweries in ${zipCode}!`);
  createBrews(zipCode);
  readline.close();
});

function createBrews(userInput) {
  fetch(
    baseURL + "locations/?key=" + process.env.KEY + "&postalCode=" + userInput
  )
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(obj => {
      const totalResults = obj.totalResults;

      const breweryName = obj.data["0"].name;
      const breweryAddress = obj.data[0].streetAddress;
      const breweryPhone = obj.data[0].phone;

      console.log(`Number of results in that zip code: ${totalResults}`);
      console.log(breweryName);
      console.log(breweryAddress);
      console.log(breweryPhone);
    })
    .catch(err => console.log(`Error, ${err}`));
}
