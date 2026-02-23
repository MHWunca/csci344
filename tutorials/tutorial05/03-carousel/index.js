let currentPosition = 0; //declares variable to store how many images into the carousel we are
let gap = 10; //size of gap between images, used to calculate how much to translate the images by when moving carousel
const slideWidth = 400; //width of images, used to calculate how much to translate the images by when moving carousel

function moveCarousel(direction) { //declares a function to move between the images in the carousel
    const items = document.querySelectorAll(".carousel-item"); //we fine and select the carousel

    if (direction == "forward") { //if we are moving forward... 
        if (currentPosition >= items.length - 2) { //we check if we are already showing the last 2 images
            return false; //if so, we can't move forwards, and return early
        }
        currentPosition++; //if not, we move forward by an image
    } else { //if we are moving backward... 
        if (currentPosition == 0) { //we check if we are already showing the first 2 images
            return false; //if so, we can't move backwards, and return early
        }
        currentPosition--; //if not, we move backward by an image
    }

    const offset = (slideWidth + gap) * currentPosition; //we calculate the offset for the images, which should be the width+gap of each image multiplied by the amount of images that we have moved

    for (const item of items) { //for each image...
        item.style.transform = `translateX(-${offset}px)`; //we set its position to be that calculated offset to the right from its origin
    }
}
