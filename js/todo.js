const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

/*
쿼리셀렉터, 겟엘리먼트로 각 클래스명,아이디를 받아와서 변수에 할당함
일일히 쓰면 가독성이 안좋아지기도 쉽고 실수할수도 있으니까요
*/

const TODOS_KEY = "todos";
let toDos = [];

/*
toDos는 값이 변해야하므로 let 선언 
TODOS_KEY는 반복적으로 사용하는 문자열이기 때문에 변수로 선언
*/

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


/*
localStorage에 키 밸류 형태로 toDos배열을 저장하는 것
but localStorage는 문자열 형태로만 밸류를 저장할 수 있어서
JSON.stringify()를 통해 문자열로 만들어주는 작업을 하는 것

localStorage에 ToDos 배열을 저장하는 것이 목적
why? 우리는 새로고침을 해도 todo 리스트가 남아있길 원하니까

*/

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id != li.id);
    saveToDos();
  }

/*
투두리스트를 만들었는데 우리는 잘못만든 투두리스트를 지우고싶을 수 있음
그러나 우리는 같은 함수에 넣어서 todo를 만들기때문에 모든 todo리스트가
같은 이름으로 생성되어서 특정할 수 없다는 문제를 가지고있음

이를 해결하기위해 event.target을 이용함.
event.target은 이벤트가 발생한 요소를 반환해줌
만약 어떤 버튼을 눌러서 이벤트가 발생한다면 그 버튼이 바로 event.target인것

li에 event.target.parentElement를 할당하니까
li는 event.target(여기선 버튼)의 부모요소 즉 이벤트가 발생한 버튼의 부모요소가 할당됨
그 다음 li를 remove()해주면 삭제하고자하는 todo를 삭제할 수 있어지는 것

filter()를 통해 toDo를 순회하면서 toDos를
li.id가 아닌 요소들로 구성된 새로운 배열로 만들어주고
saveToDos()를 호출시켜서 투두리스트의 현황을 최신화시켜줌

parseInt(li.id)를 하고 엄격한 비교를 통해서 필터링해줄수도있지만
자바스크립트의 느슨한 비교를 이용해서 필터를 해도 같은 결과를 반환함

*/


function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

/*
    preventDefault()는 어떤 이벤트를 명시적으로 처리하지 않은 경우
    해당 이벤트에 대한 기본 동작을 실행하지 않도록 하는 메서드임

    즉 어떤 이벤트가 원래 기본으로 동작하는 것을 막아주고
    newTodo에 toDoInput.value를 할당시켜줌
    그리고 toDoInput.value = ""를 통해 toDoInput을 초기화시켜주고 다음 입력을 받을 수 있게함
    
    newTodoObj라는 이름으로 오브젝트를 선언하고 그 안에
    text : newTodo를 담아주고
    id는 Date.now()를 담아줌

    Date.now()란? 1970년1월1일0시0분0초부터 현재까지 경과한 밀리 초를 반환해줌
    밀리초의 시간동안 투두를 한번 이상 만들지 못할테니까
    아이디가 각각 고유한 값을 가지게 되는 효과를 얻을 수 있음

    그 뒤 미리 선언해두었던 toDos 배열에 newTodoObj를 push해주고
    paintToDo(newTodoObj)를 매개변수로 넣어서 호출하며
    saveToDos()를 호출함.
*/

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
  
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
  }
  
  /*
      li에 li태그를 만들어주는 코드를 할당해줌
      li의 id에 newTodo.id를 할당시켜줌
      아까 paintToDo의 매개변수로 newTodoObj를 할당해줬음
      그러나 여기서 매개변수는 newTodo라는 이름으로 되어있기때문에
      newTodo 객체에 접근해서 newTodo.id의 밸류를 li.id에 할당해주는 것임
      
      그 뒤 span을 만들어주는 변수를 만들어주고
      span의 안쪽텍스트에 newTodo.text의 밸류값이 할당되도록 해줌

      그리고 버튼을 만들어준 뒤
      버튼의 innerText에 "X"를 할당시켜주고

      만약 이 버튼이 클릭 이벤트가 발생할 경우 deleteToDo 함수를 실행하는 코드를 작성

      appendChild는 특정 부모의 자식요소 중 마지막 자식으로 붙여주는 메서드임
      li의 자식요소로 span,button을 넣어주고
      toDoList의 자식요소로 li를 집어넣어주는 코드임


  */
  
  
toDoForm.addEventListener("submit", handleToDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);

/*
  toDoForm의 submit 이벤트가 발생하면
  handleToDoSubmit 함수를 실행시키는 코드

  savedToDos 에 localStorage에서 TODOS_KEY키를 키로 가지고있는 밸류를 가져와서 할당

*/

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

/*
    savedToDos에 값이 없을 수 있음 그런 경우 null이 반환되는데
    만약 null이 아닌 경우엔 
    parsedToDos 변수에 JSON.parse(savedToDos)를 해줌

    JSON.parse()는 제이슨문자열의 구문을 분석하고
    그결과에서 객체,배열,불린값 등을 변환해서 반환시켜줌

    JSON.parse()는 reviver를 추가로 매개변수로 받아서
    특정값은 변환하고 특정값은 그대로 두는 식으로 활용할수도있음

    toDos에 배열로 변환한 값을 할당시켜주고
    parsedToDos의 모든 요소에 paintToDo를 실행시켜줌
    이 forEach 과정을 통해서 우리는 새로고침을해도
    여전히 유지되는 투두리스트를 만들 수 있음


*/