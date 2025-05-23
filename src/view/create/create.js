import "./create.css";
import {loadData, saveData} from "../../lib/localstroageLib";

const addButton = document.getElementById("btn-add");
addButton.addEventListener("click", (e) => {
    const phoneBook = loadData("data");
    const testInsertPhone = {
        name:"괡승호",
        phone:"010-1234-1234",
        email:"seungho@gmail.com",
        id:phoneBook.length+1,
        group:"friends",
        pic:"/images/default.jpg"
    }

    phoneBook.push(testInsertPhone);
    saveData(phoneBook,"data")

})