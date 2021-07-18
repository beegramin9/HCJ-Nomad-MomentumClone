const toDoForm = document.querySelector(".todo-form"),
    toDoInput = toDoForm.querySelector(".todo-input"),
    pending = document.querySelector(".pending"),
    finished = document.querySelector(".finished");

let toDos = [];
let finToDos = [];

const LOADSAVE = {
    saveToDos : function (toDos) {
        // localStorage.setItem(TODOS_LS ,toDos)
        /* 위 처럼 object로는 localStorage에 저장할 수 없다. string만 가능함 
        예를 들어 'Hello':true 를 주려고 해도 직접 입력하면 boolean이 아닌
        string true가 나온다. */
        /* 그래서 JSON.stringfy(object)로 string으로 만든 후 저장해야함 */
        localStorage.setItem('toDos' ,JSON.stringify(toDos))
        //console.log('저장될떄',toDos);
    },
    loadToDos : function () {
        const currentToDos = localStorage.getItem('toDos')
        if (currentToDos) {
            // console.log('불러올때',currentToDos);
            const parsedToDos = JSON.parse(currentToDos)
            parsedToDos.forEach( (toDo) => createToDo(toDo.text) )
        }
    },
    saveFinToDos : function (finToDos) {
        localStorage.setItem('finToDos' ,JSON.stringify(finToDos))
    },
    /* 밑으로 하게되면 똑같이 li, span부터 다시 만들어야 함 */
    loadFinToDos : function () {
        const currentFinToDos = localStorage.getItem('finToDos')
        if (currentFinToDos) {
            const parsedFinToDos = JSON.parse(currentFinToDos)
            parsedFinToDos.forEach( (finToDo) => createFinToDo(finToDo.text) )
        }
    }
}
/* fintodo가 어레이가 아니고 다르게 들어감 */


