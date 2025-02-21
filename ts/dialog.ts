//////////////////////////////////////////////////////////////
// ダイアログ関連
//////////////////////////////////////////////////////////////

/**
 * ダイアログの要素を作成する
 * @param {string} html ダイアログに表示する内容
 * @param {string} [icon=""] ダイアログの上部に表示するアイコン（Google Fontsのマテリアルシンボルのアイコン名）
 * @returns {HTMLDialogElement} 作成したダイアログのHTML
 */
export function createDialog(html: string, icon: string = ""): HTMLDialogElement {
  // ダイアログ用のHTMLを作成
  const dialog = document.createElement("dialog");
  dialog.classList.add("c-dialog");

  const dialogInnerEl = document.createElement("div");
  dialogInnerEl.classList.add("c-dialog__inner");

  // iconがある場合はアイコンを表示
  if (icon) {
    const dialogHeaderEl = document.createElement("div");
    dialogHeaderEl.classList.add("c-dialog__header", `c-dialog__header--${icon}`);
    dialogHeaderEl.insertAdjacentHTML("afterbegin", `<span class="material-symbols-outlined">${icon}</span>`);
    dialogInnerEl.append(dialogHeaderEl);
  }
  // ダイアログに表示する内容
  const dialogContentEl = document.createElement("div");
  dialogContentEl.classList.add("c-dialog__content");
  dialogContentEl.insertAdjacentHTML("afterbegin", html);
  // 閉じるボタン
  const dialogCloseEl = document.createElement("div");
  dialogCloseEl.classList.add("c-dialog__close");
  dialogCloseEl.insertAdjacentHTML(
    "afterbegin",
    '<button class="c-btn"><span class="material-symbols-outlined">close</span></div>'
  );

  dialog.append(dialogCloseEl, dialogInnerEl);
  dialogInnerEl.append(dialogContentEl);

  document.body.append(dialog);

  // 閉じるボタンのイベント設定
  dialogCloseEl.addEventListener("click", function () {
    closeDialog(dialog);
  });
  // モーダル（backdrop）クリックで閉じる
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog(dialog);
    }
  });

  return dialog;
}

/**
 * ダイアログを開く
 * @param {HTMLDialogElement} dialog - 対象のダイアログ
 */
export function showDialog(dialog: HTMLDialogElement) {
  document.body.style.overflow = "hidden"; // ダイアログ表示中は裏のスクロールはさせない
  dialog.showModal();
  dialog.classList.add("c-dialog--open");
}

/**
 * ダイアログを閉じる
 * @param {HTMLDialogElement} dialog - 対象のダイアログ
 */
export function closeDialog(dialog: HTMLDialogElement) {
  dialog.classList.remove("c-dialog--open");
  dialog.classList.add("c-dialog--close"); // ダイアログを閉じるときのアニメーションを設定

  // 閉じるアニメーション終了後に閉じる
  dialog.addEventListener("animationend", () => {
    dialog.close();
    dialog.remove();
    document.body.style.overflow = "auto"; // ダイアログ閉じたら裏のスクロールを許可
  });
}

/**
 * 画像リンクをダイアログで開く
 * (クラスに"js-image-dialog"があるリンク要素を対象とする)
 */
export function showImageDialog() {
  const anchorEls = document.querySelectorAll("a.js-image-dialog") as NodeListOf<HTMLAnchorElement>;
  anchorEls.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      const href = anchor.getAttribute("href");
      const alt = anchor.getAttribute("data-alt");
      const dialog = createDialog(`<img src="${href}" alt="${alt}">`);
      showDialog(dialog);
    });
  });
}
