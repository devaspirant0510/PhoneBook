import {showToastMessage} from "../components/ToastMessage";

const phoneRegex = /^[0-9()+\-\s]+$/;
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
export function validPhoneNumber(phoneNumber) {
    return phoneRegex.test(phoneNumber.trim());
}
export function validEmail(email){
    return emailRegex.test(email.trim())
}