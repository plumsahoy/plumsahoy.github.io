var topics = [];
var topics_string = "";

var ns_topics = [];
var ns_string = "";
var s_topics = [];
var s_string = "";
var pi_topics = [];
var pi_string = "";

var file_topics = [];
var file_string = "";

var manual_topics = [];
var manual_string = "";

var test_topics = "pathologic\r\ndisco elysium\r\nlove island\r\nmasculinity in online gaming\r\nimmersive sims\r\npartition of India 1947\r\nbritish chinese food\r\ntofu is asian cheese\r\nmiddle ages europe\r\nthe byzantine empire";

// assigns elements from HTML for reuse
const def_sub = document.getElementById("display_default");
const fil_sub = document.getElementById("upload_file");
const man_sub = document.getElementById("enter_manual");
const topic_sub = document.getElementById("display_pool");

const display_text = document.getElementById("topic_pool");

const s_button = document.getElementById("spin_button");
const result = document.getElementById("wheel_result");

loadDefault();
var upload_forms = document.getElementsByName("topic_form");
function handleForm(event) { 
    event.preventDefault(); 
} 
for (i = 0; i < upload_forms.length; i++) {
    upload_forms[i].addEventListener('submit', handleForm);
}

async function loadDefault() {
    let ns_list = await getText("plum_ns.txt");
    let s_list = await getText("plum_s.txt");
    let pi_list = await getText("plum_pi.txt");
    ns_string = ns_list;
    s_string = s_list;
    pi_string = pi_list;
    ns_topics = encodeArray(ns_string);
    s_topics = encodeArray(s_string);
    pi_topics = encodeArray(pi_string);
}

async function getTextLocalTest() {
    return test_topics;
}

async function getText(file) {
    let topic_file = await fetch(file);
    let topic_text = await topic_file.text();
    return topic_text;
}

function encodeArray(longstring) {
    if (typeof longstring == 'string') {
        console.log(longstring);
        const new_array = longstring.split(/[\n\r]+/g);
        return new_array;
    }
}

async function defNSReveal() {
    def_sub.style.display = "flex";
    fil_sub.style.display = "none";
    man_sub.style.display = "none";
    topic_sub.style.display = "flex";
    display_text.innerHTML = ns_string;
    if (!Array.isArray(s_topics) || !s_topics.length) {
        unreadyWheel();
    }
    else {
        readyWheel();
    }
}

async function defSReveal() {
    def_sub.style.display = "flex";
    fil_sub.style.display = "none";
    man_sub.style.display = "none";
    topic_sub.style.display = "flex";
    display_text.innerHTML = s_string;
    if (!Array.isArray(s_topics) || !s_topics.length) {
        unreadyWheel();
    }
    else {
        readyWheel();
    }
}

async function defPIReveal() {
    def_sub.style.display = "flex";
    fil_sub.style.display = "none";
    man_sub.style.display = "none";
    topic_sub.style.display = "flex";
    display_text.innerHTML = pi_string;
    if (!Array.isArray(pi_topics) || !pi_topics.length) {
        unreadyWheel();
    }
    else {
        readyWheel();
    }
}

function fileReveal() {
    def_sub.style.display = "none";
    fil_sub.style.display = "flex";
    man_sub.style.display = "none";
    topic_sub.style.display = "flex";
    display_text.innerHTML = file_string;
    if (!Array.isArray(file_topics) || !file_topics.length) {
        unreadyWheel();
    }
}

function manualReveal() {
    def_sub.style.display = "none";
    fil_sub.style.display = "none";
    man_sub.style.display = "flex";
    topic_sub.style.display = "flex";
    display_text.innerHTML = manual_string;
    if (!Array.isArray(manual_topics) || !manual_topics.length) {
        unreadyWheel();
    }
}

async function fileReady() {
    const selectedFile = document.getElementById("guest_file").files[0];
    let file_text = await selectedFile.text();
    file_string = file_text;
    file_topics = encodeArray(file_text);
    display_text.innerHTML = file_string;
    readyWheel();
}

function manualReady() {
    const entries = document.getElementById("guest_text").value;
    manual_string = entries.replace(/ *, */g, "\r\n");
    manual_topics = encodeArray(manual_string);
    display_text.innerHTML = manual_string;
    readyWheel();
}

async function unreadyWheel() {
    s_button.disabled = true;
}

async function readyWheel() {
    s_button.disabled = false;
}

async function spin() {
    let selection = document.querySelector('input[name="topic_type"]:checked').value;
    if (selection == "DEF") {
        let sub_selection = document.querySelector('input[name="sub_topic_type"]:checked').value;
        if (selection == "NON") {
            const random = Math.floor(Math.random() * ns_topics.length);
            result.innerHTML = "Result: " + ns_topics[random];
        }
        if (selection == "SPE") {
            
            const random = Math.floor(Math.random() * s_topics.length);
            result.innerHTML = "Result: " + s_topics[random];
        }
        if (selection == "PER") {
            const random = Math.floor(Math.random() * pi_topics.length);
            result.innerHTML = "result: " + pi_topics[random];
        }
    }
    if (selection == "FIL") {
        
        const random = Math.floor(Math.random() * file_topics.length);
        result.innerHTML = "Result: " + file_topics[random];
    }
    if (selection == "MAN") {
        const random = Math.floor(Math.random() * manual_topics.length);
        result.innerHTML = "result: " + manual_topics[random];
    }
}