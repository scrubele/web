'use strict';
 var useLocalStorage = false;
//var http = require ('http');
//prefixes of implementation that we want to test
// window.indexedDB = window.indexedDB || window.mozIndexedDB || 
//  window.webkitIndexedDB || window.msIndexedDB;

// // //prefixes of window.IDB objects
// window.IDBTranaction = window.IDBTranaction || 
// window.webkitIDBTranaction || window.msIDBTranaction;
// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
// window.msIDBKeyRange

if (typeof(window) !== 'undefined') {
    // code here

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
 }

 
 const fanData = [];
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
    var objectStoreFan = db.createObjectStore("fan", {keyPath: "id"});
    console.log("created");
    for (var i in fanData) {
        objectStoreFan.add(fanData[i]);
    }

    var objectStoreNews = db.createObjectStore("news", {keyPath: "id"});
    
    for (var i in fanData) {
        objectStoreNews.add(newsData[i]);
    }

 }
}
 function isOnline() {
    return window.navigator.onLine;
}


class Fan{
   
    constructor(){
        try{ 
        var nowDate = new Date();
        var message = document.getElementById("message").value;
    } catch (e)
    {
        var message ="";
        var title ="";
    }
        this.fantext = message;
        this.date = nowDate.getDate() + "." + (nowDate.getMonth() + 1) + "." + nowDate.getFullYear();
    }
    set fan(text){
        console.log("text: "+text);
        [this.fantext, this.date] = text.split(' ');
    }
    toString(){
        return `${(this.fantext)} ${(this.date)}`;
    }
    append() {
        var original = document.getElementById("fans-div");
        var fan = document.createElement("article");
        fan.innerHTML=
        " <p>" + `${(this.fantext)}` + " </p>" +
        "  <p class=\"col-sm-10\">"+`${(this.date)}` + "</p> " +
        " <h4 class=\"font-weight-bold\">Tenis Fan 2018</h4>" +
        "   <hr style=\"border-width:6px; color:black\">" ;
        original.appendChild(fan);
        document.getElementById("message").value = "";
    }
    check(){
        alert("The field is empty!");
        if (message == "") {
            document.getElementById("message").style.borderColor = "red";
        }
    }
    addToLocalStorage(){
        var count = parseInt(localStorage.getItem('count-fan'));
        if(isNaN(count)) count =0;

        localStorage.setItem("fan-item-" + count, `${(this).toString()}`);
        console.log( `${(this).toString()}`);
        localStorage.setItem("count-fan", (count + 1));
    }

    addToIndexedDB() {
        var count = parseInt(localStorage.getItem('count-fan'));
        if(isNaN(count)) count =0;
        var request = db.tranaction(["fan"], "readwrite")
                        .objectStore("fan")
                        .add({id: count, message: `${(this).toString()}`});
        
        request.onsuccess = function(event) {
           alert("Prasad has been added to your database.");
        };
        
        request.onerror = function(event) {
           alert("Unable to add data\r\nPrasad is already exist in your database! ");
        }

        localStorage.setItem("count-fan", (count + 1));
     }
     addToServer(){
        // console.log("Complete");
        // var myHeaders = new Headers();

        // var myInit = { method: 'GET',
        //        headers: myHeaders,
        //        mode: 'cors',
        //        cache: 'default' };
               
        // fetch('http://localhost:8000/feedbacks', myInit, (res) => {
        //     console.log("Complete");
        //     res.resume();
        //     res.on('end', () => {
                
        //       if (!res.complete)
        //         console.error(
        //           'The connection was terminated while the message was still being sent');
        //     });
        //   });
        
        // }
        return fetch('http://localhost:8000/feedbacks/', {
            credentials: 'same-origin', // 'include', default: 'omit'
            method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
            
            body: JSON.stringify(`${(this).toString()}`), // Coordinate the body type with 'Content-Type'
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'content-type'
            }),
            })
        .then(response => response.json());
}
}

function addFan() {
    var fan1;
    fan1 = new Fan();
    console.log(fan1.toString());

    if (isOnline()){
        fan1.addToServer();
        fan1.append();
    } else {
        if (useLocalStorage){
            fan1.addToLocalStorage();
        } else
        {
            fan1.addToIndexedDB();
        }
       
    }
    document.getElementById("message").value = "";

}
function readFan(id) {
    
    var tranaction = db.tranaction(["fan"]);
    var objectStore = tranaction.objectStore("fan");
    var request = objectStore.get(id);
    var result;
    request.onerror = function(event) {
       alert("Unable to retrieve daa from database!");
    };
    
    request.onsuccess = function(event) {
    
    if(request.result) {
        var fan1 = new Fan();
        fan1.fan = request.result.message;
        fan1.append();
       
            console.log(request.result.message);
            return request.result.message;
       } else {
          alert("Kenny couldn't be found in your database!");  
       }
    };
    return "";
 }

function displayFanOnline(){
    var count = parseInt(localStorage.getItem('count-fan'));
    if (isNullcount)
    var message;
    console.log(count);
    var fan1 = new Fan();
    var i;
    for (i = 0; i < count; i++ ) {  
        
        
         console.log(i);
        if (useLocalStorage) {
            
            fan1.fan = localStorage.getItem("fan-item-"+i);
            console.log(message);
            fan1.append();
        } else {
            readFan(i);
            
        }
        console.log(fan1.toString());
       // fan1.append();
        console.log("+1");
        console.log("fan-item-" + i);
    }

}

function deletefan() {
    
    var i;
    for (i > 0; i < count; i++ ) {
        localStorage.removeItem('fan-item-' + i)
    }
    localStorage.removeItem('count-fan');
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
            document.getElementById("texts").style.borderColor = "red";
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
        var request = db.tranaction(["news"], "readwrite")
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
        var req = http.request(options, function (res) {
            var responseString = "";
        
            res.on("data", function (data) {
                responseString += data;
                // save all the data from response
            });
            res.on("end", function () {
                console.log(responseString); 
                // print to console when response ends
            });
        });
     }
}

function addNews() {
    
    var news1 = new News();
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
    
    var tranaction = db.tranaction(["news"]);
    var objectStore = tranaction.objectStore("news");
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
    if(isNaN(count)) count =0;
    var news1 = new News();
    var i;
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
if (typeof(window) !== 'undefined') {
window.addEventListener('load', function () {

    function updateOnlineStatus(event) {
    }

    if(isOnline()){
    window.addEventListener('online',  displayNewsOnline() );
    window.addEventListener('online',  displayFanOnline() );
    } else {
    window.addEventListener('offline',displayNewsOffline() );
    window.addEventListener('offline',  displayFanOffline());
    }
}); 
}


