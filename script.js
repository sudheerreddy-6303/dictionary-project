const inputE1 = document.getElementById("serach")
const meaningBoxE1 = document.getElementById("meaning-box")
const wordE1 = document.getElementById("word")
const meaningE1 = document.getElementById("meaning")
const audioE1 = document.getElementById("audio")
const infoE1 = document.getElementById("info")



async function getMeaning(word) {

    // console.log(word)

    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        infoE1.classList.remove("hide-it")

        infoE1.innerText = `searching the meaning of ${word}`

        let result = await fetch(apiUrl).then((r) => r.json());
        infoE1.classList.add("hide-it")

        let meaning = result[0].meanings[0].definitions[0].definition;

        // console.log(result[0].meanings[0].definations)
        // console.log(result)

        // console.log(meaning)
        wordE1.innerText = word
        meaningE1.innerText = meaning

        meaningBoxE1.classList.remove("hide-it");
        let sounds = result[0].phonetics;
        let i = sounds.findIndex((el) => {
            // all audio files are stored in the el
            // return mandatry because of it will return audio files
            return el.audio != "";
        })
        // console.log(sounds)
        // console.log(i)

        let audioSrc = result[0].phonetics[i].audio;
        // console.log(audioSrc)
        audioE1.setAttribute("src", audioSrc)


    } catch (error) {
        infoE1.classList.remove("hide-it")

        meaningBoxE1.classList.add("hide-it");

        infoE1.innerText = `sorry, we could not find the meaning of ${word}`

    }
}

inputE1.addEventListener("keyup", (e) => {
    let word = inputE1.value;
    if (word != "" && e.key === "Enter")
        // console.log(word);
        getMeaning(word)
})