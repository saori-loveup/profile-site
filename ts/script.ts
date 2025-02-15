// GoogleスプレッドシートからApp Scriptで生成したJSONデータを取得し、htmlを生成
function getWorksData() {
  const api_url =
    "https://script.googleusercontent.com/macros/echo?user_content_key=USxo2VI_MCXMZOe3WRSJu95dkETaj7ue3CnZ0mb8gs8NDTj1c2GSTJD5kvuWdL68VMdKFRq768n4-QeP3dVWkc7ZsZsmqbB6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEgjy-mgYYV3AqNquoVkfcTfgMZA1aujKLRMnGXIyUp18OHgyRsRZqE1vg9K88Vd3gS2C6tzT5u0egOL7NB2-U8ifep_a6B0kg&lib=MfGMSyHYhouNuqePoGWD6BmqnDSDUYNzp";
  fetch(api_url)
    .then((responce) => responce.json())
    .then((works_data) => {
      const parent_element = document.getElementById("js-works")!;
      for (const data of works_data) {
        const html = `
        <section>
            <header>
              <p>${data.period}</p>
              <h4>${data.project}</h4>
            </header>
            <section>
              <h5>プロジェクト概要</h5>
              <p>${data.project_overview}</p>
              <div>${data.conposition}</div>
              <p>
                使用技術／ツール：${data.technology}
              </p>
            </section>
            <section>
              <h5>担当業務</h5>
              <p>${data.work}</p>
              <p>${data.work_detail}</p>
            </section>
          </section>
        `;
        parent_element.insertAdjacentHTML("beforeend", html);
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

// フォームの送信時の処理
function submitForm(form: HTMLFormElement, items: NodeListOf<Element>) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // 送信前にバリデーションする
    if (!form.checkValidity()) {
      // バリデーションが失敗した場合、エラーメッセージを表示
      items.forEach((item) => {
        const inputEl = item.querySelector("input, textarea")! as HTMLInputElement | HTMLTextAreaElement;
        const errorEl = item.querySelector(".p-contact__item-error")! as HTMLElement;
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
          // TODO:成功時の処理
          console.log(data);
        })
        .catch((error) => {
          // エラー時の処理
          console.log(error);
        });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getWorksData();

  const form = document.querySelector("#contact form")! as HTMLFormElement;
  const items = document.querySelectorAll(".p-contact__item-input")! as NodeListOf<HTMLElement>;
  // リアルタイム検証を設定
  setValidateField(items);

  // フォーム送信処理
  submitForm(form, items);
});
