import { validateField } from "./validation.js";
import { createDialog, showDialog } from "./dialog.js";

/**
 * フォームの送信時の処理
 * @param {HTMLFormElement} form
 * @param {NodeListOf<Element>} items
 */
export function submitForm(form: HTMLFormElement, items: NodeListOf<Element>) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // 送信前にバリデーションする
    if (!form.checkValidity()) {
      // バリデーションが失敗した場合、エラーメッセージを表示
      items.forEach((item) => {
        const inputEl = item.querySelector("input, textarea")! as HTMLInputElement | HTMLTextAreaElement;
        const errorEl = item.querySelector(".js-contact-error")! as HTMLElement;
        validateField(inputEl, errorEl);
      });
    } else {
      // バリデーション成功した場合、PHPにデータ送信
      const formData = new FormData(form);
      const actionUrl = form.getAttribute("data-action") || ""; // data-action属性で送信先を取得

      // 送信する時にボタンの表示を変える
      const buttonEl = document.querySelector(".p-contact__bottom .c-btn--submit") as HTMLButtonElement;
      changeLoadingButton(buttonEl);

      fetch(actionUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json()) // PHPからのレスポンスをJSONとして受け取る
        .then((data) => {
          if (data.success) {
            const dialog = createDialog("送信が完了しました。", "check_circle");
            showDialog(dialog);
            form.reset();
          } else {
            const dialog = createDialog(data.error, "error");
            showDialog(dialog);
          }
          changeTextButton(buttonEl);
        })
        .catch((error) => {
          console.error("通信に失敗しました", error);
          changeTextButton(buttonEl);
        });
    }
  });
}

// ボタンの表示をローディングに変える
function changeLoadingButton(buttonEl: HTMLButtonElement) {
  const loaderEl = buttonEl.querySelector(".c-loader") as HTMLElement;
  const buttonTextEl = buttonEl.querySelector(".p-contact__btn-text") as HTMLElement;
  buttonEl.disabled = true;
  loaderEl.style.display = "inline-block";
  buttonTextEl.style.display = "none";
}
// ボタンの表示をテキストに変える
function changeTextButton(buttonEl: HTMLButtonElement) {
  const loaderEl = buttonEl.querySelector(".c-loader") as HTMLElement;
  const buttonTextEl = buttonEl.querySelector(".p-contact__btn-text") as HTMLElement;
  buttonEl.disabled = false;
  loaderEl.style.display = "";
  buttonTextEl.style.display = "";
}
