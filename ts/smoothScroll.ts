//////////////////////////////////////////////////////////////
// スムーススクロール
//////////////////////////////////////////////////////////////
/**
 * ターゲット要素にスクロール
 * @param {HTMLElement} targetElement ターゲット要素
 */
function scrollToTarget(targetElement: HTMLElement) {
  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: "smooth",
  });
}

export function setSmoothScroll() {
  // ページ読み込み時
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetElement = document.querySelector(hash) as HTMLElement;
    if (targetElement) {
      scrollToTarget(targetElement);
    }
  }

  // ハッシュが変わった時
  window.addEventListener("hashchange", (event) => {
    const hash = window.location.hash;
    const targetElement = document.querySelector(hash) as HTMLElement;
    if (targetElement) {
      scrollToTarget(targetElement);
    }
  });

  // リンクをクリックした時
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
      const hash = this.getAttribute("href");
      const targetElement = document.querySelector(hash) as HTMLElement;
      if (targetElement) {
        scrollToTarget(targetElement);
        // 履歴に追加
        history.pushState({}, "", hash);
      }
    });
  });
}