const finishTodo = function (event) {
    /* 여기서 버튼 지워야 함 */

    const btn = event.target;
    const li = btn.parentNode;
    pending.removeChild(li)

    /* 일단 지우기 */
    const deletedTodos = toDos.filter( toDo => {
 
        return toDo.id !== parseInt(li.id)
    })
    toDos = deletedTodos
    LOADSAVE.saveToDos(toDos);
    /* finTodo에 있는게 자꾸 todo에 들어감  */
    /* 삭제하고 저장해야 됨. 안그럼 그 전께 계속 살아나서 계속 4개만 남음 
    localStorage에서도 사라졌네. 이거 어디서 했지? */
    /* todo에서 없어진게 다시 들어간다. todo가 저장이 안됐다 */
    /* 그리고 createFinTodos를 불러오기 */
    /* const finId = li.id */
    const finText = li.querySelector('span').innerText
    // console.log(finText);
    /* 이 함수를 인식하지 못함. 왜? */
    createFinToDo(finText);
}
const deleteToDo = function (event) {
    const btn = event.target;
    const li = btn.parentNode;
    /* HTML에서 지우기 */
    pending.removeChild(li)
    const deletedTodos = toDos.filter( toDo => {
        /* 지운 놈 제외하고 남아있는 놈의 id와 다르면 가져와라
        == 방금 지운 놈만 가져와라
        toDo의 id는 int, li의 id는 string */
        return toDo.id !== parseInt(li.id)
    })
    toDos = deletedTodos
    /* 삭제하고 저장해야 됨. 안그럼 그 전께 계속 살아나서 계속 4개만 남음 
    localStorage에서도 사라졌네. 이거 어디서 했지? */
    LOADSAVE.saveToDos(toDos);
    /* 사라지긴 하는데, 눌를 때 바로 안되고 새로고침할때 됨
    왜 그런가? */
}
const deleteFinToDo = function (event) {
    const btn = event.target;
    const li = btn.parentNode;
    /* HTML에서 지우기 */
    finished.removeChild(li)
    const deletedFinTodos = finToDos.filter( finToDo => {
        /* 지운 놈 제외하고 남아있는 놈의 id와 다르면 가져와라
        == 방금 지운 놈만 가져와라
        toDo의 id는 int, li의 id는 string */
        return finToDo.id !== parseInt(li.id)
    })
    finToDos = deletedFinTodos
    /* 삭제하고 저장해야 됨. 안그럼 그 전께 계속 살아나서 계속 4개만 남음 
    localStorage에서도 사라졌네. 이거 어디서 했지? */
    LOADSAVE.saveFinToDos(finToDos);
    /* 사라지긴 하는데, 눌를 때 바로 안되고 새로고침할때 됨
    왜 그런가? */
}
const reTodo = function (event) {
    /* HTML에서 없애기 */
    const btn = event.target;
    const li = btn.parentNode;
    finished.removeChild(li)
    /* 로컬스토리지에서 없애기 */
    const deletedFinTodos = finToDos.filter( finToDo => {
        return finToDo.id !== parseInt(li.id)
    })
    finToDos = deletedFinTodos
    LOADSAVE.saveFinToDos(finToDos);
    /* pending에 다시 돌려 놓기 */
    // 이렇게 하면 안됨 pending.appendChild(li)
    /* 펜딩에서 피니시할때처럼 정보를 받아온다음 
    다시 create해줘야 버튼도 바뀜 */
    const finText = li.querySelector('span').innerText
    /* 이 함수를 인식하지 못함. 왜? */
    createToDo(finText);
}
const createToDo = function (text) {
    const finBtn = document.createElement('button');
    finBtn.innerHTML = "&#10004"; // 체크이모티콘
    finBtn.addEventListener('click', finishTodo);
    const delBtn = document.createElement('button');
    delBtn.innerHTML = "❌";
    delBtn.addEventListener('click', deleteToDo);
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(finBtn);
    li.appendChild(delBtn);
    pending.appendChild(li);
    /* todo에서 없어진게 다시 들어간다. todo가 저장이 안됐다 */
    const toDoObj = {
        text : text,
        // 요소가 하나씩 더 들어올 때마다 id를 증가시킬 수 있는 좋은 로직
        id : toDos.length + 1
    }
    /* 지울 때 어떤 li를 지워야 할 지도 알아야 하니까
    li에도 id를 줘야 한다. */
    li.id = toDos.length + 1;

    toDos.push(toDoObj);
    LOADSAVE.saveToDos(toDos);
    /* 아 loadFIn일때도 toDos에 저장해버리니까 생기는 문제였군....
    이거를 경우를 나눠서야해되나? todos일떄랑 아닐때랑?
    어케 경우를 나누지...?
     */
}
const createFinToDo = (text) => {
    const reBtn = document.createElement('button');
    reBtn.innerHTML = "<<";
    reBtn.addEventListener('click', reTodo);
    const delBtn = document.createElement('button');
    delBtn.innerHTML = "❌";
    delBtn.addEventListener('click', deleteFinToDo);
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(reBtn);
    li.appendChild(delBtn);
    
    finished.appendChild(li);
    /* local에서
    todos에선 빼고 finTodos에 넣어줘야함 */
    const finToDosObj = {
        text : text,
        // 요소가 하나씩 더 들어올 때마다 id를 증가시킬 수 있는 좋은 로직
        id : finToDos.length + 1
    }
    li.id = finToDos.length + 1; 
    finToDos.push(finToDosObj);
    LOADSAVE.saveFinToDos(finToDos);
    
    /* 로컬에선 빠짐, 근데 안 없어짐 */
    /* 아마 delete도 하나 만들어야할ㄷ스수정해야할듯. 리스트를 파라미터로 받자 */
    /* 화면엔 안들어감. 수정필요 */
}


/* 이제 redo만 하면 돼!!! */



/* 원래는 handleSubmit이었는데, 똑같은 함수가 greeting.js에서도 있었어서
오류 발생 */
const handleToDoSubmit = (event) => {
    event.preventDefault();
    const currentValue = toDoInput.value;

    createToDo(currentValue)
    /* 새로운 todo가 입력되면 input창 새로고침 */
    toDoInput.value = ""

};


/* 삭제/제거 버튼에서도 해야함 */

function init() {
    // loadName()
    LOADSAVE.loadToDos()
    LOADSAVE.loadFinToDos()
    /* 불러왔을 때는 없어진상태로 잘 되는데
    불러오고 나서 다시 저장을 하네...? */
    toDoForm.addEventListener("submit", handleToDoSubmit);
}
/* 버튼에서 한번 */

init();