var petfinder = require("@petfinder/petfinder-js");
var client = new petfinder.Client({apiKey: "U4ZufTHiHzEX2M4jAXOXBT5P3U8i8Dq8k3FlSipc8E0yJMVH0v", secret: "NFUXJUBaZf37ePCPOcaCBVYfq6wMyJnwvIMvbSFn"});

client.animal.search()
    .then(function (response) {
        console.log('response', response);
        // Do something with `response.data.animals`
    })
    .catch(function (error) {
        console.log('error', error);
        // Handle the error
    });
