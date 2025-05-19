
const app = document.querySelector("#app");
const xmlHttp = new XMLHttpRequest();
xmlHttp.open("get", "phonebook.json");
xmlHttp.send();
xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        console.log(xmlHttp.responseText);
        try {
            const data2 = JSON.parse(xmlHttp.responseText);

            data2.forEach((element) => {
                const item = document.createElement("div");
                item.className = "phonebooke-item";

                const profileImage = document.createElement("img");
                profileImage.src = element.pic;
                const porfileName = document.createElement("span");
                porfileName.textContent = element.name;
                const porfileHp = document.createElement("i");
                porfileHp.className="fa-solid fa-phone";
                item.appendChild(profileImage)
                item.appendChild(porfileName)
                item.appendChild(porfileHp)
                app.appendChild(item);
                console.log("element:" + element);
            });
        } catch (e) {
            console.log(e);
        }
        /*
        data2.forEach(elment => {
        if (element.id === id) {
        console.log(elment);
        return;
        }
        });
        */
    }
};
