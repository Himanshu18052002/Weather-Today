const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.get("/" , function(req , res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/" , function(req,res){
  const querry = req.body.cityName;
  const appid = "5dc66c929555e9c434fcd5fcd43137c6";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ querry +  "&units=" + unit + "&appid=" + appid;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data" , function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
      const des = weatherData.weather[0].description;
      res.write("<p>the overall weather of " +querry+ " is "+ des + "</p>");
      res.write("<h1>The Temprature of " + querry +" is " + temp + "</h1>");
      res.write("<img src=" + imgurl +" >");
      res.send();
    });
  });
});
app.listen(3000,function(){
  console.log("server 3000 online");
});
