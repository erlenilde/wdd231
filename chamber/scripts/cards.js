import { places } from "../data/places.mjs";

const cards = document.querySelector('#allplaces');

const displayPlaces = (places) => {
    places.forEach(place => {
        let card = document.createElement('div');
        let placename = document.createElement('h2');
        let photo = document.createElement('img');
        let description = document.createElement('p');
        description.className = 'description';
        let address = document.createElement('p');
        address.className = 'location';
        let cost = document.createElement('p');
        cost.className = 'cost';

        placename.textContent = `${place.name}`
        description.textContent = `${place.description}`
        address.textContent = `Location: ${place.address}`
        cost.textContent = `Cost: ${place.cost}`

        photo.setAttribute('src', place.photo_url);
        photo.setAttribute('alt', `Photo of ${place.name}`);
        photo.setAttribute('loading', 'lazy');
        photo.setAttribute('width', '300');
        photo.setAttribute('height', '200');

        card.appendChild(placename);
        card.appendChild(photo);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(cost);

        cards.appendChild(card);
    });

}

displayPlaces(places);

