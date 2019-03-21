const request = require('request')

const forecast = (latitude, longitude, callback) =>{

    const url = 'https://api.darksky.net/forecast/46dd741641c05b4eeb48aed9488a75cc/'+ latitude +',' + longitude+'?units=si'
 
    request({url, json: true}, (error, {body}) =>{
       if(error){
          //error if no network connectivity
          //pass callback an error message and undefined as there will be no data
          callback('Unable to connect to location services',undefined)
       }else if(body.code === 400){
          //error if query results in no data
          //pass callback message that query is bad and pass undefined as there is no data 
          callback(response.body.error, undefined)
       }else{
         const temperature = body.currently.temperature
         const chanceRain = parseInt((body.currently.precipProbability)*100)
         const precipType = body.currently.precipType
         const dailySummary= body.daily.data[0].summary
         const tempHi = body.daily.data[0].temperatureHigh
         const tempLow = body.daily.data[0].temperatureLow
          //good data returned
          if(!chanceRain){
             currentForcast = `${dailySummary} \\n The temperature is ${temperature} degrees with a ${chanceRain}% chance of precipitation.
                              \\n The high today will be ${tempHi} degrees with a low of ${tempLow} degrees`
          }else{
            currentForcast = `${dailySummary}  \n The temperature is ${temperature} degrees with a ${chanceRain}% chance of ${precipType}.
                              \nThe high today will be ${tempHi} degrees with a low of ${tempLow} degrees.`
          }
          callback(undefined,currentForcast)
       }
    })
 }

 module.exports = forecast