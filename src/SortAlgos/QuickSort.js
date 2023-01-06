export default function quickSortHelper(heightVals){
    let animations = [];
    let lo = 0;
    let hi = heightVals.length - 1;
    quicksort(heightVals, lo, hi, animations);
    return animations;
}

function swap(heightVals, val1, val2, animations){
    let temp = heightVals[val1];
    animations.push([val1, heightVals[val2]]);
    heightVals[val1] = heightVals[val2];
    animations.push([val2, temp]);
    heightVals[val2] = temp;
}

function quicksort(heightVals, lo, hi, animations){
    if (lo >= hi){return;}

    // Partitioning middle and returning position
    let index = partition(heightVals, lo, hi, animations);

    // Divide and conquer recursive method 
    quicksort(heightVals, lo, index - 1, animations);
    quicksort(heightVals, index, hi, animations);
}

function partition(heightVals, left, right, animations){
    // Use middle index as pivot 
    let pivot_index = Math.floor((left + right) / 2);
    let pivot = heightVals[pivot_index];

    while (left <= right){
        // Find element on left that should be right
        while (heightVals[left] < pivot){left++;}

        // Find element on right that should be left 
        while (heightVals[right] > pivot){right--;}

        // Swap elements and move left and right indices
        if (left <= right){
            swap(heightVals, left, right, animations);
            left++;
            right--;
        }
    }
    return left;
}
