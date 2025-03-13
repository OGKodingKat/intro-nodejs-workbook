// Here is where you will write your bill splitter code
// this is dynamic or user generate
let bill = Number(process.argv[2]);
let tipPercentage = Number(process.argv[3]) / 100;
let numGuests = Number(process.argv[4]);


//Business Logic
let tipAmount = bill * tipPercentage;
let total = bill + tipAmount;
let amountOwedPerGuest = total / numGuests;

console.log(`Each guest owes $${amountOwedPerGuest}`);
// console.log(process.argv);