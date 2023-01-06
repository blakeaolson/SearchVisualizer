import "./Navbar.css";
import LinearSearch from "../SearchAlgos/LinearSearch";
import React from "react";
import BinarySearch from "../SearchAlgos/BinarySearch";
import JumpSearch from "../SearchAlgos/JumpSearch";
import TernarySearch from "../SearchAlgos/TernarySearch";
import ExponentialSearch from "../SearchAlgos/ExponentialSearch";
import FibonacciSearch from "../SearchAlgos/Fibonacci";

function Navbar(props) {
  // Resetting Color function
  function resetColor() {
    for (let i = 0; i < props.heightValues.length; i++) {
      let element = document.getElementById(i);
      if (i !== props.keyValue) {
        element.style.backgroundColor = "white";
        element.style.setProperty("--td-background-color", "#6495ed");
      } else {
        element.style.backgroundColor = "#0096FF";
      }
    }
  }
  // Defining all activation variables to prevent duplicate
  var linearActivate = true;
  var binaryActivate = true;
  var jumpActivate = true;
  var ternaryActivate = true;
  var exponentialActivate = true;
  var fibonacciActivate = true;

  // Function to activate all buttons
  function activateAll() {
    linearActivate = true;
    binaryActivate = true;
    jumpActivate = true;
    ternaryActivate = true;
    exponentialActivate = true;
    fibonacciActivate = true;
  }

  // ON CLICK FUNCS
  function onLinearClick() {
    if (linearActivate && props.barActivated) {
      activateAll();
      linearActivate = false;
      resetColor();
      LinearSearch(props.heightValues, props.keyValue);
    }
  }

  function onBinaryClick() {
    if (binaryActivate && props.isSorted && props.barActivated) {
      activateAll();
      binaryActivate = false;
      resetColor();
      BinarySearch(props.heightValues, props.keyValue);
    }
  }

  function onJumpClick() {
    if (jumpActivate && props.isSorted && props.barActivated) {
      activateAll();
      jumpActivate = false;
      resetColor();
      JumpSearch(props.heightValues, props.keyValue);
    }
  }

  function onTernaryClick() {
    if (ternaryActivate && props.isSorted && props.barActivated) {
      activateAll();
      ternaryActivate = false;
      resetColor();
      TernarySearch(props.heightValues, props.keyValue);
    }
  }
  function onExponentialClick() {
    if (exponentialActivate && props.isSorted && props.barActivated) {
      activateAll();
      exponentialActivate = false;
      resetColor();
      ExponentialSearch(props.heightValues, props.keyValue);
    }
  }
  function onFibonacciClick() {
    if (fibonacciActivate && props.isSorted && props.barActivated) {
      activateAll();
      fibonacciActivate = false;
      resetColor();
      FibonacciSearch(props.heightValues, props.keyValue);
    }
  }
  if (props.isSorted && props.barActivated) {
    let elements = document.getElementsByClassName("button");
    for (let i = 0; i < 6; i++) {
      elements[i].style.setProperty("--navbutton-background-color", "#ffffff");
      elements[i].style.setProperty("--navbutton-hovor-color", "#a8a8c2");
    }
  }

  // Displaying the navbar
  return (
    <nav className="navbar">
      <h1 className="title">Search Algorithm Visualizer</h1>
      <button className="button" onClick={onLinearClick}>
        Linear search
      </button>
      <button className="button" onClick={onBinaryClick}>
        Binary search
      </button>
      <button className="button" onClick={onJumpClick}>
        Jump search
      </button>
      <button className="button" onClick={onTernaryClick}>
        Ternary search
      </button>
      <button className="button" onClick={onExponentialClick}>
        Exponential Search
      </button>
      <button className="button" onClick={onFibonacciClick}>
        Fibonacci search
      </button>
    </nav>
  );
}
export default Navbar;
