/* querySelectorAll은 Array로 모든 태그를, querySelector는 첫번째 태그  */
const greetingForm = document.querySelector(".greeting-form"),
    greetingInput = greetingForm.querySelector('.input'),
    greetingText = document.querySelector('.greeting-text')

const emergeToDoForm = document.querySelector(".todo-form")

const CURRENT_USER = 'currentUser',
    CLASS_SHOWING = 'showing',
    CLASS_SHOWING_FADEIN = 'showing--fadein'

function saveName(text) {
    /* JSON형태, key-value값 */
    localStorage.setItem(CURRENT_USER, text);
}

function handleGreetingSubmit(event) {
    /* preventDefault
    event가 발생하면 default적으로 root에서, 즉 form에서 발생한다.
    form 이벤트의 default는 post처럼 다음 페이지로 넘어가려고 하는 것.
    이 새로고침하고 다음 어디론가 넘어가려는 성질을 막는 것이 preventDefault */
    event.preventDefault();
    // input의 value를 가져오기
    const currentValue = greetingInput.value;
    // 받아온 value를 색칠하자
    writeGreeting(currentValue)
    // 아직까지는 저장하지 않았으므로 새로고침하면 날라감
    saveName(currentValue)
}

// currentUser가 없을 때
function askForName() {
    // form을 나타나게 하고 사용자 이름을 입력받음
    greetingForm.classList.add(CLASS_SHOWING);
    /* form이 생겼긴 한데, submit할 때 아무런 변화가 없음
    즉 submit 이벤트 핸들러를 만들면 submit 이후의 일을 콘트롤 가능 */
    greetingForm.addEventListener('submit',handleGreetingSubmit)

}

// currentUser가 이미 있을 때
function writeGreeting(name) {
    /* 이름을 다시 받을 필요가 없으므로 form을 숨기고 
    text의 색을 바꾸자 */
    greetingForm.classList.remove(CLASS_SHOWING); /* input을 사라지게하고 greeting을 나오게 한다 */
    greetingText.classList.add(CLASS_SHOWING); /* 여기가 왜 서서히 나타나는게 안되지? */
    greetingText.classList.add(CLASS_SHOWING_FADEIN); /* 여기가 왜 서서히 나타나는게 안되지? */
    greetingText.innerText = `Welcome, ${name}!`

    /* Greeting 입력되었으면 emergeToDoForm 나타나게
    이걸 아래에 써놓으면 왜 안되지...? */
    emergeToDoForm.classList.add(CLASS_SHOWING);
}

/* 함수로 만든다음, 옆에 경고박스 나오게..? */

function loadName() {
    const currentUser = localStorage.getItem(CURRENT_USER)
    if (!currentUser) {
        askForName()
    } else {
        writeGreeting(currentUser)
        /* 여기에 나타나게 해야함 */
    }
}

function init() {
    loadName()
}
init()