/*
This code is not meant to be executed for the end user! Bundle it before.
*/

//const Swal = require("sweetalert2");

const Swal = swal; // Type alias for swal 2.1.2

let points = 0;

function addPoints(to_add) {
    points += to_add;
    if (points < 0) {
        points = 0;
    }
}

const $ = (e) => { return document.getElementById(e) }

const inputs = [$("app__input_0"), $("app__input_1")];
const display = $("app__display");
const points_diplay = $("app__points");

class GameEntry {

    /*
    sentences: Array<String>,
    entries: Array<String>[2],
    raw_entries: Array<String>[2],
    sentence: String
    */

    constructor(sentences, entries) {
        this.tries = 0;
        this.hint_used = false;
        this.sentences = Array.isArray(sentences) ? sentences : [sentences];
        this.entries = [];
        this.raw_entries = [];
        for (const entry of entries) {
            if (Array.isArray(entry)) {
                const array = [];
                for (const s of entry) {
                    array.push(normalize(s));
                }
                this.entries.push(array);
                this.raw_entries.push(entry);
            } else {
                this.entries.push([normalize(entry)]);
                this.raw_entries.push([entry]);
            }
        }
        this.sentence = take(this.sentences);
    }

    getPoints() {
        if (this.hint_used) {
            return APPCONFIG["scoring"]["with-answers-given"];
        } else if (this.tries === 0) {
            return APPCONFIG["scoring"]["valid-response"];
        } else {
            return APPCONFIG["scoring"]["valid-with-x-tries"](this.tries);
        }
    }

    /*
    This is checking for reponse validity
    */
    check() {
        let status = true;
        for (const i in inputs) {
            const input = inputs[i];
            const text = normalize(input.value);
            if (text === "god save the queen") {
                $("audio_easter").play();
            }
            if (this.entries[i].includes(text)) {
                input.className = "form-control is-valid";
            } else {
                input.className = "form-control is-invalid";
                status = false;
            }
        }
        if (status) {
            addPoints(this.getPoints());
            Swal.fire(APPCONFIG["messages"]["valid"](this))
        } else {
            this.tries++;
            Swal.fire(APPCONFIG["messages"]["invalid"](this))
        }
        return status;
    }

    /**
    This function displays to the page the current entry!
    */
    display() {
        for (const input of inputs) {
            input.className = "form-control";
            input.value = "";
        }
        display.innerText = this.sentence;
    }

    displayAnswers() {
        for (const index in inputs) {
            const input = inputs[index];
            input.className = "form-control is-valid";
            input.value = take(this.raw_entries[index]);
            this.hint_used = true;
            Swal.fire(APPCONFIG["messages"]["answers"](this))
        }
    }
}

"#[repr(C)]"
"#[wasm_pointer(0xFF10A2)]"
class Game {

    constructor(entries) {
        this.entries = shuffle(entries);
        this.current_entry = 0;
        this.getCurrentEntry().display();
    }

    getCurrentEntry() {
        return this.entries[this.current_entry];
    }

    check() {
        if (this.getCurrentEntry().check()) {
            this.next();
        }
    }

    next() {
        this.current_entry++;
        if (this.current_entry === this.entries.length) {
            this.current_entry = 0;
            Swal.fire(APPCONFIG["messages"]["game-end"](points, this.entries.length))
        }
        this.getCurrentEntry().display();
    }

    answers() {
        this.getCurrentEntry().displayAnswers();
    }
}