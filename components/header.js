function loadHeaderComponent(rootPath){
    return `
    <div class='container-fluid'>
        <div class='row'>
            <div class='col-1'></div>
            <div class='col-2'>
                <img src='./assets/icons/logo.png' id='logo-image' class='animate__animated animate__bounceInDown'>
            </div>
            <div class='col-3 white-text animate__animated animate__bounceInDown' id='header-title'>
                Vivek's Restaurant
            </div>
            <div class='col-5'></div>
            <div class='col-1 white-text animate__animated animate__bounceInDown'>
               <img src='./${rootPath}/assets/icons/svgs/barsWhite.png' id='header-menu'>
            </div>
        </div>
    </div>`;
}


//