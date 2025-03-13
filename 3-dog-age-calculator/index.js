// Your code will go here!

let dogName = process.argv[2];
let dogAgeInHumanYears = Number(process.argv[3]);

//Business Logic
let dogFirstYear = 15;
let dogSecondYear = 9;
let dogRemainingYears = 5;
// let totalDogYears = dogFirstYear + dogSecondYear + (dogRemainingYears * (dogAgeInHumanYears - 2));
let dogTotalYears;
if (dogAgeInHumanYears === 1) {
  dogTotalYears = dogFirstYear;
} else if (dogAgeInHumanYears === 2) {
  dogTotalYears = dogFirstYear + dogSecondYear;
} else {
  dogTotalYears =
    dogFirstYear + dogSecondYear + dogRemainingYears * (dogAgeInHumanYears - 2);
}

//RESPONSE: Send the response back to the frontend so that it can be displayed to the user
console.log(`Your dog ${dogName} is ${dogTotalYears} years old in dog years.`);