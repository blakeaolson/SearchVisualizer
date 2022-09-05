export default async function TernarySearch(
  heightValues,
  keyValue,
  l = 0,
  r = heightValues.length - 1
) {
  // Delay Function
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  let mid1 = Math.ceil(l + (r - l) / 3);
  let mid2 = Math.ceil(r - (r - l) / 3);

  // Changing color of boundaries
  let elem1 = document.getElementById(mid1);
  let elem2 = document.getElementById(mid2);
  elem1.style.backgroundColor = "#D22B2B";
  elem1.style.setProperty("--td-background-color", "#D22B2B");
  elem2.style.backgroundColor = "#D22B2B";
  elem2.style.setProperty("--td-background-color", "#D22B2B");

  // Performing recurisve operation to find index
  if (mid1 === keyValue) {
    return true;
  } else if (mid2 === keyValue) {
    return true;
  } else if (keyValue > mid1 && keyValue < mid2) {
    await sleep(150);
    return TernarySearch(heightValues, keyValue, mid1, mid2);
  } else if (keyValue < mid1 && keyValue < mid2) {
    await sleep(150);
    return TernarySearch(heightValues, keyValue, l, mid1);
  } else if (keyValue > mid1 && keyValue > mid2) {
    await sleep(150);
    return TernarySearch(heightValues, keyValue, mid2, r);
  }
  return false;
}
