function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.addEventListener("click", function (e) {
    var focusedElement = e.target;
    var div = document.getElementById("prew");
    var popup = document.getElementById("2");

    if (focusedElement.getAttribute("contenteditable") === "true") {
        popup.style.display = "flex";
        div.style.height = "72%";
    } else {
        popup.style.display = "none";
        div.style.height = "82%";
    }
});

// elements
function image() {
    document.getElementById("imageUploader").click();
}
function trash() {
    document.getElementById("prew").innerHTML = "";
}
function detail() {
    document.getElementById("prew").innerHTML += "<details><summary contenteditable='true'>başlık</summary><p contenteditable='true'>metin</p></details>";
}
function heading() {
    document.getElementById("prew").innerHTML += "<h2 contenteditable='true'>Bu bir başlık</h2>";
}
function paragraph() {
    document.getElementById("prew").innerHTML += "<p contenteditable='true'>Bu bir paragraf</p>";
}
function link() {
    document.getElementById("prew").innerHTML += "<a href contenteditable='true'>Bu bir link</a>";
}
function codeBlock() {
    document.getElementById("prew").innerHTML += "<pre><code contenteditable='true'>Bu bir code</code></pre>";
}
function list() {
    document.getElementById("prew").innerHTML += "<ul style='background: #eee; border-radius:10px;' id='list' contenteditable='true'><li>Bu bir liste</li></ul>";
}
function button() {
    document.getElementById("prew").innerHTML += "<button contenteditable='true'>Bu bir buton</button>";
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const imageSrc = e.target.result;
        const imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = "Image";
        document.getElementById("prew").appendChild(imgElement);
    };

    reader.readAsDataURL(file);
}

// Menu

const contextMenu = document.getElementById("contextMenu");
const content = document.getElementById("prew");

content.addEventListener("contextmenu", function (event) {
    event.preventDefault();

    const posX = event.clientX;
    const posY = event.clientY;

    contextMenu.style.display = "block";
    contextMenu.style.left = posX + "px";
    contextMenu.style.top = posY + "px";
});

document.addEventListener("click", function (event) {
    contextMenu.style.display = "none";
});




const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('active');
});
