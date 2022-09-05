import "./App.css";
import React from "react";
import Navbar from "./Navbar/Navbar";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import BubbleSort from "./SearchAlgos/BubbleSort";
import Tutorial from "./Tutorial";

export default class SearchVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heightValues: [],
      barActivated: false,
      activatedKey: [],
      autoSort: false,
      isSorted: false,
    };
  }

  componentDidMount() {
    this.createGraph();
  }

  createGraph() {
    const autoSort = this.state.autoSort;

    // Creating new height values
    let heightValues = [];
    while (heightValues.length < 197) {
      heightValues.push(Math.floor(Math.random() * 500) + 10);
    }

    // Changing the color of the buttons to grey
    let elements = document.getElementsByClassName("button");
    for (let i = 0; i < 6; i++) {
      elements[i].style.setProperty("--navbutton-background-color", "#666666");
      elements[i].style.setProperty("--navbutton-hovor-color", "#666666");
    }
    // Updating graph depending on autoSort
    if (autoSort) {
      // if sorted
      heightValues = BubbleSort(heightValues);
      this.setState({ isSorted: true });
    } else {
      // if not sorted
      this.setState({ isSorted: false });
    }
    // Updating the state of the height of the bars and setting activation to false
    this.setState({
      heightValues: heightValues,
      barActivated: false,
      activatedKey: [],
    });
  }

  resetGraph() {
    // Creates the graph and its default values
    this.createGraph();
    const heightValues = this.state.heightValues;

    // Resetting the activated bar to its original color
    for (let i = 0; i < heightValues.length; i++) {
      var elem = document.getElementsByClassName("bar")[i];
      elem.style.backgroundColor = "white";
      elem.style.setProperty("--td-background-color", "#6495ed");
    }
  }

  barClicked(key) {
    const saveKey = key;
    const barActivated = this.state.barActivated;
    const isSorted = this.state.isSorted;
    const heightValues = this.state.heightValues;
    if (barActivated) {
      // Resetting the activated bar to its original color
      for (let i = 0; i < heightValues.length; i++) {
        var elem = document.getElementsByClassName("bar")[i];
        elem.style.backgroundColor = "white";
        elem.style.setProperty("--td-background-color", "#6495ed");
      }
    }
    // Activate the selected Bar
    let barElement = document.getElementById(key);
    barElement.style.backgroundColor = "#0096FF";

    // If its sorted change the color of the buttons to display activation
    let bElem = document.getElementsByClassName("button");
    if (isSorted) {
      for (let i = 0; i < 6; i++) {
        bElem[i].style.setProperty("--navbutton-background-color", "#ffffff");
        bElem[i].style.setProperty("--navbutton-hovor-color", "#a8a8c2");
      }
    }

    // Update linear regardless due to its non reliance on a sorted input
    bElem[0].style.setProperty("--navbutton-background-color", "#ffffff");
    bElem[0].style.setProperty("--navbutton-hovor-color", "#a8a8c2");

    // Set the state of barActivated
    this.setState({
      barActivated: true,
      activatedKey: [saveKey],
    });
  }

  async sort() {
    // Delay function
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const heightVals = this.state.heightValues;
    var sorted = false;

    // Sorting algorithm
    while (!sorted) {
      var checkSorted = false;
      for (let i = 0; i < heightVals.length; i++) {
        if (i !== heightVals.length - 1) {
          if (heightVals[i + 1] < heightVals[i]) {
            let temp = heightVals[i + 1];
            heightVals[i + 1] = heightVals[i];
            heightVals[i] = temp;
            checkSorted = true;
            this.setState({ heightValues: heightVals });
          }
        }
      }
      await sleep(7);
      if (checkSorted === false) {
        sorted = true;
      }
    }
    // Setting the value of isSorted to true
    this.setState({ isSorted: true });
  }

  render() {
    const heightValues = this.state.heightValues;
    const keyValue = this.state.activatedKey[0];
    const autoSort = this.state.autoSort;
    const isSorted = this.state.isSorted;
    const barActivated = this.state.barActivated;
    return (
      <>
        <Navbar
          heightValues={heightValues}
          keyValue={keyValue}
          isSorted={isSorted}
          barActivated={barActivated}
        />
        <Tutorial></Tutorial>
        <div className="barChart">
          {heightValues.map((value, key) => (
            <div
              className="bar"
              key={key}
              id={key}
              style={{ height: `${value}px` }}
              onClick={() => this.barClicked(key)}
            ></div>
          ))}
        </div>
        <div className="bottom">
          <div className="AutoSort">
            <h4 className="ToggleLabel">AutoSort</h4>
            <ToggleSwitch
              className="autosort--button"
              isOn={autoSort}
              handleToggle={() => this.setState({ autoSort: !autoSort })}
            ></ToggleSwitch>
          </div>
          <div className="buttons">
            <button className="reset--button" onClick={() => this.resetGraph()}>
              Reset
            </button>
            <button className="sort--button" onClick={() => this.sort()}>
              Bubble Sort
            </button>
          </div>
        </div>
      </>
    );
  }
}
