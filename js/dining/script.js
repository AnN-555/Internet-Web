document.addEventListener('DOMContentLoaded', function(){
    const hamburger = document.getElementById('hamburger');
    const close = document.getElementById('close');
    const menuList = document.querySelector('.menu-list')
    const body = document.body;

    //Hiển thị hamburger menu
    hamburger.addEventListener('click', function(){
        hamburger.style.display = 'none';
        close.style.display = 'block';
        menuList.classList.add('menu-open');
        body.style.overflow = 'hidden';
    })

    //Ẩn hamburger menu
    close.addEventListener('click', function(){
        close.style.display = 'none';
        hamburger.style.display = '';
        menuList.classList.remove('menu-open');
        body.style.overflow = 'auto';
    })

    const breakpoint = 900;
    const isSmallScreen = window.innerWidth >= breakpoint;
    
    if (isSmallScreen){
        close.addEventListener('resize', function(){
        close.style.display = 'none';
    })
    }
    
})