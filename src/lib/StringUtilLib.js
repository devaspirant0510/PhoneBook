// 자음 분리 함수
export function getInitialConsonant(char) {
    const code = char.charCodeAt(0);

    // 영어일 경우 대소문자 동일 처리를 위해 정규식 검사후 리턴
    if (code < 0xac00 || code > 0xd7a3) {
        if (/[a-zA-Z]/.test(char)) {
            return char.toUpperCase(); // 영어면 대문자로
        }
        return char; // 숫자나 특수문자는 그대로
    }

    const CHO = [
        "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ",
        "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ",
        "ㅌ", "ㅍ", "ㅎ"
    ];

    const choIdx = Math.floor((code - 0xac00) / (21 * 28));
    return CHO[choIdx];
}
