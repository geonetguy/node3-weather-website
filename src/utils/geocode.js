const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZ2VvbmV0Z3V5IiwiYSI6ImNqdDI0emFuMzBxYWk0NHA5MnBteXExcW4ifQ.gm9XAStq8ynlKqfmXjccgg&limit=1'
    
    request({url, json: true}, (error, {body}) =>{
       
       if(error){
          //error if no network connectivity
          //pass callback an error message and undefined as there will be no data
          callback('Unable to connect to location services',undefined)
       }else if(!body.features || body.features.length === 0){
          //error if query results in no data
          //pass callback message that query is bad and pass undefined as there is no data 
          callback('Location was not found. Try another search', undefined)
       }else{
          //good data returned
          callback(undefined,{
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
          })
       }
    })
 }

 module.exports = geocode