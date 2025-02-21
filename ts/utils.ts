//////////////////////////////////////////////////////////////
// Utility
//////////////////////////////////////////////////////////////

/**
 * CSSのremをpxに変換した値を取得
 * @param {number} number - 取得したい値
 * @returns {number} remをpxに変換した数値
 */
export function getRemToPx(number: number): number {
  const root = document.documentElement; // htmlのルート要素を取得
  const rootFontSize = window.getComputedStyle(root).getPropertyValue("font-size"); // rootのフォントサイズを取得(〇〇px);
  const rem = parseFloat(rootFontSize); // 数字に変換
  return rem * number;
}
