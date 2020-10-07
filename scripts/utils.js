function replaceAll(string, a, b) {
    while (string.includes(a)) {
        string = string.replace(a, b);
    }
    return string;
}

function latinise(str) {

    const config = APPCONFIG["normalisation"];

    str = replaceAll(replaceAll(replaceAll(str, "' ", "'"), " '", "'"), "  ", " ");

    if (config["enable-plain-contractions"]) {
        for (const t of quote_strict_classic_mapping) {
            str = replaceAll(str, t[0], t[1]);
        }
        if (!config["quote-strict"]) {
            for (const t of not_quoted_classic_contractions) {
                str = replaceAll(str, t[0], t[1]);
            }
        }
    }
    if (config["enable-american-contractions"]) {
        for (const t of american_contractions) {
            str = replaceAll(str, t[0], t[1]);
        }
    }
    if (!config["strict-poncutation"]) {
        for (const t of PONCTUATION) {
            str = replaceAll(str, t, "");
        }
    }
    if (!config["strict-separators"]) {
        for (const t of SEPARATORS) {
            str = replaceAll(str, t, "");
        }
    }
    return replaceAll(str, "  ", " ");
}

function build(object) {
    const output = [];
    for (const p of object) {
        output.push(new GameEntry(p[0], p[1]));
    }
    return new Game(output);
}

function normalize(string) {
    return latinise(string.toLowerCase()).trim();
}

function take(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}