function testFunction(a, b) {
  let sum = a + b;
  let printDifference = () => {
    console.log(a - b);
  }
  return [sum, printDifference]
}

let [sum, printDifference] = testFunction(10, 5)
console.log(sum);
printDifference()