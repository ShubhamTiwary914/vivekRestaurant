let orderDetails = {}


function findUserCoordinates(){
    const success = (position) =>{
        let longt = position.coords.longitude;
        let latt = position.coords.latitude;
        let addressValue = `${longt} ${latt}`;
        orderDetails['location'] = addressValue;
        locate_userLocation(addressValue);
    }
    const error = () =>{
        alert('Make sure you have a proper internet connection and add location for better accuracy!')
    }
    navigator.geolocation.getCurrentPosition(success, error);
}



function locate_userLocation(addressCoords){
    if(addressCoords == null)
        return null;
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
        orderDetails['addressDetail'] = `${addressName}, ${streetName}(${postCode}), ${district}, ${state}`;
    })
}



//if order-type is delivery, then fetches user location
function toggleLocationField(){
    if(orderDetails['type'] == 'delivery')    
        $('#delivery-location').show();
    else 
        $('#delivery-location').hide();   
}


//updates order details and user details fields
function loadOrderDetails(){
    orderDetails['totalPrice'] = `₹ ${orderDetails['amount'] * orderDetails['price']}`;
    let orderKeys = Object.keys(orderDetails); 
    orderKeys.forEach((orderKey)=>{
        if(orderKey == 'imagePath')
            $('#order-imagePath').attr('src', orderDetails['imagePath']);
        else if(orderKey == 'type'){
            $(`#order-type #order-selection-${orderDetails['type']}`).attr("selected", true); 
        }
        else if(orderKey == 'location'){
            console.log(orderDetails)
        }
        else
            $(`#order-${orderKey}`).text(orderDetails[orderKey])
    });
    toggleLocationField();
}


// when user tries to add or subtract amount of items
function handleOrderAmountControls(orderIconID){
    let operationType = orderIconID.split('-')[2]
    if(operationType == 'plus')
        orderDetails['amount']++;
    else
        if(!(orderDetails['amount']) <= 1)
            orderDetails['amount']--;
    loadOrderDetails();
}



$(document).ready(function(){
    orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'))
    orderDetails['location'] = sessionStorage.getItem('location');
    orderDetails['addressDetails'] = locate_userLocation(orderDetails['location'])
    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    $('#sideBar').html(loadSidebarComponent());
    $('#sideBar').hide();
    $('#delivery-location').hide();
    loadOrderDetails();

    $('.order-icon').click(function(){
        handleOrderAmountControls($(this).attr('id'))
    });

    $('#order-type').change(function(){
        orderDetails['type'] =  $('#order-type').val() 
        loadOrderDetails();
    })

    $('#user-address-fetch-button').click(function(){
        findUserCoordinates();
    })
})