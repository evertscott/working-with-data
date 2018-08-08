import './styles.scss';
window.$ = window.jQuery = require("jquery");
require("jquery-ui-dist/jquery-ui.js");

function DataManager(){
    
}

window.page = 1;

DataManager.prototype = {
    objectHTML: function (className, {userId, id, title, body}){
        var elements = document.getElementsByClassName(className);
        for(var i = 0; i < elements.length; i++){
            var element = elements.item(i);
            var elChild = document.createElement('div');
            elChild.className = "card"
            elChild.innerHTML = `<h2 class="identifier">UserId</h2>
                                 <h3 class="value">${userId}</h3>
                                 <h2 class="identifier">Id</h2>
                                 <h3 class="value">${id}</h3>
                                 <h2 class="identifier">Title</h2>
                                 <h3 class="value">${title}</h3>
                                 <h2 class="identifier">Body</h2>
                                 <h3 class="value">${body}</h3>`

            element.appendChild(elChild);
        };
    },

    buildRequest: function({methodType = 'GET', data = {}, content}){
        if(methodType === 'GET'){
            {
                return {
                    method: methodType,
                    headers: {
                        "Content-Type": content
                    }
                }
            }
        } else {
            return {
                method: methodType,
                headers: {
                    "Content-Type": content
                },
                body: JSON.stringify(data)
            }
        }
    },

    fetchRequest: function({url, methodType = 'GET', data = {}, content}){
        let res = fetch(url, this.buildRequest(methodType.toUpperCase, data, content)

        ).then(response =>  response.json())
         .catch(error => console.error(`Fetch Error =\n`, error));

        return res;
    },

    getUser: function(userId){
        let users = {
            "1"  : "Daniel",
            "2"  : "Ras",
            "3"  : "Martin",
            "4"  : "Darren",
            "5"  : "Johan",
            "6"  : "Renier",
            "7"  : "Louis",
            "8"  : "Stuart",
            "9"  : "Mardu",
            "10" : "Pedre"
        };

        return users[userId];
    }
}

function renderMethod(container, data){
    
    var elements = document.querySelectorAll(container);

    for(var i = 0; i < elements.length; i++){
        var element = elements.item(i);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        data.then(function(values){
            let start = (window.page - 1) * 10;
            let end = window.page * 10;
            let length = values.length;
            document.getElementById("offsetString").innerHTML = `${end - 9} to ${end} of ${length}`;
            for(let value of values.slice(start, end)){
                var elChild = document.createElement('div');
                elChild.className = "card"
                elChild.innerHTML = `<h2 class="identifier">UserId</h2>
                                     <h3 class="value">${new DataManager().getUser(value.userId)}</h3>
                                     <h2 class="identifier">Id</h2>
                                     <h3 class="value">${value.id}</h3>
                                     <h2 class="identifier">Title</h2>
                                     <h3 class="value">${value.title}</h3>
                                     <h2 class="identifier">Body</h2>
                                     <h3 class="value">${value.body}</h3>`;

                element.appendChild(elChild);

            }

            var pageUp = document.getElementById("pageUp");
            var pageDown = document.getElementById("pageDown");

            if(end === length){
                pageUp.disabled = true;
                pageUp.style.cursor = "not-allowed";
            } else {
                pageUp.disabled = false;
                pageUp.style.cursor = "pointer";
            }
            if((start + 1) === 1){
                pageDown.disabled = true;
                pageDown.style.cursor = "not-allowed";
            } else {
                pageDown.disabled = false;
                pageDown.style.cursor = "pointer";
            }
            
        });
    };
}

//new DataManager().objectHTML("container", {userId: 1, id: 1, title: "Test Title", body: "Hello There friends"});

$('#loadData').click(function(e){
    window.page = 1;
    renderMethod(".container", new DataManager().fetchRequest({url: 'https://jsonplaceholder.typicode.com/posts', methodType: 'GET', content: 'application/json'}));
});

$('#pageUp').click(function(e){
    window.page += 1;
    console.log(window.page);
    renderMethod(".container", new DataManager().fetchRequest({url: 'https://jsonplaceholder.typicode.com/posts', methodType: 'GET', content: 'application/json'}));
});

$('#pageDown').click(function(e){
    window.page -= 1;
    console.log(window.page);
    renderMethod(".container", new DataManager().fetchRequest({url: 'https://jsonplaceholder.typicode.com/posts', methodType: 'GET', content: 'application/json'}));
});



