const game = build(APPDATA);

$("app__button_check").addEventListener("click", () => {
    game.check();
})

$("app__button_hint").addEventListener("click", () => {
    game.answers();
})

window.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && document.getElementsByClassName("swal2-shown").length === 0) {
        game.check();
    }
})
for (const i of document.getElementsByTagName("input")) {
    i.addEventListener("keyup", (e) => {
        if (e.key == "Enter" && document.getElementsByClassName("swal2-shown").length === 0) {
            game.check();
        }
    })
}