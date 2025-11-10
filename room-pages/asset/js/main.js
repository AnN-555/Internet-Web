// Active 
const activeItem = document.querySelectorAll('.header__main-nav .contents li')

activeItem.forEach((item, index) => {
    item.addEventListener(('click'), () => {
        activeItem.forEach((item) => {
            item.classList.remove('active')
        })
        
        activeItem[index].classList.add('active')
    })
})






