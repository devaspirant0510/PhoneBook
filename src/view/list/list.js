import "./index.css";
import {loadData, saveData} from "./localstroageLib"
import jsonResult from "/phonebook.json";

const list = document.querySelector("#list");
saveData(jsonResult, "data");
const data = loadData("data");

data.forEach((element) => {
    const item = document.createElement("div");
    item.className = "phonebooke-item";

    const profileImage = document.createElement("img");
    profileImage.src = element.pic;
    const porfileName = document.createElement("span");
    porfileName.textContent = element.name;
    const porfileHp = document.createElement("i");
    porfileHp.className = "fa-solid fa-phone";
    item.appendChild(profileImage)
    item.appendChild(porfileName)
    item.appendChild(porfileHp)
    list.appendChild(item);
    console.log("element:" + element);
});
