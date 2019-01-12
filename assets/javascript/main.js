var wins = 0;
var losses = 0;
var counter = 0;
var targetNumber = 0;

var images = [
    "./assets/images/crystal1.jpeg",
    "./assets/images/crystal2.jpeg",
    "./assets/images/crystal3.jpeg",
    "./assets/images/crystal4.jpeg"
];

/**
 * Generates 4 random numbers between 1 and 20 for crystal values
 * Final results are pushed to the numberOptions array
 */
function makeNumberOptions() {
    var numberOptions = [];

    for (var i = 0; i < 4; i++) {
        var number = 1 + Math.floor(Math.random() * 20);
        numberOptions.push(number);
    }

    return numberOptions;
}

/**
 *Assigns crystal elements based on the numberOptions array
 */
function makeCrystals(numberOptions) {
    // Clear any crystals already set.
    var crystalsContainer = $("#crystals");
    crystalsContainer.html(''); // TODO: Is this right?

    // Make a crystal for each number option.
    for (var i = 0; i < numberOptions.length; i++) {

        // For each iteration, we will create an imageCrystal
        var imageCrystal = $("<img>");

        // First each crystal will be given the class ".crystal-image".
        // This will allow the CSS to take effect.
        imageCrystal.addClass("crystal-image");

        // Each imageCrystal will be given a src link to the crystal image
        imageCrystal.attr("src", images[i]);

        // Each imageCrystal will be given a data attribute called data-crystalValue.
        // This data attribute will be set equal to the array value.
        imageCrystal.attr("data-crystalvalue", numberOptions[i]);

        // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
        crystalsContainer.append(imageCrystal);
    }
}

function initializeGame() {
    var numberOptions = makeNumberOptions();
    makeCrystals(numberOptions);
    $(".crystal-image").on("click", onCrystalClick);

    targetNumber = calculateTargetNumber(numberOptions);
    $("#number-to-guess").text(targetNumber);
}

function calculateTargetNumber(numberOptions) {
    // sum of all numbers * 5.
    var sum = numberOptions.reduce(function (a, b) {
        return a + b;
    }, 0);

    return sum * 5;
}

function onCrystalClick() {
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    // We then add the crystalValue to the user's "counter" which is a global variable.
    // Every click, from every crystal adds to the global counter.
    counter += crystalValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    $('#counter').html(counter);
    $('#wins').html(wins);
    $('#losses').html(losses);

    if (counter === (targetNumber)) {
        alert("You're a Winner Baby!!!");
        wins = wins + 1;
        counter = 0;
        $('#wins').html(wins);
        $('#counter').html(counter);

        initializeGame();  // Reset the game.
    } else if (counter >= targetNumber) {
        alert("Sashay away!!");
        losses = losses + 1;
        counter = 0;
        $('#losses').html(losses);
        $('#counter').html(counter);
        initializeGame();
    }
}

/**
 *Determining the crystal's value requires us to extract the value from the data attribute.
 Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
 Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
 Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
 */


$(document).ready(function() {
    initializeGame();
});

// makeNumberOptions();
// iterate through the crystal values to come up with a random number

// add up the values from the tally and compare to random number value

//when tally is equal to random number value alert you win or you lose if score is over

//restart game when either you win or you lose is selected

//when game restarts wins and losses scores should stay the same so do not refresh the page



