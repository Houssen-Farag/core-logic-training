function myBinarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1; 
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] > target) { 
            high = mid - 1;
        } else { 
            low = mid + 1;
        }
    }
    
    return -1; 
}

const myNumbers = [2, 5, 12, 16, 17, 23, 27, 37, 60, 91, 98];


console.log("موقع الرقم 23 هو الفهرس:", myBinarySearch(myNumbers, 23)); 
console.log("موقع الرقم 100 هو الفهرس:", myBinarySearch(myNumbers, 100));