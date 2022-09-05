export default function BubbleSort(heightVals) {
  var sorted = false;
  while (!sorted) {
    var checkSorted = false;
    for (let i = 0; i < heightVals.length; i++) {
      if (i !== heightVals.length - 1) {
        if (heightVals[i + 1] < heightVals[i]) {
          let temp = heightVals[i + 1];
          heightVals[i + 1] = heightVals[i];
          heightVals[i] = temp;
          checkSorted = true;
        }
      }
    }
    if (checkSorted === false) {
      sorted = true;
    }
  }
  return heightVals;
}
