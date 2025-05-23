export function saveData(jsonData, key = "listItem") {
    let result = jsonData.sort((a, b) => {
        console.log(a, b)
        return a.name.localeCompare(b.name)
    });
    console.log(result)
    localStorage.setItem(key, JSON.stringify(result));
}

export function loadData(key = "listItem") {
    const data = localStorage.getItem(key);

    if (!data) {
        console.error("데이터를 불러오는데 실패했습니다. ");
        return false;
    }
    return JSON.parse(data);

}