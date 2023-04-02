

$(document).ready(function(){
    let session = new Session();
    userDetails = session.load_userDetails();
    cartDetails = session.load_cartDetails();

    $('header').html(loadHeaderComponent('./'));
    $('footer').html(loadFooterComponent());
    $('#sideBar').html(loadSidebarComponent());
    $('#sideBar').hide();


    $('#cancel-btn').click(function(){
        window.location.href = './delivery.html';
    });
})