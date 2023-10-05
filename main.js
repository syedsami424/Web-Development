//Server-side code:-
const express=require('express');
const axios=require('axios');
const path=require('path');
const bodyParser = require('body-parser');
// import('node-fetch').then(({ default: fetch }) => {
// });

const app=express();  //creating an express application (instance of express)
app.use(bodyParser.json());
const port=5500;

app.get('/home' ,async(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.get('/getWeather', async(req,res)=>{ 
    try{
        const lon = req.query.lon;
        const lat = req.query.lat;
        console.log(lon);
        console.log(lat);
        // let lon=7.447;
        // let lat=46.948;
        // let product="civil";
        const apiURL= `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;

        const response = await axios.get(apiURL);  //API call
        const weatherData=response.data;  

        let responseData={
            weatherData: weatherData,
            longitude: lon,
            latitude: lat
        }
        
        res.setHeader('Access-Control-Allow-Origin','*');
        console.log(weatherData);
        res.json(responseData);  //send data from server to client.
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error :("});
    }
});

//activate server
app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}`);
})



/*app.get('/getimage',async(req,res)=>{
    try{
        lon=7.447;
        lat=46.948;
        const imgURL= `http://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`;

        const img_response= await axios.get(imgURL);
        const img_data=img_response.data;

        res.setHeader('Access-Control-Allow-Origin','*');
        // console.log(img_data);
        res.send(img_data);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error :("});
    }
});*/