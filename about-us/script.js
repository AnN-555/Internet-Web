document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const close = document.getElementById('close');
    const menuList = document.querySelector('.menu-list');
    const nav = document.querySelector('.nav');
    const body = document.body;

    //Hiển thị hamburger menu
    hamburger.addEventListener('click', function () {
        hamburger.style.display = 'none';
        close.style.display = 'block';
        menuList.classList.add('menu-open');
        body.style.overflow = 'hidden'; //Ngăn scroll khi menu mở
    })

    //Ẩn hamburger menu
    close.addEventListener('click', function(){
        close.style.display = 'none';
        hamburger.style.display = ' block';
        menuList.classList.remove('menu-open')
        body.style.overflow = 'auto'; //Scroll lại
    })
})
