const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    return `<h2> High: ${farToCel(currentDay.day.maxtemp_f)}</h2>
      <h2> Low: ${farToCel(currentDay.day.mintemp_f)}</h2>
      <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
      <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>
      <h3>Sunrise:</h3>
      <p>${currentDay.astro.sunrise}</p>
      <h3>Sunset:</h3>
      <p>${currentDay.astro.sunset}</p>`;
  }

  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  const farToCel = (degree) => {
    //(deg°F - 32) × 5/9 = deg°C
      return ((degree-32)*5/9).toFixed(1)+"°C";
  }