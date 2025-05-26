import "./info.css";
import { loadData } from "../../lib/localstroageLib";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const data = loadData("data");
const person = data.find(item => item.id == id);

if (person) {
  document.getElementById("profile-pic").src = person.pic;
  document.getElementById("profile-name").textContent = person.name;
  document.getElementById("profile-phone").textContent = person.hp;
  document.getElementById("profile-email").textContent = person.email;
  console.log(person.pic);
  console.log(person.name);
  console.log(person.hp);
  console.log(person.email);
}