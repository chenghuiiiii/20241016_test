export function addComma(input) {
  // expect output > num with thousand period comma;
  if (isNaN(input)) return input;
  const splitNum = input.toString().split('.');
  const int = splitNum[0];
  const deci = splitNum[1];
  const intWithComma = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const enterDeci = input.endsWith('.');
  const result = deci ? `${intWithComma}.${deci}` : enterDeci ? `${intWithComma}.` : intWithComma;
  return result;
};

export function getNumberIntervals(intervals) {
  // exprct: check the interval in the array whether overlap or not include in 0-20
  // output: { overlap: Array, notInclude: Array };
  const maxAge = 20;
  const ArrayChecking = new Array(maxAge + 1).fill(0);
  // 0: exclude, 1: picked, 2: overlap
  intervals.forEach((i) => {
    const start = parseInt(i[0]);
    const end = parseInt(i[1]);
    for (let j = start; j <= end; j++) {
      if (ArrayChecking[j] === 0) ArrayChecking[j] = 1;
      else if (ArrayChecking[j] === 1) ArrayChecking[j] = 2;
    }
  })

  let overlap = [];
  let overlapStart = null;
  let notInclude = [];
  let notIncludeStart = null;
  for (let i = 0; i <= maxAge + 1; i++) {
    if (overlapStart === null && notIncludeStart === null) {
      if (ArrayChecking[i] === 0) notIncludeStart = i;
      if (ArrayChecking[i] === 2) overlapStart = i;
    } else {
      if (overlapStart !== null && ArrayChecking[i] !== 2) {
        overlap.push([overlapStart, i - 1]);
        overlapStart = null;
        if (ArrayChecking[i] === 0) notIncludeStart = i;
      }
      if (notIncludeStart !== null && ArrayChecking[i] !== 0) {
        notInclude.push([notIncludeStart, i - 1]);
        notIncludeStart = null;
        if (ArrayChecking[i] === 2) overlapStart = i;
      }
    }
  }

  return { overlap, notInclude };
}