

let orderType_HTML = {
    "delivery": `
        <h4 class="card-title">Order food to your doorsteps!</h4>
        <br /> 
        <p class="card-text">
            <label class='form-label'> <h5> Locate your delivery address: </h5>  </label> &nbsp;&nbsp;&nbsp;
            <button class='btn'id='order-findLocation'> Find Location </button> <br /> <br />
            <input id='order-location' placeholder='Your current location...'/> 
        </p>
        <button class="btn btn-success disabled" id='order-button'>Make Order</button>
    `,
    "dine": `
        <h5 class="card-title">Order food to be prepared!</h5>
        <p class="card-text">
            <label class='form-label'>  </label>
        </p>
        <a href="#" class="btn btn-success"> Make Order </a>
    `
}


function ordertypeManager(orderType, setDefault = false){
    if(setDefault){
        $(`#order-type-delivery`).css({ 'background-color': 'white', 'color': 'black' });
        $('#order-manageSection .card-body').html(orderType_HTML['delivery']);
        return;
    }
    if(orderType == 'delivery'){
        $(`#order-type-delivery`).css({ 'background-color': 'white', 'color': 'black' });
        $(`#order-type-dine`).css({ 'background-color': 'black', 'color': 'white' });
    }else{
        $(`#order-type-dine`).css({ 'background-color': 'white', 'color': 'black' });
        $(`#order-type-delivery`).css({ 'background-color': 'black', 'color': 'white' });
    }
   $('#order-manageSection .card-body').html(orderType_HTML[orderType]);
}


function findUserCoordinates(){
    const success = (position) =>{
        let longt = position.coords.longitude;
        let latt = position.coords.latitude;

        let addressValue = `${longt} ${latt}`;
        sessionStorage.setItem('location', addressValue);
        locate_userLocation(addressValue);
    }
    const error = () =>{
        alert('Make sure you have a proper internet connection and add location for better accuracy!')
    }
    navigator.geolocation.getCurrentPosition(success, error);
}


function locate_userLocation(addressCoords){
    let apiKey = 'd0e6bda9f31d47cda3da00d1a3c703da';
    let userLongitude = addressCoords.split(' ')[0];
    let userLatitude = addressCoords.split(' ')[1];
    let query = `https://api.geoapify.com/v1/geocode/reverse?lat=${userLatitude}&lon=${userLongitude}&format=json&apiKey=${apiKey}`;
    fetch(query).then(response => response.json()).then(result =>{ 
        //main code here(code block after lat and long are retrieved)
        let fetchedResult = result['results']
        let resultsCount = fetchedResult.length
        //address details
        let streetName = fetchedResult[resultsCount - 1]['street']
        let addressName = fetchedResult[resultsCount - 1]['name']
        let postCode = fetchedResult[resultsCount - 1]['postcode']
        let district = fetchedResult[resultsCount - 1]['state_district']
        let state = fetchedResult[resultsCount - 1]['state']
        $('#order-location').val(`${addressName}, ${streetName}(${postCode}), ${district}, ${state}`);
        $('#order-button').removeClass('disabled')
    })
}



$(document).ready(function(){
    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    ordertypeManager('', true);
    
    $('.order-typeSelector').click(function(){
        ordertypeManager($(this).attr('id').split('-')[2]);
    })

    $('#order-manageSection').on('click', '#order-findLocation', function(){ 
        findUserCoordinates();
    });

})

