import {apikey} from './apikey';

/*export const search = (term, location, sortBy) => {
    const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term='+term+'&location='+location+'&sort_by='+sortBy;
    return fetch(url, {
        headers: {
            Authorization: "Bearer "+ apikey
        }
    }).then((response) => {
        return response.json();
    }).then(jsonResponse => {
        if(jsonResponse.businesses){
            return jsonResponse.businesses.map(business =>{
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                }
            })
        }
    });
}*/


export const searchAsync = async (term, location, sortBy) => {
    const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term='+term+'&location='+location+'&sort_by='+sortBy;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: "Bearer "+ apikey
            }
        });
        if(response.ok){
            let jsonResponse = await response.json();
            if(jsonResponse.businesses){
                return jsonResponse.businesses.map(business =>{
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                        webSite: business.url
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}