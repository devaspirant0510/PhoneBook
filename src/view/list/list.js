import "./list.css";
import {loadData, saveData} from "../../lib/localstroageLib"
import jsonResult from "/phonebook.json";
import PhoneItem from "../../components/PhoneItem";


const list = document.querySelector("#list");

let data = loadData("data");
if(!data){
    console.log("웹스토리지에 데이터가 없어  json 을 로드했다")
    saveData(jsonResult, "data");
    data = jsonResult;
}
function getInitialConsonant(char) {
    const code = char.charCodeAt(0);

    if (code < 0xac00 || code > 0xd7a3) {
        return char// 한글이 아니면 prefix 안 붙이게!
    }

    const CHO = [
        "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ",
        "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ",
        "ㅌ", "ㅍ", "ㅎ"
    ];

    const choIdx = Math.floor((code - 0xac00) / (21 * 28));
    return CHO[choIdx];
}
let currentNamePrefix = ""
data.forEach((element) => {

    // 현재 섹션이 없는경우 첫번째 글자를 현재 섹션으로 설정
    let prefix = getInitialConsonant(element.name[0])
    if(currentNamePrefix !== prefix){
        currentNamePrefix = prefix;
        const div = document.createElement("div");

        div.textContent = currentNamePrefix;
        list.appendChild(div);

    }
    console.log("element:" + element);
    const phoneItem = PhoneItem(element.id, element.name, element.phone, element.email, element.pic);
    list.appendChild(phoneItem);

});
