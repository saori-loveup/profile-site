// GoogleスプレッドシートからApp Scriptで生成したJSONデータを取得し、htmlを生成
function getWorksData() {
  const API_URL =
    "https://script.googleusercontent.com/macros/echo?user_content_key=USxo2VI_MCXMZOe3WRSJu95dkETaj7ue3CnZ0mb8gs8NDTj1c2GSTJD5kvuWdL68VMdKFRq768n4-QeP3dVWkc7ZsZsmqbB6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEgjy-mgYYV3AqNquoVkfcTfgMZA1aujKLRMnGXIyUp18OHgyRsRZqE1vg9K88Vd3gS2C6tzT5u0egOL7NB2-U8ifep_a6B0kg&lib=MfGMSyHYhouNuqePoGWD6BmqnDSDUYNzp";
  fetch(API_URL)
    .then((responce) => responce.json())
    .then((works_data) => {
      const parentEl = document.getElementById("js-works")!;
      for (const data of works_data) {
        const itemEl = document.createElement("li") as HTMLLIElement; // li要素作成
        itemEl.classList.add("p-works-list__item");
        // liの中身HTML
        const listHtml = `
        <div class="p-works-list__item-container">
          <div class="p-works-list__item-content">
            <p class="p-works-list__item-period">${data.period}</p>
            <p class="p-works-list__item-project">${data.project}</p>
          </div>
          <div class="p-works-list__item-open-detail"><span class="material-symbols-outlined">arrow_forward_ios</span></div>
        </div>
        `;
        itemEl.insertAdjacentHTML("beforeend", listHtml); // li要素にHTMLを挿入
        document.querySelector("#js-works-list")?.append(itemEl); // li要素をHTMLに追加

        // 詳細HTML
        const detailHml = `
          <section class="p-works-detail">
            <header class="p-works-detail__header">
              <p class="p-works-detail__period">${data.period}</p>
              <h4 class="p-works-detail__project">${data.project}</h4>
            </header>
            <div>
              <section>
                <h5 class="p-works-detail__title">プロジェクト概要</h5>
                <p>${data.project_overview}</p>
                <p><span class="p-works-detail__subtitle">構成</span><br />${data.composition}</p>
                <p>
                  <span class="p-works-detail__subtitle">使用技術／ツール</span><br/>${data.technology}
                </p>
              </section>
              <section>
                <h5 class="p-works-detail__title">担当業務</h5>
                <p>${data.work}</p>
                <p><span class="p-works-detail__subtitle">作業内容</span><br/>${data.work_detail}</p>
              </section>
            </div>
          </section>
        `;
        // liクリックの動作を設定
        itemEl.addEventListener("click", () => {
          // ダイアログで詳細を表示する
          const dialog = createDialog(detailHml);
          showDialog(dialog);
        });
      }
    });
}

// フィールドの検証
function validateField(inputEl: HTMLInputElement | HTMLTextAreaElement, errorEl: HTMLElement) {
  if (inputEl.checkValidity()) {
    errorEl.textContent = "";
    inputEl.classList.remove("is-invalid");
  } else {
    errorEl.textContent = inputEl.validationMessage;
    inputEl.classList.add("is-invalid");
  }
}
// フィールドのリアルタイム検証
function setValidateField(items: NodeListOf<Element>) {
  items.forEach((item) => {
    const inputEl = item.querySelector("input, textarea")! as HTMLInputElement | HTMLTextAreaElement;
    const errorEl = item.querySelector(".p-contact__item-error")! as HTMLElement;
    inputEl.addEventListener("blur", () => {
      validateField(inputEl, errorEl);
    });
  });
}

/* ダイアログの要素を作成する
 *   html ダイアログに表示する内容
 *   icon ダイアログの上部に表示するアイコン（Google Fontsのマテリアルシンボルのアイコン名）
 */
