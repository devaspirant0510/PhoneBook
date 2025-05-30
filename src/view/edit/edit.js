import "./edit.css";
import "../../index.scss";
// localStorage 라이브러리와 ConfirmModal 라이브러리를 임포트합니다.
import {loadData, saveData} from "../../lib/localstroageLib";
import {showConfirm} from "../../components/ConfirmModal";
import {showToastMessage} from "../../components/ToastMessage";
import {validEmail, validPhoneNumber} from "../../lib/regexLib";

// URL 쿼리 파라미터에서 'id' 값을 가져옵니다.
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// localStorage에서 'data' 키로 데이터를 불러옵니다.
let data = loadData("data");
// 불러온 데이터에서 현재 'id'와 일치하는 항목을 찾습니다.
const target = data ? data.find(item => item.id === id) : null; // data가 null일 경우 대비

// HTML 입력 요소 및 버튼들을 ID로 가져옵니다.
const nameInput = document.getElementById("name");
const profilePic = document.getElementById("profile-pic");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const groupInput = document.getElementById("group");
const saveBtn = document.getElementById("save");
const cancelBtn = document.getElementById("cancel");
const backBtn = document.getElementById("back");

// 대상 데이터가 있으면 입력 필드에 값을 채우고, 없으면 경고 후 목록으로 이동합니다.
if (target) {
    nameInput.value = target.name;
    profilePic.src = target.pic || "/images/default.jpg"; // pic 없으면 기본 이미지
    phoneInput.value = target.hp;
    emailInput.value = target.email;
    groupInput.value = target.group;
} else {
    showToastMessage("수정할 연락처 정보를 찾을수 없습니다.", "error")
    setTimeout(() => {
        window.location.href = "./list.html";
    }, 1200)
}

// 저장 버튼 클릭 이벤트 리스너입니다.
saveBtn.addEventListener("click", () => {
    // 필수 입력 필드(이름, 전화번호) 검사
    if (!nameInput.value.trim()) {
        showToastMessage("이름을 입력해주세요.", "error")
        nameInput.focus();
        return;
    }
    if (!phoneInput.value.trim()) {
        showToastMessage("전화번호를 입력해주세요.", "error")
        phoneInput.focus();
        return;
    }
    if (!validPhoneNumber(phoneInput.value)) {
        showToastMessage("올바른 전화번호를 입력해주세요", "error")
        phoneInput.focus()
        return;
    }
    if (emailInput.value.trim() !== "" && !validEmail(emailInput.value)) {
        showToastMessage("올바른 이메일을 입력해주세요", "error")
        emailInput.focus()
        return;
    }
    // showConfirm 함수를 호출하여 사용자에게 저장 여부를 묻습니다.
    showConfirm("수정된 내용을 저장하시겠습니까?", () => {
        // '확인'을 누르면 입력된 값으로 target 객체를 업데이트합니다.
        target.name = nameInput.value;
        target.hp = phoneInput.value;
        target.email = emailInput.value;
        target.group = groupInput.value;

        // 수정된 데이터를 localStorage에 저장합니다.
        saveData(data, "data");
        showToastMessage("수정되었습니다.")
        setTimeout(()=>{
            // 저장 후 상세 정보 페이지로 이동합니다 (수정된 내용을 바로 확인).
            window.location.href = `./info.html?id=${id}`;
        },1200)
    });
});

// 취소 버튼 클릭 이벤트 리스너입니다.
cancelBtn.addEventListener("click", () => {
    // showConfirm 함수를 호출하여 사용자에게 취소 여부를 묻습니다.
    showConfirm("수정을 취소하고 이전 페이지로 돌아가시겠습니까?", () => {
        window.history.back(); // '확인'을 누르면 이전 페이지로 이동합니다.
    });
});

// 뒤로가기 버튼(화살표) 클릭 이벤트 리스너입니다.
backBtn.addEventListener("click", () => {
    window.history.back(); // 이전 페이지로 이동합니다.
});