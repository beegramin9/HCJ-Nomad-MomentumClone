const body = document.querySelector('body')

function createImage() {
    const image = new Image();
    // image.src = "https://source.unsplash.com/random/1920x1080"
    image.src = "./public/image/background2.jpg"
    image.classList.add('bgImage')
    body.appendChild(image)
}
function init() {
    createImage()
}
init();