// export function formatMoney(inputVal:number) {
//     const outputVal = inputVal.toString()
//     .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
//   return outputVal+'원';
// }

export function formatMoney(inputVal:number) {
  const outputVal = inputVal.toString()
  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
return outputVal;
}