import { changeLogoVisible, changeHeaderColorchange } from "./header.js";
import { setSmoothScroll } from "./smoothScroll.js";
import { showImageDialog } from "./dialog.js";
import { getWorksData } from "./works.js";
import { setValidateField } from "./validation.js";
import { submitForm } from "./submitForm.js";

function main() {
  document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
      // スクロールによるヘッダ周りの表示切り替え
      changeLogoVisible();
      changeHeaderColorchange();
    });
    setSmoothScroll(); // スムーススクロール
    showImageDialog(); // 画像をダイアログで開く

    // WORKS
    getWorksData();

    // CONTACT
    const form = document.querySelector("#contact form")! as HTMLFormElement;
    const items = document.querySelectorAll(".p-contact__item-input")! as NodeListOf<HTMLElement>;
    setValidateField(items); // リアルタイム検証を設定
    submitForm(form, items); // フォーム送信処理
  });
}

export default main;
