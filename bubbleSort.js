const num = [20, 12, 5, 3, 1];

function numbers(num) {
    for (let i = 0; i < num.length - 1; i++) {
        for (let j = 1; j < num.length - i; j++) {
            if (num[j] < num[j - 1]) {
                let temp = num[j];
                num[j] = num[j - 1];
                num[j - 1] = temp;
            }
        }
    }
    return num;
}

console.log("قبل الترتيب:", num);
numbers(num);
console.log("بعد الترتيب:", num);