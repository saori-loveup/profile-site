/**
 * フィールドを検証する
 * @param {HTMLInputElement | HTMLTextAreaElement} inputEl - 検証対象
 * @param {HTMLElement} errorEl - エラーを表示する要素
 */
export function validateField(inputEl: HTMLInputElement | HTMLTextAreaElement, errorEl: HTMLElement) {
  if (inputEl.checkValidity()) {
    errorEl.textContent = "";
    inputEl.classList.remove("is-invalid");
  } else {
    errorEl.textContent = inputEl.validationMessage;
    inputEl.classList.add("is-invalid");
  }
}

/**
 * 対象をリアルタイム(フォーカスが離れた時)に検証する
 * @param {NodeListOf<Element>} items - 検証対象
 */
export function setValidateField(items: NodeListOf<Element>) {
  items.forEach((item) => {
    const inputEl = item.querySelector("input, textarea")! as HTMLInputElement | HTMLTextAreaElement;
    const errorEl = item.querySelector(".p-contact__item-error")! as HTMLElement;
    inputEl.addEventListener("blur", () => {
      validateField(inputEl, errorEl);
    });
  });
}
