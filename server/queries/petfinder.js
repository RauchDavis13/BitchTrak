require('dotenv').config()  // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const { Client } = require ("@petfinder/petfinder-js");


const client = new Client({apiKey: process.env.PETFINDER_APIKEY , secret: process.env.PETFINDER_SECRET});
module.exports = 
async function petSearch({name, zipcode }){
return await client.authenticate()
  .then(resp => {
    if (!resp) return null
    const token = resp.data.access_token;
    const expires = resp.data.expires_in;
    return token
  })
  .then(async token => {
    const apiResult = await client.animal.search({
        name,
        type: "dog",
        gender: "female",
        page: 1,
        limit: 10,
        location: zipcode
      })
    .then(function (response) {
        console.log(response)
        return response.data.animals

    })
    .catch(function (error) {
      console.log(error);  
      // Handle the error
    });
    return apiResult
  })
}
// (async () => {
//   const pet = await petSearch({zipcode:"07013",name:""});
//   console.log(pet)  
// })()