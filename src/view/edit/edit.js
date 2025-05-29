import "./edit.css";
import { loadData, saveData } from "../../lib/localstroageLib";


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let data = loadData("data");
const target = data.find(item => item.id === id); 

const nameInput = document.getElementById("name");
const profilePic = document.getElementById("profile-pic");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const groupInput = document.getElementById("group");
const saveBtn = document.getElementById("save");
const cancelBtn = document.getElementById("cancel");
const backBtn = document.getElementById("back");

if (target) {
  nameInput.value = target.name;
  profilePic.src = target.pic;
  phoneInput.value = target.hp;
  emailInput.value = target.email;
  groupInput.value = target.group;
}

saveBtn.addEventListener("click", () => {
  target.name = nameInput.value;
  target.phone = phoneInput.value;
  target.email = emailInput.value;
  target.group = groupInput.value;

  saveData(data, "data");
  alert("수정되었습니다!");
  window.location.href = "./list.html";
});

cancelBtn.addEventListener("click", () => {
  window.history.back();
});

backBtn.addEventListener("click", () => {
  window.history.back();
});
