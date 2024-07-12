var topics = [];

// assigns elements from HTML for reuse
const s_button = document.getElementById ("spin_button");
const result = document.getElementById("wheel_result");

async function getText(file) {
    let topic_file = await fetch(file);
    let topic_text = await topic_file.text();
    return topic_text;
}

function encodeArray(longstring) {
    let new_array = longstring.split(/[\n\r]+/g);
    return new_array;
}

function encodeTopicEntries() {

}

function defaultTopic() {
    const list_string = getText("topics.txt");
    console.log(list_string);
    topics = encodeArray(list_string);
    readyWheel();
}

function fileTopic() {
    readyWheel();
}

function manualTopic() {
    readyWheel();
}

function readyWheel() {
    s_button.disabled = false;
}

function spin() {
    const random = Math.floor(Math.random() * topics.length);
    result.innerHTML = "Result: " + topics[random];
}