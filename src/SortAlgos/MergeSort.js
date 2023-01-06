export default function mergeSortHelper(heightVals){
    // Variables needed for merge sort 
    let lo = 0;
    let hi = heightVals.length - 1;
    let helper = [];
    let animations = [];
    mergeSort(heightVals, helper, lo, hi, animations);
    return animations;
}
function mergeSort(heightVals, helper, lo, hi, animations){
    if (lo >= hi){return;}
    let mid = Math.floor((lo + hi) / 2);
    
    mergeSort(heightVals, helper, lo, mid, animations); // Splitting left
    mergeSort(heightVals, helper, mid + 1, hi, animations); // Splitting right 
    merge(heightVals, helper, lo, mid, hi, animations); // Merging both halves
}

function merge(heightVals, helper, lo, mid, hi, animations){
    // Defining helper array
    for (let i = lo; i <= hi; ++i){
        helper[i] = heightVals[i];
    }
    // Helper variables
    let current = lo;
    let pLeft = lo;
    let pRight = mid + 1;
    // Finding lowest values in both halves
    while (pLeft <= mid && pRight <= hi){
        if (helper[pLeft] <= helper[pRight]){
          animations.push([current, helper[pLeft]]);
          heightVals[current] = helper[pLeft];
          pLeft++;
        }
        else{
          animations.push([current, helper[pRight]]);
          heightVals[current] = helper[pRight];
          pRight++;
        }
        current++;
    }
    // Copying rest of elements
    for (let i = 0; i <= mid - pLeft; ++i){
      animations.push([current + i, helper[pLeft + i]]);
      heightVals[current + i] = helper[pLeft + i];
    }
  }
