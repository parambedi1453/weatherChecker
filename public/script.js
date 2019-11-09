const searchElement = document.querySelector('[data-city-search]')

// this search box is for google search box for searching places
const searchBox = new google.maps.places.SearchBox(searchElement)

// searchBox addListener is the googles listener for the places enterd
searchBox.addListener('places_changed', ()=>{

    
    // getting the first place of the getPlaces Array
    const place = searchBox.getPlaces()[0]
    if(place==null)
    return


    // the DARKSKYAPI USES longitude and latitude for giving us information as an input hence we are fetching the long and lat of the location
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()

    fetch('/weather' ,{
        method :'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body:JSON.stringify({
            latitude : latitude,
            longitude:longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)

    })
})


const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')


const icon = new Skycons({color : '#222'})
// setting the default icon
icon.set('iconid','clear-day')
icon.play()

function setWeatherData(data,place)
{
    locationElement.innerHTML = place
    statusElement.innerHTML = data.summary
    temperatureElement.innerHTML = data.temperature
    precipitationElement.innerHTML=`${data.precipProbability *100}%`
    windElement.innerHTML = data.windSpeed

    // the data got contain iconattribute
    icon.set('iconid',data.icon)
    icon.play()
}
