let menubarOpen = false;
let menuIcons = {
    "hamburger": "assets/icons/svgs/bars.svg",
    "xmark": "assets/icons/svgs/xmark-solid.png"
}
let pathTo_rootDirectory = './';


function loadHeaderComponent(rootPath){
    pathTo_rootDirectory = rootPath;
    return `
    <div class='container-fluid'>
        <div class='row'>
            <div class='col-1'></div>
            <div class='col-2'>
                <img src='./assets/icons/logo.png' id='logo-image' class='animate__animated animate__bounceInDown'>
            </div>
            <div class='col-3 animate__animated animate__bounceInDown' id='header-title'>
                Vivek's Restaurant
            </div>
            <div class='col-5'></div>
            <div class='col-1 animate__animated animate__bounceInDown'>
               <img src='./${rootPath}/${menuIcons["hamburger"]}' id='header-menu'>
            </div>
        </div>
    </div>`;
}





function loadHeaderMenu(){
    const menuBar_animation = (menubarOpen, endAnimation = false)=>{
        if(endAnimation){
            $('#header-menu').removeClass('animate__animated animate__rotateOut')
            $('#header-menu').addClass('animate__animated animate__rotateIn')
            if(menubarOpen){
                $('#header-menu').attr('src', `./${pathTo_rootDirectory}/${menuIcons["xmark"]}`)
                $('#sideBar').show()
                $('#sideBar').addClass('animate__fadeInRight')
                $('#sideBar').removeClass('animate__fadeOutRight')
            }else{
                $('#header-menu').attr('src', `./${pathTo_rootDirectory}/${menuIcons["hamburger"]}`)
                $('#sideBar').removeClass('animate__fadeInRight')
                $('#sideBar').addClass('animate__fadeOutRight')
                setTimeout(()=>{$('#sideBar').hide()}, 500)
            }
            return;
        }
        $('#header-menu').removeClass('animate__animated animate__rotateIn')
        $('#header-menu').addClass('animate__animated animate__rotateOut')
        setTimeout(()=>{
            menuBar_animation(menubarOpen, true)
        }, 100)
    }

    menubarOpen = !menubarOpen;
    menuBar_animation(menubarOpen);
}


$(document).ready(function(){
    $('header').on('click', '#header-menu', function(){
        loadHeaderMenu();
    })

    $('header').on('click', '#header-title, #logo-image', function(){
        window.location.href = './index.html';
    })
})