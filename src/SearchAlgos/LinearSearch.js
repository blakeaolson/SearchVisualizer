export default function LinearSearch(heightValues, keyValue) {
  var i = 0;
  function iterate() {
    setTimeout(function () {
      let element = document.getElementById(i);
      element.style.backgroundColor = "#D22B2B";
      element.style.setProperty("--td-background-color", "#D22B2B");
      if (i === keyValue) {
        return true;
      }
      i++;
      if (i < heightValues.length) {
        iterate();
      }
    }, 5);
    return false;
  }
  iterate();
}
