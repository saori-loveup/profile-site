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

document.addEventListener("DOMContentLoaded", function () {
  getWorksData();
});
