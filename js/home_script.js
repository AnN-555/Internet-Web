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
})

//change images
// Array of image paths from your folder
const images = [
  "images/homepage/banner_large/banner1.png",
  "images/homepage/banner_large/banner2.png",
  "images/homepage/banner_large/banner3.png",
  "images/homepage/banner_large/banner4.png",
  "images/homepage/banner_large/banner5.png",
  "images/homepage/banner_large/banner5.png",
];

let index = 1; // start from second image
const slideshow = document.getElementById("slideshow");

function changeImage() {
  // slide current image out to the left
  slideshow.style.left = "-100%";

  // after animation ends, swap src and reset position off-screen right
  setTimeout(() => {
    slideshow.src = images[index];
    slideshow.style.left = "0%"; // move new image off-screen right

    // force reflow so transition applies
    void slideshow.offsetWidth;

    // slide new image into view
    slideshow.style.left = "0";

    index = (index + 1) % images.length;
    if(4==index) index = 0;
  }, 600); // match transition duration
}

// change every 3 seconds
setInterval(changeImage, 2000);