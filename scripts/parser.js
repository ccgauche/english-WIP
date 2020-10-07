let APPDATA;
let APPCONFIG;

function init() {

    APPDATA = [
        ["You taked the bus!", ["Did I take the bus?", "You didn't take the bus!"]],
        ["My phone number is +33 621 232 010!", ["What is your phone number?", "My phone number is not +33 621 232 010!"]],
        ["I like climbing!", [["What do you like?", "What is your favorite sport?"], "I don't like climbing!"]],
    ];

    APPCONFIG = {
        "normalisation": {
            "enable-plain-contractions": true, // Can `I'm` `haven't`... be used
            "enable-american-contractions": true, // Can `wanna` `gona` ... be used
            "quote-strict": false, // Make ' mandatory in contractions if enabled `theyre` will not be possible
            "strict-poncutation": false, // Make ! . ? required for the answer to be valid
            "strict-separators": false, // Make , ; : required for the answer to be valid
        },
        "scoring": {
            "valid-response": 3,
            "valid-with-x-tries": (tries) => {
                return Math.max(3 - tries, 0)
            },
            "with-answers-given": 0
        },
        "messages": {
            "answers": (entry) => {
                return {
                    icon: 'warning',
                    title: 'Answers showed!',
                    footer: 'When you show answers you don\'t get points for the current sentence!'
                };
            },
            "invalid": (entry) => {
                return {
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You made an error.'
                };
            },
            "valid": (entry) => {
                const points = entry.getPoints();
                if (points === 0) {
                    if (entry.hint_used) {
                        return {
                            icon: 'success',
                            title: 'Good job',
                            text: 'You earned no point!',
                            footer: 'When you show answers you don\'t get points for the current sentence!'
                        };
                    }
                    return {
                        icon: 'success',
                        title: 'Good job',
                        text: 'You earned no point!',
                    };
                } else if (points === 1) {
                    return {
                        icon: 'success',
                        title: 'Good job',
                        text: 'You earned a point!'
                    };
                } else {
                    return {
                        icon: 'success',
                        title: 'Good job',
                        text: 'You earned ' + points + ' points!',
                    };
                }
            },
            "game-end": (points, entries_number) => {
                return {
                    icon: 'success',
                    title: 'Thank\'s for playing!',
                    text: 'You got a total of ' + points + ' point' + (points > 1 ? 's' : '') + ' (' + Math.floor(APPCONFIG["scoring"]["valid-response"] * entries_number / points * 1000) / 10 + ')',
                };
            },
        }
    }

}

init();