function createDialog(html: string, icon: string = ""): HTMLDialogElement {
  // ダイアログ用のHTMLを作成
  const dialog = document.createElement("dialog");
  dialog.classList.add("c-dialog");

  const dialogInnerEl = document.createElement("div");
  dialogInnerEl.classList.add("c-dialog__inner");

  if (icon) {
    const dialogHeaderEl = document.createElement("div");
    dialogHeaderEl.classList.add("c-dialog__header", `c-dialog__header--${icon}`);
    dialogHeaderEl.insertAdjacentHTML("afterbegin", `<span class="material-symbols-outlined">${icon}</span>`);
    dialogInnerEl.append(dialogHeaderEl);
  }

  const dialogContentEl = document.createElement("div");
  dialogContentEl.classList.add("c-dialog__content");
  dialogContentEl.insertAdjacentHTML("afterbegin", html);

  const dialogCloseEl = document.createElement("div");
  dialogCloseEl.classList.add("c-dialog__close");
  dialogCloseEl.insertAdjacentHTML(
    "afterbegin",
    '<button class="c-btn"><span class="material-symbols-outlined">close</span></div>'
  );

  dialog.append(dialogCloseEl, dialogInnerEl);
  dialogInnerEl.append(dialogContentEl);

  document.body.append(dialog);

  // 閉じるボタンのイベント
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
function showDialog(dialog: HTMLDialogElement) {
  document.body.style.overflow = "hidden";
  dialog.showModal();
}
function closeDialog(dialog: HTMLDialogElement) {
  document.body.style.overflow = "auto";
  dialog.close();
  dialog.remove();
}

// 画像リンクをダイアログで開く
function openImageDialog() {
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

// フォームの送信時の処理
function submitForm(form: HTMLFormElement, items: NodeListOf<Element>) {
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
        })
        .catch((error) => {
          console.error("通信に失敗しました", error);
        });
    }
  });
}

// CSSのremでのサイズ取得
function getRem(number: number) {
  const root = document.documentElement; // htmlのルート要素を取得
  const rootFontSize = window.getComputedStyle(root).getPropertyValue("font-size"); // rootのフォントサイズを取得(〇〇px);
  const rem = parseFloat(rootFontSize); // 数字に変換
  return rem * number;
}

// ロゴの表示／非表示切替
function changeLogoVisible() {
  const logoEl = document.querySelector(".l-header__logo")! as HTMLElement;
  const triggerEl = document.getElementById("about")! as HTMLElement; // 切り替える基準となる要素
  const triggerOffset = triggerEl.getBoundingClientRect().top;
  if (triggerOffset <= 0) {
    logoEl.classList.add("is-show");
  } else {
    logoEl.classList.remove("is-show");
  }
}

// ヘッダーのロゴ、ナビゲーションの色変更（黒背景時に白にする）
function changeHeaderColorchange() {
  const headerEl = document.querySelector(".l-header")! as HTMLElement;
  const logoEl = document.querySelector(".l-header__logo")! as HTMLElement;
  const darkColorEl = document.getElementById("works")! as HTMLElement;
  const dividerHeight = getRem(2); // divider分（はみ出している）の高さ
  const changeColorOffsetTop = darkColorEl.getBoundingClientRect().top - dividerHeight;
  const changeColorOffsetBottom = darkColorEl.getBoundingClientRect().bottom;
  const logoOffsetTop = logoEl.getBoundingClientRect().top;
  if (changeColorOffsetTop <= logoOffsetTop && changeColorOffsetBottom >= logoOffsetTop) {
    headerEl.classList.add("is-light");
  } else {
    headerEl.classList.remove("is-light");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    // スクロールによるヘッダ周りの表示切り替え
    changeLogoVisible();
    changeHeaderColorchange();
  });

  getWorksData();
  openImageDialog();

  const form = document.querySelector("#contact form")! as HTMLFormElement;
  const items = document.querySelectorAll(".p-contact__item-input")! as NodeListOf<HTMLElement>;
  // リアルタイム検証を設定
  setValidateField(items);

  // フォーム送信処理
  submitForm(form, items);
});
