var useLocalStorage = true;

//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || 
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
 }
 
 const fansData = [];
 const newsData = [];
 var db;
 var request = window.indexedDB.open("newDatabase", 1);
 console.log("request");
 request.onerror = function(event) {
    console.log("error: ");
 };
 
 request.onsuccess = function(event) {
    db = request.result;
    console.log("success: "+ db);
   
   
 };
 
 request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStoreFans = db.createObjectStore("fans", {keyPath: "id"});
    console.log("created");
    for (var i in fansData) {
        objectStoreFans.add(fansData[i]);
    }

    var objectStoreNews = db.createObjectStore("news", {keyPath: "id"});
    
    for (var i in fansData) {
        objectStoreNews.add(newsData[i]);
    }

 }
 
 function isOnline() {
    return window.navigator.onLine;
}

class Fans{
   
    constructor(){
        try{ 
        var nowDate = new Date();
        var message = document.getElementById("message").value;
    } catch (e)
    {
        var message ="";
        var title ="";
    }
        this.fanstext = message;
        this.date = nowDate.getDate() + "." + (nowDate.getMonth() + 1) + "." + nowDate.getFullYear();
    }
    set fans(text){
        console.log("text: "+text);
        [this.fanstext, this.date] = text.split(' ');
    }
    toString(){
        return `${(this.fanstext)} ${(this.date)}`;
    }
    append() {
        var original = document.getElementById("fans-div");
        var fans = document.createElement("article");
        fans.innerHTML=
        " <p>" + `${(this.fanstext)}` + " </p>" +
        "  <p class=\"col-sm-10\">"+`${(this.date)}` + "</p> " +
        " <h4 class=\"font-weight-bold\">Tenis Fan 2018</h4>" +
        "   <hr style=\"border-width:6px; color:black\">" ;
        original.appendChild(fans);
        document.getElementById("message").value = "";
    }
    check(){
        alert("The field is empty!");
        if (message == "") {
            document.getElementById("message").style.borderColor = "red";
        }
    }
    addToLocalStorage(){
        var count = parseInt(localStorage.getItem('count-fans'));
        if(isNaN(count)) count =0;

        localStorage.setItem("fans-item-" + count, `${(this).toString()}`);
        console.log( `${(this).toString()}`);
        localStorage.setItem("count-fans", (count + 1));
    }

    addToIndexedDB() {
        var count = parseInt(localStorage.getItem('count-fans'));
        if(isNaN(count)) count =0;
        var request = db.transaction(["fans"], "readwrite")
                        .objectStore("fans")
                        .add({id: count, message: `${(this).toString()}`});
        
        request.onsuccess = function(event) {
           alert("Prasad has been added to your database.");
        };
        
        request.onerror = function(event) {
           alert("Unable to add data\r\nPrasad is already exist in your database! ");
        }

        localStorage.setItem("count-fans", (count + 1));
     }
     addToServer(){
        window.addEventListener("online", function (e) {
            console.log("online");
            $.post("demo_test_post.asp", {
                date: this.date,
                message: this.fansText
            });
        })
     }
     
}

function addFans() {
    
    fans1 = new Fans();
    console.log(fans1.toString());

    if (isOnline()){
        fans1.addToServer();
        fans1.append();
    } else {
        if (useLocalStorage){
            fans1.addToLocalStorage();
        } else
        {
            fans1.addToIndexedDB();
        }
       
    }
    document.getElementById("message").value = "";

}
function readFans(id) {
    
    var transaction = db.transaction(["fans"]);
    var objectStore = transaction.objectStore("fans");
    var request = objectStore.get(id);
    var result;
    request.onerror = function(event) {
       alert("Unable to retrieve daa from database!");
    };
    
    request.onsuccess = function(event) {
    
    if(request.result) {
        var fans1 = new Fans();
        fans1.fans = request.result.message;
        fans1.append();
       
            console.log(request.result.message);
            return request.result.message;
       } else {
          alert("Kenny couldn't be found in your database!");  
       }
    };
    return "";
 }

function displayFansOnline(){
    var count = parseInt(localStorage.getItem('count-fans'));
    var message;
    console.log(count);
    var fans1 = new Fans();
    for (i = 0; i < count; i++ ) {  
        
        
         console.log(i);
        if (useLocalStorage) {
            
            fans1.fans = localStorage.getItem("fans-item-"+i);
            console.log(message);
            fans1.append();
        } else {
            readFans(i);
            
        }
        console.log(fans1.toString());
       // fans1.append();
        console.log("+1");
        console.log("fans-item-" + i);
    }

}

