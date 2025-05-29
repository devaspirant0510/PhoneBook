// import "./create.css"; // 필요한 경우 create.css 임포트
import "../edit/edit.css"; // edit.css 스타일 재사용
// localStorage 라이브러리와 ConfirmModal 라이브러리를 임포트합니다.
import { loadData, saveData } from "../../lib/localstroageLib";
import { showConfirm } from "../../components/ConfirmModal";

// HTML 입력 요소 및 버튼들을 ID로 가져옵니다.
const nameInput = document.getElementById("name");
const profilePic = document.getElementById("profile-pic");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const groupInput = document.getElementById("group");
const saveBtn = document.getElementById("save");
const cancelBtn = document.getElementById("cancel");
const backBtn = document.getElementById("back");

// 저장 버튼 클릭 이벤트 리스너입니다.
saveBtn.addEventListener("click", () => {
    // 필수 입력 필드(이름, 전화번호) 검사
    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        alert("이름과 전화번호는 필수입니다.");
        return;
    }

    // showConfirm 함수를 호출하여 사용자에게 저장 여부를 묻습니다.
    showConfirm("새 연락처를 저장하시겠습니까?", () => {
        // localStorage에서 기존 데이터를 불러옵니다. 데이터가 없으면 빈 배열로 시작합니다.
        const phoneBook = loadData("data") || [];

        // 새 연락처 객체를 생성합니다. ID는 고유성을 위해 현재 시간을 문자열로 사용합니다.
        const newContact = {
            id: Date.now().toString(),
            name: nameInput.value.trim(),
            group: groupInput.value.trim() || "미지정", // 입력 없으면 '미지정'
            hp: phoneInput.value.trim(),
            email: emailInput.value.trim() || "미지정", // 입력 없으면 '미지정'
            pic: profilePic.src // 현재는 기본 이미지 사용
        };

        // 새 연락처를 기존 데이터 배열에 추가합니다.
        phoneBook.push(newContact);
        // 업데이트된 데이터를 localStorage에 저장합니다.
        saveData(phoneBook, "data");

        alert("새 연락처가 저장되었습니다!");
        // 저장 후 목록 페이지로 이동합니다.
        window.location.href = "./list.html";
    });
});

// 취소 버튼 클릭 이벤트 리스너입니다.
cancelBtn.addEventListener("click", () => {
    // showConfirm 함수를 호출하여 사용자에게 취소 여부를 묻습니다.
    showConfirm("연락처 추가를 취소하고 이전 페이지로 돌아가시겠습니까?", () => {
        window.history.back(); // '확인'을 누르면 이전 페이지로 이동합니다.
    });
});

// 뒤로가기 버튼(화살표) 클릭 이벤트 리스너입니다.
backBtn.addEventListener("click", () => {
    window.history.back(); // 이전 페이지로 이동합니다.
});