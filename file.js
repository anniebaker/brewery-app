require("dotenv").config();
console.log(process.env.KEY);

const baseURL = "https://sandbox-api.brewerydb.com/v2/";

fetch(baseURL + "locations/?key=" + process.env.KEY)
  .then(res => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  })
  .then(posts => (arrayOfPosts = posts))
  .catch(err => console.log(`Error, ${err}`));
/*

*/
