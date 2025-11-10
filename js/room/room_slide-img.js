// Slide 

 document.addEventListener('DOMContentLoaded', () => {
            const imageWrapper = document.querySelector('.slider-wrapper');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            let images = document.querySelectorAll('.slider-wrapper img');
            
            if (images.length <= 1) return;

            
            const IMAGE_WIDTH = 1000;
            const GAP = 40;
            const CLONES_COUNT = 2; 
            let currentIndex = CLONES_COUNT; 
            let isTransitioning = false;

            // coppy ảnh đầu và cuối
            for (let i = 0; i < CLONES_COUNT; i++) {
                const clone = images[images.length - 1 - i].cloneNode(true);
                imageWrapper.insertBefore(clone, imageWrapper.firstChild);
            }
            
            for (let i = 0; i < CLONES_COUNT; i++) {
                const clone = images[i].cloneNode(true);
                imageWrapper.appendChild(clone);
            }
            
            // update list ảnh
            images = document.querySelectorAll('.slider-wrapper img');

            // ví trí ban đầu
            function setInitialPosition() {
                const containerWidth = document.querySelector('.slider-container').offsetWidth;
                const initialOffset = (containerWidth - IMAGE_WIDTH) / 2;
                const offset = initialOffset - currentIndex * (IMAGE_WIDTH + GAP);
                imageWrapper.style.transform = `translateX(${offset}px)`;
            }
            
            setInitialPosition();
            
            // settimeout
            setTimeout(() => {
                imageWrapper.style.transition = 'transform 0.8s ease';
            }, 100);


            // slide
            function slide(direction) {
                if (isTransitioning) return;
                isTransitioning = true;
                
                currentIndex += direction;
                
                const containerWidth = document.querySelector('.slider-container').offsetWidth;
                const initialOffset = (containerWidth - IMAGE_WIDTH) / 2;
                const offset = initialOffset - currentIndex * (IMAGE_WIDTH + GAP);
                imageWrapper.style.transform = `translateX(${offset}px)`;
            }

            // xử lý chuyển động
            imageWrapper.addEventListener('transitionend', () => {
                isTransitioning = false;
                
                if (currentIndex >= images.length - CLONES_COUNT) {
                    currentIndex = CLONES_COUNT; // 
                    imageWrapper.style.transition = 'none'; 
                    setInitialPosition(); 
                    setTimeout(() => { 
                        imageWrapper.style.transition = 'transform 0.8s  ease';
                    }, 100);
                }
                
                if (currentIndex < CLONES_COUNT) {
                    currentIndex = images.length - (CLONES_COUNT * 2) + (currentIndex % CLONES_COUNT);
                    imageWrapper.style.transition = 'none';
                    setInitialPosition();
                    setTimeout(() => {
                        imageWrapper.style.transition = 'transform 0.8s ease';
                    }, 100);
                }
            });
          
            nextBtn.addEventListener('click', () => slide(1));
            prevBtn.addEventListener('click', () => slide(-1));
            window.addEventListener('resize', setInitialPosition);
            
        });
