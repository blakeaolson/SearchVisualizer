export default function BinarySearch(heightValues, keyValue) {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function BinarySearchAlgo(
    heightValues,
    keyValue,
    low = 0,
    high = heightValues.length - 1
  ) {
    // Finding a value by splitting the array in half
    let searchKey;
    searchKey = Math.floor(low + (high - low) / 2);

    let element = document.getElementById(searchKey);
    element.style.backgroundColor = "#D22B2B";
    element.style.setProperty("--td-background-color", "#D22B2B");

    // Changing the bounds of the function depending on the range of the value
    if (searchKey === keyValue) {
      await sleep(100);
      return true;
    } else if (searchKey > keyValue) {
      await sleep(100);
      return BinarySearchAlgo(heightValues, keyValue, low, searchKey - 1);
    } else if (searchKey < keyValue) {
      await sleep(100);
      return BinarySearchAlgo(heightValues, keyValue, searchKey + 1, high);
    }
    return low === keyValue ? true : false;
  }
  return BinarySearchAlgo(heightValues, keyValue);
}
