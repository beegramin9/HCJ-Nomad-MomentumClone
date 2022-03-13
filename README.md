## Project Status
![Generic badge](https://img.shields.io/badge/build-passing-green.svg)
<br/> [Check out the actual website!](https://beegramin9.github.io/JavaScript-MomentumClone/) try!

## Overview
![Momentum-gif](https://user-images.githubusercontent.com/58083434/126057509-6426d913-ca34-4ba5-9e86-811d2b76c9f3.gif)


## Technology Stack
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>&nbsp;
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>

## Outline
&nbsp;This project started from a plain CSS-less todo-list tutorial, improved after to be a Momentum Clone. The most well-marked new feature is the separated pending and finished list. where todos are transferable onto another section, data persistence supported by Local Storage. Other new features are Alert, Weather and background image API which will be reusable at any needed time, name form and clock with cool CSS.

built reponsive web with @media
covers all design with CSS3, no other framework such as Bootstrap used
<br/><br/>
&nbsp; 
CRUD 기능을 구현한 스태틱 Todo-list 웹서비스입니다. 즉, 서버와 데이터베이스를 구현하지 않았는데 그 대신 LocalStorage로 Data persistency를 구현했습니다. Pending과 Finish 섹션을 따로 두고 두 섹션 간 데이터가 자유롭게 이동할 수 있게 만들어서, 기본적인 CRUD 기능에서 한층 더 복잡한 알고리즘과 설계를 가지고 있습니다.


## Main Feature Code
- localStorage <br/>
> (/pending_finish.js) <br/>
> localStorage로 Data Persistency 사용 <br/>
```js
const LOADSAVE = {
    // Pending Section
    saveToDos : function (toDos) {
        localStorage.setItem('toDos' ,JSON.stringify(toDos))
    },
    loadToDos : function () {
        const currentToDos = localStorage.getItem('toDos')
        if (currentToDos) {
            const parsedToDos = JSON.parse(currentToDos)
            parsedToDos.forEach( toDo => createToDo(toDo.text) )
        }
    },
    // Finished Section
    saveFinToDos : function (finToDos) {
        localStorage.setItem('finToDos' ,JSON.stringify(finToDos))
    },

    loadFinToDos : function () {
        const currentFinToDos = localStorage.getItem('finToDos')
        if (currentFinToDos) {
            const parsedFinToDos = JSON.parse(currentFinToDos)
            parsedFinToDos.forEach( finToDo => createFinToDo(finToDo.text) )
        }
    }
}
```
- Pending 섹션 Create, Delete 구현 <br/>
> (/pending_finish.js) <br/>
```js
const pending = document.querySelector(".pending")
const finished = document.querySelector(".finished")

// Create
const createToDo = function (text) { // text: form에서 입력받은 값
    const finBtn = document.createElement('button'); // Finish 버튼
    finBtn.innerHTML = "&#10004"; //✅
    finBtn.addEventListener('click', finishTodo);
    
    const delBtn = document.createElement('button'); // Delete 버튼
    delBtn.innerHTML = "❌";
    delBtn.addEventListener('click', deleteToDo);
    
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(finBtn);
    li.appendChild(delBtn);
    pending.appendChild(li);

    const toDoObj = {
        text : text,
        id : toDos.length + 1 // 요소가 하나씩 더 들어올 때마다 id를 증가시킬 수 있는 좋은 로직
    }
    li.id = toDos.length + 1; // 지울 때 어떤 li를 지워야 할 지도 알아야 하니까 li에도 id가 필요하다
    

    toDos.push(toDoObj);
    LOADSAVE.saveToDos(toDos); // LocalStorage에 저장
}

// Delete 
const deleteToDo = function (event) {

    const btn = event.target;
    const li = btn.parentNode;

    pending.removeChild(li) // Step 1.HTML에서 지우기
    const deletedTodos = toDos.filter( toDo => { // Step 2. ToDos Array Update
        return toDo.id !== parseInt(li.id) // 방금 삭제된 toDo id (=parseInt(li.id) 제외 모든 toDo를 리턴한다
    })
    toDos = deletedTodos

    LOADSAVE.saveToDos(toDos); Step 3. LocalStorage에 저장
}
```
- Pending 섹션 <=> Finish 섹션 데이터 transfer <br/>
> (/pending_finish.js) <br/>

```js
const reTodo = function (event) {
    const btn = event.target;  // Step 1.HTML에서 지우기
    const li = btn.parentNode;
    finished.removeChild(li)\

    const deletedFinTodos = finToDos.filter( finToDo => { 
        return finToDo.id !== parseInt(li.id)
    })
    finToDos = deletedFinTodos
    
    LOADSAVE.saveFinToDos(finToDos); // Step 3. LocalStorage에서 Delete
    
    const finText = li.querySelector('span').innerText // 4. pending 섹션으로 다시 돌려 놓기
    createToDo(finText);
}

```