function deletefans() {
    
    var i;
    for (i > 0; i < count; i++ ) {
        localStorage.removeItem('fans-item-' + i)
    }
    localStorage.removeItem('count-fans');
}

// NEWS

class News{
   
    constructor(){
        var nowDate = new Date();
        try {
        var message = document.getElementById("texts").value;
        var title = document.getElementById("title").value;
        } catch (e)
        {
            var message ="";
            var title ="";
        }
        this.newsText = message;
        this.date = title;
    }
    set news(text){
        console.log("text: "+text);
        [this.newsText, this.date] = text.split(' ');
    }
    toString(){
        return `${(this.newsText)} ${(this.date)}`;
    }
    append() {
        var original = document.getElementById("news-div");
        var news = document.createElement("div");
        news.className= "cont-4";
        news.innerHTML= 
        " <img src = \"img/t4.jpg\"class = \"third\" >  </img > " +
        "<p class = \"blue\" >" + `${(this.newsText)}`  + "</p > " +
        " <div class = \"cont-text\" >" + `${(this.date)}` + "</div > ";
        original.appendChild(news);
        
    }
    check(){
        alert("The field is empty!");
        if (message == "") {
            document.getElementById("message").style.borderColor = "red";
        }
    }
    addToLocalStorage(){
        var count = parseInt(localStorage.getItem('count-news'));
        if(isNaN(count)) count =0;

        localStorage.setItem("news-item-" + count, `${(this).toString()}`);
        console.log( `${(this).toString()}`);
        localStorage.setItem("count-news", (count + 1));
    }

    addToIndexedDB() {
        var count = parseInt(localStorage.getItem('count-news'));
        if(isNaN(count)) count =0;
        var request = db.transaction(["news"], "readwrite")
                        .objectStore("news")
                        .add({id: count, message: `${(this).toString()}`});
        
        request.onsuccess = function(event) {
           alert("Prasad has been added to your database.");
        };
        
        request.onerror = function(event) {
           alert("Unable to add data\r\nPrasad is already exist in your database! ");
        }

        localStorage.setItem("count-news", (count + 1));
     }
     addToServer(){
        window.addEventListener("online", function (e) {
            console.log("online");
            $.post("demo_test_post.asp", {
                date: this.date,
                message: this.newsText
            });
        })
     }
}

function addNews() {
    
    news1 = new News();
    console.log(news1.toString());

    if (isOnline()){
        news1.addToServer();
        //news1.append();
    } else {
        if (useLocalStorage){
            news1.addToLocalStorage();
        } else
        {
            news1.addToIndexedDB();
        }

    }
    document.getElementById("texts").value = "";
     document.getElementById("title").value ="";

}
function readNews(id) {
    
    var transaction = db.transaction(["news"]);
    var objectStore = transaction.objectStore("news");
    var request = objectStore.get(id);
    var result;
    request.onerror = function(event) {
       alert("Unable to retrieve daa from database!");
    };
    
    request.onsuccess = function(event) {
    
    if(request.result) {
        var news1 = new News();
        news1.news = request.result.message;
        news1.append();
       
            console.log(request.result.message);
            return request.result.message;
       } else {
          alert("Kenny couldn't be found in your database!");  
       }
    };
    return "";
 }

function displayNewsOnline(){
    var count = parseInt(localStorage.getItem('count-news'));
    var message;
    console.log(count);
    var news1 = new News();
    for (i = 0; i < count; i++ ) {  
        
        
         console.log(i);
        if (useLocalStorage) {
            
            news1.news = localStorage.getItem("news-item-"+i);
            console.log(message);
            news1.append();
        } else {
            readNews(i);
            
        }
        console.log(news1.toString());
       // news1.append();
        console.log("+1");
        console.log("news-item-" + i);
    }

}

function deletenews() {
    
    var i;
    for (i > 0; i < count; i++ ) {
        localStorage.removeItem('news-item-' + i)
    }
    localStorage.removeItem('count-news');
}

window.addEventListener('load', function () {

    function updateOnlineStatus(event) {
    }

    if(isOnline()){
    window.addEventListener('online',  displayNewsOnline() );
    window.addEventListener('online',  displayFansOnline() );
    } else {
    window.addEventListener('offline',displayNewsOffline() );
    window.addEventListener('offline',  displayFansOffline());
    }
}); 


