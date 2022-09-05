export default async function JumpSearch(
  heightValues,
  keyValue,
  lowR = 0,
  highR = 14
) {
  let stepValue = 14;

  // Sleep function
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // Updating visual of selected bars
  let elem1 = document.getElementById(lowR);
  let elem2 = document.getElementById(highR);
  elem1.style.backgroundColor = "#D22B2B";
  elem1.style.setProperty("--td-background-color", "#D22B2B");
  elem2.style.backgroundColor = "#D22B2B";
  elem2.style.setProperty("--td-background-color", "#D22B2B");

  // Recursively performing algorithm
  if (keyValue > highR && keyValue > lowR) {
    await sleep(50);
    return JumpSearch(heightValues, keyValue, highR, highR + stepValue);
  } else if (keyValue < highR && keyValue > lowR) {
    for (let i = lowR; i < highR; i++) {
      await sleep(50);
      let elem = document.getElementById(i);
      elem.style.backgroundColor = "#D22B2B";
      elem.style.setProperty("--td-background-color", "#D22B2B");
      if (i === keyValue) {
        return true;
      }
    }
  }
}
