const images = ["0.jpeg", "1.jpeg", "2.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `asset/${chosenImage}`;

document.body.appendChild(bgImage);

/*
1. 원하는 이미지의 이름을 각각의 요소로 가지는 배열을 선언해서 images에 할당해줌


2. Math.random은 0~1까지의 랜덤한 값을 리턴함. 
Math.floor()는 소수점을 무조건 버려주는 메서드
즉 images의 인덱스를 랜덤하게 골라주는 역할을 수행하게 되는 변수

3. img태그를 생성해줌

4.img태그의 src에 접근해서 사진의 경로를 지정해주는데
chosenImage는 images[0] ~ [2]까지의 값이 랜덤하게 등장하기때문에
여러 사진이 돌아가면서 등장하는 결과를 만듬

5.body태그의 마지막 자식요소로 bgImage를 넣어줌.
*/