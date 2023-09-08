function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const firebaseConfig = {
    apiKey: "AIzaSyCH8bKP2yQiIZcrQpuE0RehhZxItdLY-88",
    authDomain: "nar-tickle.firebaseapp.com",
    databaseURL: "https://nar-tickle-default-rtdb.firebaseio.com",
    projectId: "nar-tickle",
};

// Firebase'i başlatın
firebase.initializeApp(firebaseConfig);
var database = firebase.database();



function create() {
    var user = firebase.auth().currentUser; 
    if (user) {
        let pageName = prompt("Sayfa'nın adı", "");

        if (pageName != null) {
            database.ref("l/" + pageName).set("<h1>hello</h1>")
                .then(function() {
                console.log("l başarılı");
            }),
            database.ref("u/" + user.uid).set([localStorage.getItem("pages"),pageName])
                .then(function() {
                console.log("u başarılı");
            })
        }
    }
}

function save() {
        document.querySelectorAll('[contenteditable="true"]').forEach(function (element) {
            element.setAttribute("contenteditable", "false");
        });
        database.ref("l/" + getParameterByName("page")).set(document.getElementById("prew").innerHTML)
            .then(() => {
                console.log("Dizi Firebase veritabanına başarıyla eklendi.");
            })
            .catch((error) => {
                console.error("Dizi eklenirken bir hata oluştu: ", error);
            });
}

if (getParameterByName("page")!= null) {
    database.ref("l/" + getParameterByName("page")).once("value")
        .then((snapshot) => {
            document.getElementById("prew").innerHTML = snapshot.val();
            document.querySelectorAll('[contenteditable="false"]').forEach(function (element) {
                element.setAttribute("contenteditable", "true");
            });
        })
        .catch((error) => {
            console.error("Veri alınırken bir hata oluştu: ", error);
        });
}

document.getElementById("pages").addEventListener("click", function (event) {
    var currentURL = new URL(window.location.href);
    currentURL.searchParams.set('page', event.target.textContent);
    window.location.href =  currentURL.href;
});

function updateUI(user) {
    var authContainer = document.getElementById("loginPopup");
    if (user) {
        database.ref("u/" + user.uid).once("value")
        .then((snapshot) => {
            const list = document.createElement('ul');
            localStorage.setItem("pages",snapshot.val());
            snapshot.val().forEach((item) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    list.appendChild(listItem);
                });
                document.getElementById("pages").appendChild(list);
            })
            .catch((error) => {
                console.error("Veri alınırken bir hata oluştu: ", error);
            });
    } else {
        authContainer.style.display = "block";
        document.getElementById("signup-button").addEventListener("click", () => {
            var email = document.getElementById("in-email").value;
            var password = document.getElementById("in-password").value;
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log("Kayıt başarılı!");
                })
                .catch((error) => {
                    console.error("Kayıt sırasında bir hata oluştu:", error);
                });
        });
        document.getElementById("login-button").addEventListener("click", () => {
            var email = document.getElementById("in-email").value;
            var password = document.getElementById("in-password").value;
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    alert("Giriş başarılı!");
                    authContainer.style.display = "none";
                })
                .catch((error) => {
                    alert("Giriş sırasında bir hata oluştu:", error);
                });
        });
    }
}

// Oturum durumunu dinle
firebase.auth().onAuthStateChanged(updateUI);