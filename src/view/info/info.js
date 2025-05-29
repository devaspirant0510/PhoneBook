import "./info.css";
import { loadData } from "../../lib/localstroageLib";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const data = loadData("data");
const person = data.find(item => item.id == id);

if (person) {
  document.getElementById("profile-pic").src = person.pic;
  document.getElementById("profile-name").textContent = person.name;
  document.getElementById("profile-group").textContent = person.group;
  document.getElementById("profile-phone").textContent = person.hp;
  document.getElementById("profile-email").textContent = person.email;
  console.log(person);
  console.log(person.pic);
  console.log(person.name);
  console.log(person.group);
  console.log(person.hp);
  console.log(person.email);
}


let menu = document.querySelector("#menu");
let menucon = document.querySelector("#menu-con");

// 메뉴 버튼 클릭 시 토글
menu.addEventListener("click", (e) => {
  e.stopPropagation(); // 다른 클릭 이벤트에 영향을 주지 않기 위해 버블링 방지
  console.log(menucon.style.display);

  if (menucon.style.display === "block") {
    menucon.style.display = "none";
  } else {
    menucon.style.display = "block";
  }
});

// 문서 전체 클릭 시 메뉴 숨기기
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menucon.contains(e.target)) {
    menucon.style.display = "none";
  }
});

let back = document.querySelector("#back")

back.addEventListener("click", () => {
  window.location.href = "./list.html";
})
