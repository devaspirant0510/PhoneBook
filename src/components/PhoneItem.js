
export default function PhoneItem(id, name, phone, email, pic) {
    const item = document.createElement("div");
    item.className = "phonebook-item";
    const profileImage = document.createElement("img");
    profileImage.src = pic;
    const profileName = document.createElement("span");
    profileName.textContent = name;
    const profileHp = document.createElement("i");
    profileHp.className = "fa-solid fa-phone";
    item.appendChild(profileImage)
    item.appendChild(profileName)
    item.appendChild(profileHp)

    item.addEventListener("click", () => {
        console.log("상세 페이지로 이동 " + id + "," + name)
        window.location.href = "./info.html";
    })
    return item;

}