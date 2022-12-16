const clock = document.querySelector("h2#clock");
// 시계로 사용할 태그를 선택해서 할당


function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0") ;
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`
}

// 숫자가 한자릿수일땐 0이 앞에 붙은 시계를 padStart를 이용해 구현

getClock();

// setInterval이 실행되기전에도 시계가 표시되도록 getclock을 호출해둠

setInterval(getClock, 1000)

// 1초간격으로 getClock을 호출해줌 setInterval을 밀리초단위로 수행하기때문에 1000이면 1초

