import { getRemToPx } from "./utils.js";
//////////////////////////////////////////////////////////////
// ヘッダー周りの処理
//////////////////////////////////////////////////////////////

//
/**
 * スクロール位置でロゴの表示／非表示切替
 *   メインヴィジュアルが表示されている間はロゴは非表示にする
 */
export function changeLogoVisible() {
  const logoEl = document.querySelector(".l-header__logo")! as HTMLElement;
  const triggerEl = document.getElementById("about")! as HTMLElement; // 切り替える基準となる要素
  const triggerOffset = triggerEl.getBoundingClientRect().top;
  if (triggerOffset <= 0) {
    logoEl.classList.add("is-show");
  } else {
    logoEl.classList.remove("is-show");
  }
}

/**
 * スクロール位置でヘッダーのロゴ、ナビゲーションの色変更（黒背景時に白にする）
 */
export function changeHeaderColorchange() {
  const headerEl = document.querySelector(".l-header")! as HTMLElement;
  const logoEl = document.querySelector(".l-header__logo")! as HTMLElement;
  const darkColorEl = document.getElementById("works")! as HTMLElement;
  const dividerHeight = getRemToPx(2); // divider分（はみ出している）の高さ
  const changeColorOffsetTop = darkColorEl.getBoundingClientRect().top - dividerHeight;
  const changeColorOffsetBottom = darkColorEl.getBoundingClientRect().bottom;
  const logoOffsetTop = logoEl.getBoundingClientRect().top;
  if (changeColorOffsetTop <= logoOffsetTop && changeColorOffsetBottom >= logoOffsetTop) {
    headerEl.classList.add("is-light");
  } else {
    headerEl.classList.remove("is-light");
  }
}
