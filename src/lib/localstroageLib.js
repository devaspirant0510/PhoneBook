/**
 *  데이터를 localStorage에 저장합니다.
 * 저장하기 전에 항상 이름순으로 정렬합니다.
 * @param {Array} jsonData - 저장할 데이터 배열
 * @param {string} [key="listItem"] - 사용할 localStorage 키
 */
export function saveData(jsonData, key = "listItem") {
    //  데이터를 이름 기준으로 오름차순 정렬합니다.
    let result = jsonData.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    //  정렬된 데이터를 localStorage에 JSON 문자열 형태로 저장합니다.
    localStorage.setItem(key, JSON.stringify(result));
}

/**
 *  localStorage에서 데이터를 불러옵니다.
 * @param {string} [key="listItem"] - 사용할 localStorage 키
 * @returns {Array|boolean} - 불러온 데이터 배열 또는 실패 시 false
 */
export function loadData(key = "listItem") {
    //  localStorage에서 해당 키의 데이터를 가져옵니다.
    const data = localStorage.getItem(key);

    //  데이터가 없으면 콘솔에 오류 메시지를 출력하고 false를 반환합니다.
    if (!data) {
        console.error("데이터를 불러오는데 실패했습니다. ");
        return false;
    }
    //  JSON 문자열을 파싱하여 JavaScript 객체로 변환하여 반환합니다.
    return JSON.parse(data);
}

/**
 *  localStorage에서 특정 ID의 데이터를 삭제합니다.
 * @param {string} id - 삭제할 데이터의 ID
 * @param {string} [key="listItem"] - 사용할 localStorage 키
 * @returns {boolean} - 삭제 성공 여부
 */
export function deleteDataById(id, key = "listItem") {
    //  현재 데이터를 불러옵니다.
    let data = loadData(key);
    //  데이터가 없으면 false를 반환합니다.
    if (!data) return false;

    //  삭제할 ID를 제외한 새로운 배열을 생성합니다. (filter 사용)
    const newData = data.filter(item => item.id !== id);

    //  원래 데이터와 새 데이터의 길이가 다르면 (즉, 삭제가 일어났으면)
    if (data.length !== newData.length) {
        //  변경된 데이터를 저장합니다.
        saveData(newData, key);
        return true; //  삭제 성공을 알립니다.
    }
    return false; //  해당 ID가 없어 삭제되지 않았음을 알립니다.
}