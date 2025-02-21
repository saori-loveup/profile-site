import { createDialog, showDialog } from "./dialog.js";
//////////////////////////////////////////////////////////////
// WORKS用
//////////////////////////////////////////////////////////////
export function getWorksData() {
  const API_URL =
    "https://script.googleusercontent.com/macros/echo?user_content_key=USxo2VI_MCXMZOe3WRSJu95dkETaj7ue3CnZ0mb8gs8NDTj1c2GSTJD5kvuWdL68VMdKFRq768n4-QeP3dVWkc7ZsZsmqbB6m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEgjy-mgYYV3AqNquoVkfcTfgMZA1aujKLRMnGXIyUp18OHgyRsRZqE1vg9K88Vd3gS2C6tzT5u0egOL7NB2-U8ifep_a6B0kg&lib=MfGMSyHYhouNuqePoGWD6BmqnDSDUYNzp";
  fetch(API_URL)
    .then((responce) => responce.json())
    .then((works_data) => {
      // loading を非表示にする
      const loadingEl = document.querySelector(".p-works-list__item-loading") as HTMLLIElement;
      loadingEl.style.display = "none";

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
