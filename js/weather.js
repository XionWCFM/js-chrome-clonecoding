const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
// weather안에 있는 span을 가져옴

const API_KEY = "42742d5f9071a444209def44eea5793b";
// API호출에 사용할 키

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].description} / ${data.main.temp}`;
    });
}
/* 
latitude는 소수로 표현된 위도값
longitude는 소수로 표현된 경도값을 받아옵니다.
그리고 wetherAPI에 key와 위도경도값을 받아서 할당해준뒤

fetch()를 사용합니다.
fetch()는 HTTP response 객체를 래핑한 promise 객체를 반환하는 함수입니다.
then()은 fetch의 후속처리 메서드입니다. then을 이용해 resolve한 객체를 전달 받을 수 있습니다.

위 코드에서 fetch()는 url 변수에 담긴 원격 API에 있는 데이터를 GET 방식으로 가져오는 역할을 수행합니다.
response 객체는 json()메서드를 제공하고 이 메서드를 호출하면 응답객체로부터 json형태의 데이터를 자바스크립트 객체로 변환해 얻습니다.

그 다음 두번째 then()에서는 첫번쨰 then()으로 얻은 객체 데이터에 접근하여
데이터를 활용해 코드를 작성합니다.

city의 innerText에 data객체의 name키의 밸류를 할당해주고
weather의 innerText에 data객체의 weather[0]의 description과 main.temp의 밸류를 받아와서 표시해주는 코드입니다.



 */

function onGeoError() {
  alert("Can't find you. No weather for you.");
}
//에러 상황시 실행할 함수

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
/* chrome50버전 이후로 geolocation은 localhost와 https환경에서만 사용가능
 getCurrentPosition메서드는 첫번째 인자로 gps 위치 조회 동의시 실행할 함수
 두번째 인자로 에러시 실행할 함수 세번쨰는 옵션을 받습니다.
 
 */