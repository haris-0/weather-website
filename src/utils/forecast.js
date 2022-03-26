const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6b3ad3d164b0734cd00c3b82a52be73f&query=' + latitude + ',' + longitude
    request( {url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect!', undefined)
        } else if(body.error) {
            callback('Unable to find location! Try again', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast