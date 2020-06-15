const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=264610bee72ff8e87c7078b0908d4a65&query='
                        + latitude + ',' + longitude
 
    request ({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        }
        else {
            callback(undefined, 
                'Weather today is: ' + body.current.weather_descriptions.toString() + '. It is currently ' + body.current.temperature + ' degrees Celsius today'
                + ' with a ' + body.current.precip + '% chance of rain. But it feels like ' + body.current.feelslike + ' degrees with a humidity of ' + body.current.feelslike + '%')


            // callback(undefined, {
            //     weather: body.current.weather_descriptions,
            //     temp: body.current.temperature,
            //     rain: body.current.precip,
            //     actualTemp: body.current.feelslike })
            
        }
    })
}
 

module.exports = forecast