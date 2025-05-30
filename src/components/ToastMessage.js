import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'; // 부트스트랩 전체 import

export function showToastMessage(message, type = "info") {
    const container = document.createElement("div");
    container.className = "toast-container position-fixed top-0 start-50 translate-middle-x p-3";

    const toast = document.createElement("div");
    toast.className = "toast custom-slide show";
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    toast.setAttribute("data-bs-delay", "2000");
    toast.setAttribute("data-bs-autohide", "true");

    // 스타일 클래스 결정
    let bgClass = "", textClass = "", borderClass = "";
    switch (type) {
        case "success":
            bgClass = "bg-light";
            textClass = "text-success";
            borderClass = "border-success";
            break;
        case "error":
            bgClass = "bg-light";
            textClass = "text-danger";
            borderClass = "border-danger";
            break;
        default: // info
            bgClass = "bg-light";
            textClass = "text-dark";
            borderClass = "border-secondary";
    }

    const toastBody = document.createElement("div");
    toastBody.className = `toast-body border border-1 ${borderClass} ${bgClass} ${textClass} rounded`;
    toastBody.innerText = message;

    toast.appendChild(toastBody);
    container.appendChild(toast);
    document.body.appendChild(container);

    // 부트스트랩 토스트 인스턴스 생성 후 show
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // // 자동 제거 (토스트 사라지고 나면 DOM에서 삭제)
    // toast.addEventListener('hidden.bs.toast', () => {
    //     container.remove();
    // });
}
