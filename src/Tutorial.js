import React from "react";
import "./Tutorial.css";
import bars from "./Images/bars.png";
import selectedbar from "./Images/selectedbar.png";
import linearSearch from "./Images/linearSearch.png";
import sorted from "./Images/sorted.png";

export default function Tutorial() {
  var [count, updateCount] = React.useState(0);
  const tutorialInfo = {
    h3Text: [
      "This tutorial will show you how to use the different algorithms that this website features",
      "To start, click on any data bar and it will light up blue",
      "Most algorithms require the data to be sorted. Click Bubble Sort to sort the data or toggle AutoSort.",
      "Click one of the search algorithms at the top to visualize it!",
      "Click a new bar or reset the graph to try other algorithms",
    ],
    h1Text: [
      "Welcome to Search Algorithm Visualizer!",
      "Choosing a search value",
      "Sorting the data",
      "Click a search algorithm!",
      "Resetting and more",
    ],
    images: [
      bars,
      selectedbar,
      sorted,
      linearSearch,
      bars,
    ],
  };
  function exit() {
    let element = document.getElementById("tutorial");
    element.style.display = "none";
  }
  function next() {
    if (count < 4) {
      updateCount(count + 1);
      count++;
    }
    let header1 = document.getElementById("header1");
    header1.innerHTML = tutorialInfo.h1Text[count];
    let header3 = document.getElementById("text");
    header3.innerHTML = tutorialInfo.h3Text[count];
    let img = document.getElementById("img");
    img.src = tutorialInfo.images[count];
  }
  function prev() {
    if (count > 0) {
      updateCount(count - 1);
      count--;
    }
    let header1 = document.getElementById("header1");
    header1.innerHTML = tutorialInfo.h1Text[count];
    let header3 = document.getElementById("text");
    header3.innerHTML = tutorialInfo.h3Text[count];
    let img = document.getElementById("img");
    img.src = tutorialInfo.images[count];
  }
  return (
    <div className="tutorial" id="tutorial">
      <h1 className="header" id="header1">
        {tutorialInfo.h1Text[0]}
      </h1>
      <h3 className="text" id="text">
        {tutorialInfo.h3Text[0]}
      </h3>
      <img src={tutorialInfo.images[0]} id="img" className="img"></img>
      <button className="exitButton" onClick={exit}>
        Exit
      </button>
      <button className="tutPrevButton" onClick={() => prev()}>
        Prev
      </button>
      <h2 className="counter">{count + 1}/5</h2>
      <button className="tutNextButton" onClick={() => next()}>
        Next
      </button>
    </div>
  );
}
