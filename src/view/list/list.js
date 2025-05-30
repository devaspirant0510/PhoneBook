import "./list.css";
import "../../index.scss"
import PhoneItem from "../../components/PhoneItem";
import {getInitialConsonant} from "../../lib/StringUtilLib";
import {SectionHeader} from "../../components/SectionHeader";


import {loadData, saveData} from "../../lib/localstroageLib"
import jsonResult from "/phonebook.json";
let data = loadData("data");
if (!data) {
    console.log("웹스토리지에 데이터가 없어  json 을 로드했다")
    saveData(jsonResult, "data");
    data = jsonResult;
}


const list = document.querySelector("#list");


function initialLoadData() {
    let currentNamePrefix = ""
    data.forEach((element) => {

        // 현재 섹션이 없는경우 첫번째 글자를 현재 섹션으로 설정
        let prefix = getInitialConsonant(element.name[0])
        if (currentNamePrefix !== prefix) {
            currentNamePrefix = prefix;
            list.appendChild(SectionHeader(currentNamePrefix));
        }
        const phoneItem = PhoneItem(element.id, element.name, element.phone, element.email, element.pic);
        list.appendChild(phoneItem);
    });
}
initialLoadData();


const inputSearch = document.querySelector("#input-search");
let debounceTime;

inputSearch.addEventListener("input", (e) => {
    clearTimeout(debounceTime)
    if (e.target.value.trim() === "") {
        list.textContent = "";
        initialLoadData();
    } else {
        debounceTime = setTimeout(() => {
            list.textContent = "";
            const searchResult = document.createElement("div")
            searchResult.className = "section-header"
            list.appendChild(searchResult)
            let count = 0;
            data.forEach((element) => {
                if (element.name.toUpperCase().includes(e.target.value.toUpperCase())) {
                    const phoneItem = PhoneItem(element.id, element.name, element.phone, element.email, element.pic);
                    list.appendChild(phoneItem);
                    count++;
                }
            })
            searchResult.textContent = `저장 연락처 (${count})`


        }, 300)
    }
})
