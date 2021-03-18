let placeSearch;
let autocomplete;

const componentForm = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    postal_code: "short_name",
    country: "long_name"
};

function initAutocomplete() {
    autocomplete = new google.maps.places.SearchBox(
        document.getElementById('street_number'), { types: ["geocode"] }
    );

    autocomplete.setFields(["address_component"]);

    autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {

    const place = autocomplete.getPlace();

    for (const component in componentForm) {
        document.getElementById(component).value = "";
        document.getElementById(component).disabled = false;
    }

    for (const component of place.address_components) {
        const addressType = component.types[0];

        if (componentForm[addressType]) {
            const val = component[componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            const circle = new google.maps.Circle({
                center: geolocation,
                radius = position.coords.accuracy,
            });
            autocomplete.setBounds(circle.getBounds());
        });

    }
}