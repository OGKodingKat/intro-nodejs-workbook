// Create Node.js app that determines the astrological and zodiac signs for the user based on their birthday. Refer to the README instructions.
import horoscope from "horoscope";

const [month, day, year] = process.argv.slice(2).map(Number);

if (isNaN(month) || isNaN(day) || isNaN(year)) {
    console.error("Please provide a valid date: month day year (e.g., 6 12 1998)");
    process.exit(1);
}

const astroSign = horoscope.getSign({ month, day });
const zodiacSign = horoscope.getZodiac(year);

console.log(`Your astrological sign is ${astroSign} and your zodiac sign is ${zodiacSign}.`);


