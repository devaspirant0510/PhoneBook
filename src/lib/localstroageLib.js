export  function saveData(jsonData,key="listItem"){
    localStorage.setItem(key,JSON.stringify(jsonData));
}
export function loadData(key="listItem"){
    const data = localStorage.getItem(key);
    
    if(!data){
        throw Error("데이터를 불러오는데 실패했습니다. ");
    }
    return JSON.parse(data);

}