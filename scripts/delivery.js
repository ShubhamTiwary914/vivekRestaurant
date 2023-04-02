let cartDetails = []
let userDetails = {}
let organisedCart = {}



function quantityDifferentiator(currentItem){
    let quantityCartHTML = ``
    if(currentItem.hasOwnProperty('qtr')){
        quantityCartHTML += `
            <div class='col-4 quantity-col'>
                <div class='quantity-header'> Quarter </div>
                <div class='quantity-price'> ₹ ${currentItem['qtr']['price']} </div>
                <div class='quantity-amount'> ${currentItem['qtr']['amount']}  pcs </div>
                <div class='row quantity-controller-row'>
                    <img class='col-5 quantity-amount-controller minus-btn' src='./assets/icons/svgs/minus_2.svg' id='${currentItem["foodName"]}-qtr'/>
                    <img class='col-5 quantity-amount-controller plus-btn' src='./assets/icons/svgs/plus_2.svg' id='${currentItem["foodName"]}-qtr'/>
                </div>
            </div>
            &nbsp; &nbsp; &nbsp;
        `
    }
    if(currentItem.hasOwnProperty('half')){
        quantityCartHTML += `
            <div class='col-4 quantity-col'>
                <div class='quantity-header'> Half </div>
                <div class='quantity-price'> ₹ ${currentItem['half']['price']} </div>
                <div class='quantity-amount'> ${currentItem['half']['amount']}  pcs </div>
                <div class='row quantity-controller-row'>
                    <img class='col-6 quantity-amount-controller minus-btn' src='./assets/icons/svgs/minus_2.svg' id='${currentItem["foodName"]}-half'/>
                    <img class='col-6 quantity-amount-controller plus-btn' src='./assets/icons/svgs/plus_2.svg' id='${currentItem["foodName"]}-half'/>
                </div>
            </div> &nbsp; &nbsp;
        `
    }
    if(currentItem.hasOwnProperty('full')){
        quantityCartHTML += `
            <div class='col-4 quantity-col'>
                <div class='quantity-header'> Full </div>
                <div class='quantity-price'> ₹ ${currentItem['full']['price']} </div>
                <div class='quantity-amount'> ${currentItem['full']['amount']}  pcs </div>
                <div class='row quantity-controller-row'>
                    <img class='col-6 quantity-amount-controller minus-btn' src='./assets/icons/svgs/minus_2.svg' id='${currentItem["foodName"]}-full'/>
                    <img class='col-6 quantity-amount-controller plus-btn' src='./assets/icons/svgs/plus_2.svg' id='${currentItem["foodName"]}-full'/>
                </div>
            </div>
        `
    }
    return quantityCartHTML
}





function load_shoppingCart(){
    let itemsCount = Object.keys(organisedCart).length;
    $('#cart-itemCount').text(`${itemsCount} Items`)

    if(itemsCount <= 0)         //In case of empty cart
        $('#cart-items-container').html(`
            <h4>You have no items in your cart Yet!</h4> <br />
            <a href='./menu.html'> <button class='btn btn-success'>View Menu</button> </a>
        `)
    else{
        let cartItemsHTML = '';
        let itemNames = Object.keys(organisedCart)
        for(let index=0; index < itemNames.length; index++){
            let currentItem = organisedCart[itemNames[index]]
            if(currentItem.hasOwnProperty('default')) //no quantity
            {
                let itemPrice = currentItem['default']['price']
                let currentItem_amount = currentItem['default']['amount']
                cartItemsHTML += `
                    <div class='row cart-item'>
                        <div class='col-6'> <img src='${currentItem['imagePath']}' class='cart-item-image' alt='No Image Available'> </div>
                        <div class='col-1'></div>
                        <div class='col-4'> 
                            <div class='cart-item-name'> ${currentItem['foodName']} </div> <br /> 
                            <div class='cart-item-price text-success'> ₹ ${itemPrice} </div> <br />
                            <div class='row'>
                                <div class='cart-item-amount col-5'> ${currentItem_amount} Pcs </div> <br /> 
                                <img class='col-6 amount-controller-btn minus-btn' src='./assets/icons/svgs/minus_2.svg' id='${currentItem["foodName"]}-default'/>
                               &nbsp; &nbsp;
                               <img class='col-6 amount-controller-btn plus-btn' src='./assets/icons/svgs/plus_2.svg' id='${currentItem["foodName"]}-default'/>
                            </div>
                        </div>
                    </div> <br />
                    <hr />
                    <br />
                    
                `;
            }else  //with quantity
            {
                cartItemsHTML += `
                    <div class='row cart-item'>
                        <div class='col-6'> <img src='${currentItem['imagePath']}' class='cart-item-image' alt='No Image Available'> </div>
                        <div class='col-4'> 
                            <div class='cart-item-name'> ${currentItem['foodName']} </div> <br /> 
                            <div class='row quantity-row'>
                                ${quantityDifferentiator(currentItem)}
                            </div> 
                            </div>
                        </div>
                    </div>
                    <hr />
                `;
            }
        }
        $('#cart-items-container').html(cartItemsHTML)
    }
}



function addItemAmount(btnID, sessionObj, operationType){
    let selected_itemName = btnID.split('-')[0]
    let selected_quantity = btnID.split('-')[1]

    let deleteIndices = [];

    for(let index=0; index < cartDetails.length; index++)
        if( (cartDetails[index]['name'] == selected_itemName) && (cartDetails[index]['quantity'] == selected_quantity) ){
            if(operationType == 'substract'){
                cartDetails[index]['amount']--;
                if(cartDetails[index]['amount'] <= 0)
                    cartDetails[index]['deleted'] = true;
            }
            else{
                cartDetails[index]['amount']++;
            }

            let itemPriceList = cartDetails[index]['priceList']
            let itemQuanity = cartDetails[index]['quantity'];
            console.log(sessionObj.fetchQuantityPrice(itemPriceList, itemQuanity))
            //console.log(sessionObj.fetchQuantityPrice(cartDetails[index]['priceList'], sessionObj.fetchQuantityPrice(cartDetails[index]['quantity'])) )
        }

    userDetails = sessionObj.load_userDetails(); 
    sessionObj.update_allDetails(userDetails, cartDetails)
    organisedCart = sessionObj.load_organizedCart(cartDetails);
    load_shoppingCart();
    updateOrderDetails();
}


function updateOrderDetails(){
    console.log(userDetails)
}



$(document).ready(function(){   
    let session = new Session();
    userDetails = session.load_userDetails();
    cartDetails = session.load_cartDetails();
    organisedCart = session.load_organizedCart(cartDetails);
    load_shoppingCart();
    updateOrderDetails();


    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    $('#sideBar').html(loadSidebarComponent());
    $('#sideBar').hide();


    $('#cart-items-container').on('click', '.minus-btn', function(){
        addItemAmount($(this).attr('id'), session, 'substract')
    })
    $('#cart-items-container').on('click', '.plus-btn', function(){
        addItemAmount($(this).attr('id'), session, 'add')
    })
  
})