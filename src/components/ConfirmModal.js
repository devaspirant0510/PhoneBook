// src/components/ConfirmModal.js
import './ConfirmModal.css'; // 주석: ConfirmModal의 CSS 스타일을 임포트합니다.

// 주석: 모달 관련 DOM 요소들을 저장할 변수들을 선언합니다.
let modalOverlay = null;
let modal = null;
let messageP = null;
let okBtn = null;
let cancelBtn = null;
// 주석: '확인' 버튼 클릭 시 실행될 콜백 함수를 저장할 변수입니다.
let currentOnConfirm = null;

/**
 * 주석: 모달 HTML 요소를 동적으로 생성하고 body에 추가하는 함수입니다.
 * 이 함수는 처음 모달이 호출될 때 한 번만 실행됩니다.
 */
function createModalElement() {
    // 주석: 모달이 이미 생성되어 있다면 함수 실행을 중단합니다.
    if (document.getElementById('confirm-modal-overlay')) {
        return;
    }

    // 주석: 모달 배경(오버레이) 요소를 생성하고 ID를 설정합니다.
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'confirm-modal-overlay';

    // 주석: 모달 창 요소를 생성하고 ID를 설정합니다.
    modal = document.createElement('div');
    modal.id = 'confirm-modal';

    // 주석: 메시지를 표시할 p 요소를 생성하고 ID를 설정합니다.
    messageP = document.createElement('p');
    messageP.id = 'confirm-message';

    // 주석: 버튼들을 담을 div 요소를 생성하고 ID를 설정합니다.
    const buttonDiv = document.createElement('div');
    buttonDiv.id = 'confirm-modal-buttons';

    // 주석: '확인' 버튼 요소를 생성하고 ID와 텍스트를 설정합니다.
    okBtn = document.createElement('button');
    okBtn.id = 'confirm-ok-btn';
    okBtn.textContent = '확인';

    // 주석: '취소' 버튼 요소를 생성하고 ID와 텍스트를 설정합니다.
    cancelBtn = document.createElement('button');
    cancelBtn.id = 'confirm-cancel-btn';
    cancelBtn.textContent = '취소';

    // 주석: 버튼들을 버튼 div에 추가합니다.
    buttonDiv.appendChild(okBtn);
    buttonDiv.appendChild(cancelBtn);

    // 주석: 메시지와 버튼 div를 모달 창에 추가합니다.
    modal.appendChild(messageP);
    modal.appendChild(buttonDiv);

    // 주석: 모달 창을 모달 배경에 추가합니다.
    modalOverlay.appendChild(modal);
    // 주석: 완성된 모달을 body의 마지막 자식으로 추가합니다.
    document.body.appendChild(modalOverlay);

    // 주석: '확인' 버튼 클릭 이벤트 리스너를 설정합니다.
    okBtn.addEventListener('click', () => {
        // 주석: 현재 저장된 onConfirm 콜백 함수가 있으면 실행합니다.
        if (currentOnConfirm) {
            currentOnConfirm();
        }
        // 주석: 모달을 닫습니다.
        hideModal();
    });

    // 주석: '취소' 버튼 클릭 이벤트 리스너를 설정합니다.
    cancelBtn.addEventListener('click', () => {
        // 주석: 모달을 닫습니다.
        hideModal();
    });

    // 주석: 모달 배경 클릭 시 모달을 닫는 이벤트 리스너를 설정합니다.
    modalOverlay.addEventListener('click', (e) => {
        // 주석: 클릭된 요소가 모달 배경 자체일 때만 닫습니다.
        if (e.target === modalOverlay) {
            hideModal();
        }
    });
}

/**
 * 주석: 모달을 화면에 보여주는 함수입니다.
 * @param {string} message - 모달 창에 표시할 메시지.
 * @param {function} onConfirm - '확인' 버튼 클릭 시 실행될 콜백 함수.
 */
export function showConfirm(message, onConfirm) {
    // 주석: 모달 요소가 없으면 생성합니다.
    createModalElement();
    // 주석: 메시지 텍스트를 설정합니다.
    messageP.textContent = message;
    // 주석: 전달받은 콜백 함수를 저장합니다.
    currentOnConfirm = onConfirm;
    // 주석: 모달 배경의 display 속성을 'flex'로 변경하여 화면에 표시합니다.
    modalOverlay.style.display = 'flex';
}

/**
 * 주석: 모달을 화면에서 숨기는 함수입니다.
 */
function hideModal() {
    // 주석: 모달 배경 요소가 존재하면
    if (modalOverlay) {
        // 주석: display 속성을 'none'으로 변경하여 숨깁니다.
        modalOverlay.style.display = 'none';
        // 주석: 저장된 콜백 함수를 초기화합니다.
        currentOnConfirm = null;
    }
}