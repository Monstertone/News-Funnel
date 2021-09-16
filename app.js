const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('API KEY');
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
let IPinfo = require("node-ipinfo");

let token = "My Token"
let ip = ""
let asn = "AS7922";
let ipinfo = new IPinfo(token);



// const methodOverride = require('method-override');
// const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// app.use(methodOverride('_method'));
// app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// const stories = require('./stories.js');
const { info } = require('console');


  app.get('/',  async (req, res) => {

    // ****Initial Call to News API *****************

    newsapi.v2.topHeadlines({
    
      language: 'en',
      country: 'us'
    }).then(response => {
     
      stories = response;
      let headlines = stories.articles;

  //  ***************GET IP info here *****************

            ipinfo.lookupIp(ip).then((ipData) => {
              
              let location = ipData.loc;
              let lat = location.slice(0,7);
              let lon = location.slice(8,17);
              let city = ipData.city;
              console.log(ipData);

              console.log(`the lat is: ${lat}, and the longitude is:${lon}`)

    // ************Weather API call ***********************
    
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=API KEY`)

  
               .then( (report) => {
      console.log("weather call works!")




      res.render('index', { headlines, lat, lon, city });

                });
             
    
            });
  
  
      });

     
 });


  
  

  app.listen(3000, ()=> {
      console.log("Listening on Port 3000")

  });
