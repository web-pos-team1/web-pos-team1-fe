export function convertCategory(inputVal: any) {
  let retVal = '';
  if (inputVal === '과일') {
    retVal = 'fruits'
  } else if (inputVal === '채소') {
    retVal = 'vegetables';
  } else if (inputVal === '정육-계란') {
    retVal = 'meetAndEgg';
  } else if (inputVal === '수산') {
    retVal = 'seafood';
  } else if (inputVal === '쌀-견과') {
    retVal = 'mealAndNuts';
  } else if (inputVal === '우유-유제품') {
    retVal = 'milk';
  } else if (inputVal === '간식') {
    retVal = 'snack';
  } else if (inputVal === '소스-오일') {
    retVal = 'sourceAndOil';
  } else if (inputVal === '선물류') {
    retVal = 'gift';
  }
  return retVal;
}