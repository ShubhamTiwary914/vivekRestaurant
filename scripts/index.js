

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
        let district = fetchedResult[resultsCount - 1]['state_district']
        let state = fetchedResult[resultsCount - 1]['state']
        let userLocationDetails = `${addressName}, ${streetName}, ${district}, ${state}`;
        console.log(userLocationDetails)
    })
}



function handleSelectionOptions(selectedOption){
    let selectionContainer_HTML = '';
    if(selectedOption == 'delivery'){
        selectionContainer_HTML = `  
            <div class='row'>
                <div class='col-7'>
                    <input class='form-control' placeholder='Enter your delivery address' id='delivery-input'>
                </div>
                <div class='col-3 gray-text' id='locate-btn'> 
                    <img src='./assets/icons/svgs/locatorPin.svg' id='locator-icon'>
                    <span id='locate-text'> Locate me  </span>
                </div>
                <div class='col-2'> <button class='btn menu-btn' id='find-food-btn'> Find Food </button> </div>
            </div>
        `;
    }else if(selectedOption == 'dine'){
        selectionContainer_HTML = `
            <em style='color: gray'> Select from our varieties of food available here </em> &nbsp; &nbsp; &nbsp;
            <button class='btn btn-outline-success menu-btn'> View Menu </button>
        `;
    }
    $('#selection-container').html(selectionContainer_HTML)
}



$(document).ready(function(){
    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    $('#sideBar').html(loadSidebarComponent())
    $('#sideBar').hide();
    handleSelectionOptions('delivery')


    $('#selection-manager').change(function(){
        handleSelectionOptions($(this).val());
    })

    $('#selection-container').on('click','.menu-btn',function(){
        window.location.href = './menu.html';
    });

    $('#locate-btn').click(function(){
       findUserCoordinates();
    })
})

