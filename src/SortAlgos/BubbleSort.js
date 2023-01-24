export default function BubbleSort(heightVals) {
  const n = heightVals.length
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j !== n - 1 && heightVals[j + 1] < heightVals[j]) {
        let temp = heightVals[j + 1];
        heightVals[j + 1] = heightVals[j];
        heightVals[j] = temp;
      }
    }
  }
  return heightVals;
}
