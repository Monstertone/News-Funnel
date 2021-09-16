const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6560880c487746438fe80efea6edbe2d');
const express = require('express');
const app = express();
const path = require('path');
let IPinfo = require("node-ipinfo");

let token = "4078bcee81eb53"
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

    newsapi.v2.topHeadlines({
      // q: 'trump',
      // category: 'politics',
      language: 'en',
      country: 'us'
    }).then(response => {
     
      stories = response;


  //  ***************GET IP info here *****************

    ipinfo.lookupIp(ip).then((response) => {
      console.log(response.asn); // { asn: 'AS15169', name: 'Google LLC', domain: 'google.com', route: '8.8.8.0/24', type: 'business' }
      console.log(response.ip);
      console.log(response.hostname); // dns.google
      console.log(response.city); // Mountain View
      console.log(response);

      let location = response.loc;
      console.log(location);
      console.log(typeof location)
      let latitude = location.slice(0,7);
      console.log(latitude)
      let longitude = location.slice(8,17);
      console.log(longitude)
      let city = response.city;
      console.log(city)
    
    
  });
  
  ipinfo.lookupASN(asn).then((response) => {
      console.log(response.asn); // AS7922
      console.log(response.name); // Comcast Cable Communications, LLC
      console.log(response.country); // United States
  });

  // ---************************************************----
      
  
      // let headlines = stories.story.articles;
         let headlines = stories.articles;
         res.render('index', { headlines });
      
    });
  
  // res.render('index');
  // res.send(stories)
   
  })

  app.listen(3000, ()=> {
      console.log("Listening on Port 3000")

  });