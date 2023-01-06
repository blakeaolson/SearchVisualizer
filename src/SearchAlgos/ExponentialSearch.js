function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Defining Binary Search to be used in Exponential Search
async function BinarySearch(
  heightValues,
  keyValue,
  low = 0,
  high = heightValues.length - 1
) {
  let searchKey;
  if ((high + low) / 2 !== low + 0.5) {
    searchKey = Math.ceil((high + low) / 2);
  } else {
    searchKey = low;
  }
  let element = document.getElementById(searchKey);
  element.style.backgroundColor = "#D22B2B";
  element.style.setProperty("--td-background-color", "#D22B2B");
  if (searchKey === keyValue) {
    await sleep(100);
    return heightValues[keyValue];
  } else if (searchKey > keyValue) {
    await sleep(100);
    return BinarySearch(heightValues, keyValue, low, searchKey);
  } else if (searchKey < keyValue) {
    await sleep(100);
    return BinarySearch(heightValues, keyValue, searchKey, high);
  }
  return false;
}
// Exponential Search
export default async function ExponentialSearch(heightValues, keyValue) {
  if (keyValue === 0) {
    return true;
  }
  var i = 1;
  let element = document.getElementById(0);
  element.style.backgroundColor = "#D22B2B";
  element.style.setProperty("--td-background-color", "#D22B2B");

  while (i <= keyValue) {
    // Finding range to search
    i *= 2;
    if (i > heightValues.length) {
      i = heightValues.length - 1;
    }
    let element = document.getElementById(i);
    element.style.backgroundColor = "#D22B2B";
    element.style.setProperty("--td-background-color", "#D22B2B");
    await sleep(100);
  }
  // Using binary search with the range found
  return BinarySearch(heightValues, keyValue, i / 2, i);
}
