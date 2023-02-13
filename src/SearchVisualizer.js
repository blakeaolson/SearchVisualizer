import "./App.css";
import React from "react";
import Navbar from "./Navbar/Navbar";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import BubbleSort from "./SortAlgos/BubbleSort";
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

    let heightValues = [];
    while (heightValues.length < 197) {
      heightValues.push(Math.floor(Math.random() * 500) + 10); // Intialize 200 heightvals from range 10 to 500
    }

    let navbuttons = document.getElementsByClassName("button");
    for (let i = 0; i < 6; i++) {
      navbuttons[i].style.setProperty("--navbutton-background-color", "#666666"); // set to grey
      navbuttons[i].style.setProperty("--navbutton-hovor-color", "#666666"); // set hover to grey
    }

    if (autoSort) {
      heightValues = BubbleSort(heightValues); // BubbleSort external function does not animate
      this.setState({ isSorted: true });
    } else {
      this.setState({ isSorted: false });
    }

    this.setState({
      heightValues: heightValues,
      barActivated: false,
      activatedKey: [],
    });
  }

  resetGraph() {
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
    const barActivated = this.state.barActivated;
    const isSorted = this.state.isSorted;
    const heightValues = this.state.heightValues;
    const prevKey = this.state.activatedKey;
    
    if (barActivated) {
      // Resetting color of graph
      for (let i = 0; i < heightValues.length; i++) {
        var elem = document.getElementsByClassName("bar")[i];
        elem.style.backgroundColor = "white";
        elem.style.setProperty("--td-background-color", "#6495ed");
      }
    }

    let activatedBar = document.getElementById(key);
    activatedBar.style.backgroundColor = "#0096FF";

    // Changing color to show activation
    let bElem = document.getElementsByClassName("button");
    if (isSorted) {
      for (let i = 0; i < 6; i++) {
        bElem[i].style.setProperty("--navbutton-background-color", "#ffffff");
        bElem[i].style.setProperty("--navbutton-hovor-color", "#a8a8c2");
      }
    }

    // Update linear search button due to its non reliance on a sorted input
    bElem[0].style.setProperty("--navbutton-background-color", "#ffffff");
    bElem[0].style.setProperty("--navbutton-hovor-color", "#a8a8c2");

    this.setState({
      barActivated: true,
      activatedKey: [key],
    });
  }

  async animate(array, animations){
    for (let i = 0; i < animations.length; ++i){
      array[animations[i][0]] = animations[i][1];
      this.setState({heightValues : array});
      await this.sleep(1);
    } 
  }

  quickSortClicked(){
    let sorted = this.state.isSorted;
    if (sorted){return;}
    
    // Must make a deep copy to pass to animate function 
    let heightVals = this.state.heightValues;
    let newHeightVals = [...heightVals];

    let animations = quickSortHelper(heightVals);
    this.animate(newHeightVals, animations);

    this.setState({isSorted: true});
  }
  
  mergeSortClicked(){
    let sorted = this.state.isSorted;
    if (sorted){return;}

    // Must make a deep copy to pass to animate function 
    let heightVals = this.state.heightValues;
    let newHeightVals = [...heightVals];

    let animations = mergeSortHelper(heightVals);
    this.animate(newHeightVals, animations);

    this.setState({isSorted: true});
  }

  async bubblesort() {
    const heightVals = this.state.heightValues;

    const n = heightVals.length;
    for(let i = 0; i < n; ++i) {
      for (let j = 0; j < i; j++) {
        if (heightVals[i] < heightVals[j]) {
          let temp = heightVals[j];
          heightVals[j] = heightVals[i];
          heightVals[i] = temp;
        }
      }
      this.setState({heightValues : heightVals});
      await this.sleep(10); // Bubble sort is so slow that it must be animated in only the outer loop
    }
    
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
