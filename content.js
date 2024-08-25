function removeElements() {
  const elementsToRemove = [
    "#guide-content",
    "div#contents.style-scope.ytd-rich-grid-renderer",
    "div#contents.style-scope.ytd-watch-next-secondary-results-renderer",
    "ytd-badge-supported-renderer.ytd-video-renderer",
    "ytd-badge-supported-renderer.ytd-rich-grid-video-renderer",
    "ytd-badge-supported-renderer.ytd-compact-video-renderer",
    "ytd-mini-guide-renderer",
    "ytd-guide-renderer",
    "#related",
    "#guide-button",
    "#shorts-container",
  ];

  let removedCount = 0;

  elementsToRemove.forEach((selector) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      // Apply fade-out effect
      element.style.transition = "opacity 0.2s ease-out";
      element.style.opacity = 0;

      setTimeout(() => {
        element.remove();
      }, 200);
      element.remove();
      removedCount++;
    });
  });

  if (removedCount > 0) {
    showNotification(removedCount);
  }
}

function showNotification(count) {
  const notification = document.createElement("div");
  notification.textContent =
    "유튜브 제한 모드가 확장프로그램에 의해 실행되었습니다.";
  notification.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #FF6B6B;
    color: #FFFFFF;
    text-align: center;
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    z-index: 9999;
    transition: opacity 0.5s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// 페이지 로드 시 실행
removeElements();

// YouTube의 동적 로딩을 고려한 MutationObserver 설정
const observer = new MutationObserver(removeElements);
observer.observe(document.body, { childList: true, subtree: true });
