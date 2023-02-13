export default function BubbleSort(heightVals) {
  const n = heightVals.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (heightVals[i] < heightVals[j]) {
        let temp = heightVals[j];
        heightVals[j] = heightVals[i];
        heightVals[i] = temp;
      }
    }
  }
  return heightVals;
}
