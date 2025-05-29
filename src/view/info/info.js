import "./info.css";
//  localStorage 라이브러리와 ConfirmModal 라이브러리를 임포트합니다.
import { loadData, deleteDataById } from "../../lib/localstroageLib";
import { showConfirm } from "../../components/ConfirmModal";

//  URL 쿼리 파라미터에서 'id' 값을 가져옵니다.
const params = new URLSearchParams(location.search);
const id = params.get("id");

//  localStorage에서 'data' 키로 데이터를 불러옵니다.
const data = loadData("data");
//  불러온 데이터에서 현재 'id'와 일치하는 항목을 찾습니다.
const person = data ? data.find(item => item.id == id) : null; //  data가 null일 경우를 대비

//  HTML 요소들을 ID로 가져옵니다.
const profilePic = document.getElementById("profile-pic");
const profileName = document.getElementById("profile-name");
const profileGroup = document.getElementById("profile-group");
const profilePhone = document.getElementById("profile-phone");
const profileEmail = document.getElementById("profile-email");
const backBtn = document.getElementById("back-btn");
const menuBtn = document.getElementById("menu-btn");
const menuContainer = document.getElementById("menu-container");
const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");

//  일치하는 연락처 정보가 있으면 화면에 표시하고, 없으면 경고 후 목록으로 이동합니다.
if (person) {
  profilePic.src = person.pic || "/images/default.jpg"; //  pic이 없으면 기본 이미지
  profileName.textContent = person.name;
  profileGroup.textContent = person.group;
  profilePhone.textContent = person.hp;
  profileEmail.textContent = person.email;
} else {
    alert("연락처 정보를 찾을 수 없습니다.");
    window.location.href = "./list.html";
}


//  메뉴 버튼 클릭 시 메뉴 컨테이너를 토글(보이기/숨기기)합니다.
menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); //  이벤트가 부모 요소로 전파되는 것을 막습니다.
    //  메뉴 컨테이너의 display 상태를 확인하여 토글합니다.
    menuContainer.style.display = menuContainer.style.display === "flex" ? "none" : "flex";
});


// let menu = document.querySelector("#menu");
// let menucon = document.querySelector("#menu-con");
//
// // 메뉴 버튼 클릭 시 토글
// menu.addEventListener("click", (e) => {
//   e.stopPropagation(); // 다른 클릭 이벤트에 영향을 주지 않기 위해 버블링 방지
//   console.log(menucon.style.display);
//
//   if (menucon.style.display === "block") {
//     menucon.style.display = "none";
//   } else {
//     menucon.style.display = "block";
//   }
//
// });

// //  문서 전체를 클릭했을 때, 메뉴 영역이 아닌 곳을 클릭하면 메뉴를 숨깁니다.
// document.addEventListener("click", (e) => {
//   //  클릭된 요소가 메뉴 버튼이나 메뉴 컨테이너의 자식이 아니면 메뉴를 숨깁니다.
//   if (!menuBtn.contains(e.target) && !menuContainer.contains(e.target)) {
//     menuContainer.style.display = "none";
//   }
// });


//  수정 버튼 클릭 시, 현재 ID를 가지고 수정 페이지로 이동합니다.
updateBtn.addEventListener("click", () => {
  window.location.href = `./edit.html?id=${id}`;
});

//  삭제 버튼 클릭 시, 확인 모달을 띄웁니다.
deleteBtn.addEventListener("click", () => {
    menuContainer.style.display = "none"; //  모달을 띄우기 전에 메뉴를 닫습니다.
    //  showConfirm 함수를 호출하여 사용자에게 삭제 여부를 묻습니다.
    showConfirm(`'${person.name}' 연락처를 정말로 삭제하시겠습니까?`, () => {
        //  '확인'을 누르면 deleteDataById 함수로 데이터를 삭제합니다.
        const success = deleteDataById(id, "data");
        if (success) {
            alert("삭제되었습니다.");
            window.location.href = "./list.html"; //  삭제 후 목록 페이지로 이동합니다.
        } else {
            alert("삭제에 실패했습니다.");
        }
    });
});

//  뒤로가기 버튼 클릭 시, 브라우저의 이전 페이지로 이동합니다.
backBtn.addEventListener("click", () => {
    window.location.href = "./list.html";
});
