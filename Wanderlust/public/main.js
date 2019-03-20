// Foursquare API Info
const clientId = 'XN20SO3BELCLF25E5FJDNRD0AOJDQL4WFZFSKPYDR305QMGE';
const clientSecret = 'XMLJ0O25WD4HL54XSENVX24SH4VHWVUBFKV0LM2UJPPILVEM';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = 'cb635ae3f99f4cd3aa8225355191403';
const forecastUrl = 'http://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const $imgValueDivs = [$("#imgVenue1"),$("#imgVenue2"),$("#imgVenue3"),$("#imgVenue4"),$("#imgVenue5")]
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
// Fetch more than 4 venues and randomize which ones are added to the page.
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = url+city+"&limit=10&client_id="+clientId+"&client_secret="+clientSecret+"&v=20190315";
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      let jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map( item => item.venue);
      
      //make the choose of array randomized
      const shuffleVenues = shuffle(venues);
      return shuffleVenues;
    }
  }catch(error){
    console.log(error);
  }
}

const getPhotoVenues = async (id) => {
  const urlPhoto = 'https://api.foursquare.com/v2/venues/'+id+'/photos?&client_id='+clientId+'&client_secret='+clientSecret+'&v=20190315';
  try {
    const response = await fetch(urlPhoto);
    if(response.ok){
      let jsonResponse = await response.json();
      let photo = jsonResponse.response.photos.items[0];
      let urlPhoto = photo.prefix + '100x200' + photo.suffix;
      //console.log(urlPhoto);
      return urlPhoto;      
    }
  } catch (error) {
    console.log(error);
  }

}

const getForecast = async () => {
  try {
    const urlToFetch = forecastUrl + apiKey + '&q=' + $input.val() + '&days=4&hour=11';
    const response = await fetch(urlToFetch);
    if(response.ok){
      let jsonResponse = await response.json();
      const days = jsonResponse.forecast.forecastday;
      //console.log(days);
      return days;
    }
  } catch (error) {
    console.log(error);
  }
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:    
    const venue = venues[index]; 
    const venueIcon = venue.categories[0].icon;
    getPhotoVenues(venue.id).then(urlPhoto => {
      //access them here
      let venueContent = createVenueHTML(venue.name,venue.location,urlPhoto); 
      $venue.append(venueContent);
    });
    
    //const venueImgSrc = venueIcon.prefix + "bg_64" + venueIcon.suffix;
    //let venueContent =  createVenueHTML(venue.name,venue.location,venueImgSrc);
    //$venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
    const day = days[index];
    let weatherContent = createWeatherHTML(day);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(days => renderForecast(days));
  return false;
}

$submit.click(executeSearch)
