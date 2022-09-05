export default async function FibonacciSearch(heightVals, keyValue) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // Finding fiboonacci numbers
  var fibMm2 = 0;
  var fibMm1 = 1;
  var fibM = 1;
  while (fibM < heightVals.length) {
    let temp = fibMm1;
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM = fibM + temp;
  }

  // While there are conditions to be searched
  let offset = 0;
  while (fibM > 1) {
    // validating fibMm2
    let i = Math.min(offset + fibMm2, heightVals.length - 1);

    // Changing color of data bar
    let element = document.getElementById(i);
    element.style.backgroundColor = "#D22B2B";
    element.style.setProperty("--td-background-color", "#D22B2B");
    // performing algorithm
    if (i < keyValue) {
      fibM = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i;
      await sleep(100);
    } else if (i > keyValue) {
      fibM = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
      await sleep(100);
    } else return heightVals[i];
  }
  if (fibMm1 && heightVals[offset + 1] === keyValue) {
    return heightVals[offset + 1];
  }
  return false;
}
