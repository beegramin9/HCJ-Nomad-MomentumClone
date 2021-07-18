const alertSection = document.querySelector(".alert"),
    alertExitButton = alertSection.querySelector('.alert__close__button')

const MAX_LENGTH = 18

function countIfTextMoreThanMaxLength(text) {
    if(text.value.length > MAX_LENGTH)  {
        alertSection.classList.add(CLASS_SHOWING);
    } else {
        alertSection.classList.remove(CLASS_SHOWING);
    }
}


function handleAlertClose() {
    alertSection.classList.remove(CLASS_SHOWING);
}

function init() {
    alertExitButton.addEventListener('click', handleAlertClose);
}

init();