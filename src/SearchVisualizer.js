import "./App.css";
import React from "react";
import Navbar from "./Navbar/Navbar";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import BubbleSort from "./SearchAlgos/BubbleSort";
import Tutorial from "./Tutorial";
import mergeSortHelper from "./SortAlgos/MergeSort";
import quickSortHelper from "./SortAlgos/QuickSort";

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

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
  async animate(array, animations){
    // Applying animations
    for (let i = 0; i < animations.length; ++i){
      array[animations[i][0]] = animations[i][1];
      this.setState({heightValues : array});
      await this.sleep(0.01);
    } 
  }
  quickSortClicked(){
    // Checking if already sorted 
    let sorted = this.state.isSorted;
    if (sorted){return;}
    this.setState({isSorted: true});

    // Defining heightValues and making deep copy 
    let heightVals = this.state.heightValues;
    let newHeightVals = [...heightVals];

    // Filling queue of animations through mergesort 
    let animations = quickSortHelper(heightVals);

    // Applying animations with delay
    this.animate(newHeightVals, animations);
  }
  
  mergeSortClicked(){
    // Checking if already sorted 
    let sorted = this.state.isSorted;
    if (sorted){return;}
    this.setState({isSorted: true});

    // Defining heightValues and making deep copy 
    let heightVals = this.state.heightValues;
    let newHeightVals = [...heightVals];

    // Filling queue of animations through mergesort 
    let animations = mergeSortHelper(heightVals);

    // Applying animations
    this.animate(newHeightVals, animations);
  }

  async bubblesort() {
    const heightVals = this.state.heightValues;
    // Bubble sort algorithm
    const n = heightVals.length;
    for(let i = 0; i < n; ++i) {
      for (let j = 0; j < n; j++) {
        if (j !== n - 1 && heightVals[j + 1] < heightVals[j]) {
          let temp = heightVals[j + 1];
          heightVals[j + 1] = heightVals[j];
          heightVals[j] = temp;
        }
      }
      this.setState({heightValues : heightVals});
      await this.sleep(7);
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
            <button className="sort--button" onClick={() => this.bubblesort()}>
              Bubble Sort
            </button>
            <button className="sort--button" onClick={() => this.mergeSortClicked()}>
                Merge Sort
            </button>
            <button className="sort--button" onClick={() => this.quickSortClicked()}>
                Quick Sort
            </button>
          </div>
        </div>
      </>
    );
  }
}
