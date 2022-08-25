/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

 var request = require('request'); // "Request" library

 function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
      queryEnd   = url.indexOf("#") + 1 || url.length + 1,
      query = url.slice(queryStart, queryEnd - 1),
      pairs = query.replace(/\+/g, " ").split("&"),
      parms = {}, i, n, v, nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=", 2);
      n = decodeURIComponent(nv[0]);
      v = decodeURIComponent(nv[1]);

      if (!parms.hasOwnProperty(n)) parms[n] = [];
      parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
}

 var client_id = '3f1987c70b5446df96f5e4061d3f71b4'; // Your client id
 var client_secret = '5b8c0f3c069f4f31a9c0395acf6f7500'; // Your secret
 
 // your application requests authorization
 var authOptions = {
   url: 'https://accounts.spotify.com/api/token',
   headers: {
     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
   },
   form: {
     grant_type: 'client_credentials'
   },
   json: true
 };
 const form = document.querySelector('form')
 console.log(form.elements.artist)
 const stuff = Object.values(form)[0].baseURI
 console.log(stuff)
 const params = parseURLParams(stuff)
 console.log(params)

 let artist = params.artist[0]
 let type = params.type[0]
 
 

 var q = document.querySelector('#q')
 console.log(q)
 request.post(authOptions, function(error, response, body) {
   if (!error && response.statusCode === 200) {
 
     // use the access token to access the Spotify Web API
     var token = body.access_token;
     var options = {
       url: `https://api.spotify.com/v1/search?q=${artist}&type=${type}&market=ES`,
       headers: {
         'Authorization': 'Bearer ' + token,
         'Content-Type': 'application/json'
       },
       json: true
     };
     request.get(options, function(error, response, body) {
       console.log(body.artists.items);
       let el = document.querySelector('div')
       console.log(el)
       body.artists.items.map((e) => {
          el.innerHTML += `<h1>${e.name}</h1>`
          el.innerHTML += `${e.external_urls.spotify}`
       })
       

     });
   }
 });



