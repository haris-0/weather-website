const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGFyaXNtZCIsImEiOiJja3Z4dW41aWxja2doMm9zNzFiZGVoeWp6In0.Z5RESfv2NkcJqaB6EyZIog&limit=1'
    request( {url, json: true}, (error, {body} = {}) =>{
        if(error) {
            callback('Not able to connect with app.', undefined)
        } else if(body.features.length === 0) {
            callback('Location not found! Try again.', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
 module.exports = geoCode