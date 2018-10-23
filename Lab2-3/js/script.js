// FANS PAGE
//localStorage.clear();
function isOnline() {
    return window.navigator.onLine;
}

function addFans() {
    var nowDate = new Date();

    var message = document.getElementById("message").value;
    var count = parseInt(localStorage.getItem('count-fans'));

    if (message != "") {
        var fansText = "<article>" +
            " <p>" + message +
            " </p>" +
            "  <p class=\"col-sm-10\">" + nowDate.getDate() + "." + (nowDate.getMonth() + 1) + "." + nowDate.getFullYear() + "</p> " +
            " <h4 class=\"font-weight-bold\">Tenis Fan 2018</h4>" +
            "   <hr style=\"border-width:6px; color:black\">" +
            " </article>";
        // document.createElement(article);
        if (isOnline()) {
            window.addEventListener("online", function (e) {
                console.log("online");
                $.post("demo_test_post.asp", {
                    name: "fans",
                    date: nowDate,
                    message: message
                });
            })
            $(".fans").append(fansText);

        } else {
            console.log("offline");
            localStorage.setItem("fans-item-" + count, fansText);
            localStorage.setItem("count-fans", (count + 1));
        }


        

        console.log("+1");
        console.log("fans-item-" + count);

        document.getElementById("message").value = "";
    } else {
        alert("The field is empty!");
        if (message == "") {
            console.log("yes");
            document.getElementById("message").style.borderColor = "red";
        }
    }
}

function displayFansOnline() {
    console.log("status:online");
    var i;
    var count = parseInt(localStorage.getItem('count-fans'));
    if (count >= 0) {
        var message = "";
        for (i = 0; i < count; i++ ) {
            message = localStorage.getItem("fans-item-" + i);
            $(".fans").append(message);
            console.log("+1");
            console.log("fans-item-" + i);
        }
    }
    else localStorage.setItem('count-fans', 0);
    
}
function displayFansOffline() {
    console.log("status: offline");
    var i;
    var count = parseInt(localStorage.getItem('count-fans'));
    if (count >= 0) {
        var message = "";
        for (i = 0; i < count; i++ ) {
            message = localStorage.getItem("fans-item-" + i);
            // $(".fans").append(message);
            console.log("+1");
            console.log("fans-item-" + i);
        }
    } else localStorage.setItem('count-fans', 0);

    
}

function deletefans() {
    var i;
    for (i > 0; i < count; i++ ) {
        localStorage.removeItem('fans-item-' + i)
    }
    localStorage.removeItem('count-fans');
}

$(function () { });

// ADMIN PAGE

function addNews() {
    // var message = $('textarea#texts').val();
    console.log("is:" + isOnline());
    var message = document.getElementById("texts").value;
    var title = document.getElementById("title").value;
    var count = parseInt(localStorage.getItem('count-news'));
    if(isNaN(count)){
        count = 0;
    }
    console.log("m" + message);
    console.log("t" + title);
    if ((message != "") && (title != "")) {
        var fansText = "<div class = \"cont-4\">" +
            " <img src = \"img/t4.jpg\"class = \"third\" >  </img > " +
            "<p class = \"blue\" >" + title + "</p > " +
            " <div class = \"cont-text\" >" + message + "</div ></div > ";

        localStorage.setItem("news-item-" + count, fansText);
        localStorage.setItem("count-news", (count + 1));

        // $(".news").append(fansText); 
        alert("News is added.");
        console.log("+1");
        console.log("news-item-" + count);
        console.log(fansText);

        document.getElementById("texts").value = "";
        document.getElementById("title").value = "";
        document.getElementById("message").style.borderColor = "black";
    } else {

        if (message == "") {
            document.getElementById("texts").style.borderColor = "red";

        }
        if (title == "") {
            document.getElementById("title").style.borderColor = "red";

        }

        alert("The field is empty!");


    }

}

function setNews() {
    var count = parseInt(localStorage.getItem('count-news'));
    if (count >= 0) { count = count; } else
        localStorage.setItem('count-news', 0);
}

function sendNewsToServer(){
    var i;
    var count = parseInt(localStorage.getItem('count-news'));
    for (i = 0; i < count; i++ ) {
        message = localStorage.getItem("news-item-" + i);
        $(".news").append(message);
        $.post("demo_test_post.asp", {
            name: "news",
            message: message
        });
        
    }
    
    for (i > 0; i < count; i++ ) {
        localStorage.removeItem('news-item-' + i)
    }
    localStorage.removeItem('count-news');
}

function displayNewsOffline() {
    var i;
    var count = parseInt(localStorage.getItem('count-news'));
    var message;
    for (i = 0; i < count; i++ ) {
        message = localStorage.getItem("news-item-" + i);
        console.log(message);
     //   $(".news").append(message);
        console.log("+1");
        console.log("news-item-" + i);
    }
}

function displayNewsOnline() {
    sendNewsToServer();
    getFromServe();
}

function getFromServe(){
    
}


window.addEventListener('load', function () {

    function updateOnlineStatus(event) {
    }

    if(isOnline()){
    window.addEventListener('online',  displayNewsOnline() )
    window.addEventListener('online',  displayFansOnline() );
    } else {
    window.addEventListener('offline',displayNewsOffline() );
    window.addEventListener('offline',  displayFansOffline());
    }
}); 