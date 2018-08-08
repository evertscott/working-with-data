import './styles.scss';

function DataManager(){
    
}

DataManager.prototype = {
    objectHTML: function (className, {userId, id, title, body}){
        var elements = document.getElementsByClassName(className);
        Array.from(elements, element => {
            element.innerHTML = `<h2 class="identifier">UserId</h2>
                                 <h3 class="value">${userId}</h3>
                                 <h2 class="identifier">Id</h2>
                                 <h3 class="value">${id}</h3>
                                 <h2 class="identifier">Title</h2>
                                 <h3 class="value">${title}</h3>
                                 <h2 class="identifier">Body</h2>
                                 <h3 class="value">${body}</h3>`
        });
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
    }
}

function renderMethod(container, data){
    var elements = document.querySelectorAll(container);
    for(var i = 0; i < elements.length; i++){
        var element = elements.item(i);
        data.then(function(values){
            for(let value of values){
                console.log("Hello")
                var elChild = document.createElement('div');
                elChild.className = "card"
                elChild.innerHTML = `<h2 class="identifier">UserId</h2>
                                <h3 class="value">${value.userId}</h3>
                                <h2 class="identifier">Id</h2>
                                <h3 class="value">${value.id}</h3>
                                <h2 class="identifier">Title</h2>
                                <h3 class="value">${value.title}</h3>
                                <h2 class="identifier">Body</h2>
                                <h3 class="value">${value.body}</h3>`;

                element.appendChild(elChild);

            }
        });
    };
}

new DataManager().objectHTML("card", {userId: 1, id: 1, title: "Test Title", body: "Hello There friends"});

renderMethod("body", new DataManager().fetchRequest({url: 'https://jsonplaceholder.typicode.com/posts', methodType: 'GET', content: 'application/json'}));
