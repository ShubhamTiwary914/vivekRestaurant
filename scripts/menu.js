let selectedMenu = 'starters';
let selectedCategory = 'veg';
let currentMenuItems = []; 
let currentMenuHasCategory = true;



//change body of menuItems after filtering from updateSelectedmenu
function update_menuBody(){
    let menu_itemsList_HTML = ``;
    for(let index=0; index < currentMenuItems.length; index++){
        let item_imagePath = parse_menuImageSource(currentMenuItems[index])
        let itemName = `${currentMenuItems[index]['name']} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;(x${currentMenuItems[index]['amount']})`;
        if(currentMenuItems[index]['amount'] <= 1)
            itemName = `${currentMenuItems[index]['name']}`;
        let itemPrices = parse_menuItemPrices(currentMenuItems[index]['price'])

        menu_itemsList_HTML += `
            <div class='col-5 menu-item-card g-5'>
                <div class="card">
                    <img src="${item_imagePath}" class="card-img-top" alt="Image Not Available...">
                    <div class="card-body">
                        <h3 class="card-title"> ${itemName} </h3> <br /> <hr /> <br />
                        <p class="card-text">
                            ${itemPrices}
                        </p> <br /> 
                        <div class='row'>
                            <div class='col-4'>
                                <button class="btn order-btn" id="delivery-${index}">Make Order</button>
                            </div>
                            <div class='col-2'></div>
                            <div class='col-5'>
                                <button class="btn order-btn" id="dine-${index}">Prepare for Takeaway</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='col-1'></div>
        `;
    }
    $('#menu-itemsList').html(menu_itemsList_HTML);
}


//filter menuItemsArray content depending on what has been selected
function updateSelectedMenu(){
    currentMenuHasCategory = menuList[selectedMenu]['hasCategory']
    if(menuList[selectedMenu]['hasCategory']){  
        $('#category-container').html(menuCategorySelectorHTML)
        $(`#category-${selectedCategory}`).addClass('selected-category')
        currentMenuItems = menuList[selectedMenu]['items'][selectedCategory]
    }
    else{
        let categoryParsed = selectedMenu[0].toUpperCase() + selectedMenu.slice(1, selectedMenu.length)
        $('#category-container').html(`<br /> <br /> <br /> ${categoryParsed} has no Categories to choose from!`)
        currentMenuItems = menuList[selectedMenu]['items']['itemList']
    }
    update_menuBody();
}


//control events for selection of items in the selection-menu header
function controlMenuSelection(clickedMenu){
    $(`#${selectedMenu}-box`).removeClass('selected-menu')
    $(`#${clickedMenu}-box`).addClass('selected-menu')
    selectedMenu = clickedMenu;
    $('#category-menu input').attr('placeholder',`Search in ${selectedMenu}..`)
}

function controlMenuCategory(clickedCategory){
    $(`#category-${selectedCategory}`).removeClass('selected-category')
    $(`#category-${clickedCategory}`).addClass('selected-category')
    selectedCategory = clickedCategory;
}


//parses image source from itemName : example: Chicken Soup => chicken_soup and returns a path to that image source
function parse_menuImageSource(itemObject){
    let itemNameArray = itemObject['name'].split(' ');
    let parsedItemName = itemNameArray.map((itemName)=> itemName[0].toLowerCase() + itemName.slice(1, itemName.length)).join('_')
    if(currentMenuHasCategory)
        return `./assets/menu/${selectedMenu}/${selectedCategory}/${parsedItemName}.${itemObject['ext']}`;
    return `./assets/menu/${selectedMenu}/${parsedItemName}.${itemObject['ext']}`;
}


function parse_menuItemPrices(itemPrice){
    let itemPriceRanges = itemPrice.split('/').length; 
    switch(itemPriceRanges) {
        case 1:
            return `<h4> Price:  <span class='float-end item-price'>${itemPrice} </span> </h4>`;
        case 2:
            return `<h4> Price (Half / Full): <span class='float-end item-price'> ${itemPrice} </span> </h4>`;
        case 3:
            return `<h4> Price (Qtr / Half / Full): <span class='float-end item-price'> ${itemPrice} </span> </h4>`;
      }
}



function loadOrder_deliveryOption(orderID){
    let orderIndex = parseInt(orderID.split('-')[1]);
    let selectedItem = currentMenuItems[orderIndex]
    selectedItem['imagePath']= parse_menuImageSource(currentMenuItems[orderIndex])
    selectedItem['category'] = `${selectedMenu}-${selectedCategory}`;
    selectedItem['type'] = orderID.split('-')[0]
    sessionStorage.setItem('orderDetails', JSON.stringify(selectedItem));
    window.location.href ='./delivery.html';
}




$(document).ready(function(){
    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    $('#sideBar').html(loadSidebarComponent());
    $('#sideBar').hide();
    controlMenuSelection('starters');
    controlMenuCategory('veg');
    updateSelectedMenu();

    $('.menu-header-box').click(function(){
        let clickedMenu = $(this).attr('id').split('-')[0]
        controlMenuSelection(clickedMenu);
        updateSelectedMenu()
    })


    $('#category-container').on('click', '.category-item',function(){
        let clickedCategory = $(this).attr('id').split('-')[1]
        controlMenuCategory(clickedCategory);
        updateSelectedMenu()
    })

    $('#menu-itemsList').on('click', '.order-btn', function(){
        loadOrder_deliveryOption($(this).attr('id'));
    })
})