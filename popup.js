let saveLink = document.getElementById('saveLink');
var tablink;
var ul = document.getElementById("savedList");


chrome.tabs.getSelected(null, function (tab) {
    tablink = tab.url;
});

document.body.onload = function () {
    chrome.storage.local.get("data", function (items) {
        if (!chrome.runtime.error) {
            console.log(items);
            document.getElementById("data").innerText = items.data;
        }
    });
    var testArray = ["aaa", "bbb", "ccc","ddd"];

    chrome.storage.local.set({ list: testArray }, function () {
       
    });
    var ul = document.getElementById("savedList");

    chrome.storage.local.get({ list: [] }, function (data) {
        var myJSON = JSON.stringify(data);
        var res = JSON.parse(myJSON);
        for(var i = 0; i < res.list.length; i++) {
            var li = document.createElement("li");
            var but = document.createElement("button");
            but.setAttribute('id', i);
            but.addEventListener("click", remove);
            // but.setAttribute('onclick', 'remove();');
            li.setAttribute('id', i);
            // li.appendChild(document.createTextNode(candidate.value));
            but.appendChild(document.createTextNode('Remove'));
            li.appendChild(document.createTextNode(res.list[i]));
            li.appendChild(but);
            ul.appendChild(li);
        }
        // var json = JSON.parse(data);
        // document.getElementById("newdata").innerText = json.list;

    });
}

function remove(element) {
    var id = element.target.id;
    // rimuovo l'elemento con id i dalla lista
    chrome.storage.local.get({ list: [] }, function (data) {
        var myJSON = JSON.stringify(data);
        var res = JSON.parse(myJSON);
        // var index = res.list.indexOf(parseInt(id,10));
        // document.getElementById("newdata").innerText = id;
        // document.getElementById("newdata3").innerText = index;
        // document.getElementById("newdata4").innerText = res.list.indexOf("ccc");
        if(id > -1) {
            res.list.splice(id, 1);
        }
        // salvo 
        chrome.storage.local.set({ list: res.list }, function () {
            var ul = document.getElementById("savedList");
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            for (var i = 0; i < res.list.length; i++) {
                var li = document.createElement("li");
                var but = document.createElement("button");
                but.setAttribute('id', i);
                but.addEventListener("click", remove);
                // but.setAttribute('onclick', 'remove();');
                li.setAttribute('id', i);
                // li.appendChild(document.createTextNode(candidate.value));
                but.appendChild(document.createTextNode('Remove'));
                li.appendChild(document.createTextNode(res.list[i]));
                li.appendChild(but);
                ul.appendChild(li);
            }
            document.getElementById("newdata").innerText = res.list;
        });
    });
}

/*
removeButton.onclick = function() {
    var elem = document.getElementById('savedList');
    elem.parentNode.removeChild(selected);
}
*/
saveLink.onclick = function () {
    var ul = document.getElementById("savedList");
    var candidate = document.getElementById("candidate");
    var li = document.createElement("li");
    // li.setAttribute('id', candidate.value);
    // li.appendChild(document.createTextNode(candidate.value));
    li.appendChild(document.createTextNode(tablink));
    ul.appendChild(li);
    chrome.storage.local.set({ tablink: tablink }, function () {
        //  Data's been saved boys and girls, go on home
    });

}

function removeItem() {
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate");
    var item = document.getElementById(candidate.value);
    ul.removeChild(item);
}


document.getElementById("set").onclick = function () {
    var d = document.getElementById("text").value;

    chrome.storage.local.set({ "data": d }, function () {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });

    window.close();
}

document.getElementById("update").onclick = function () {
    chrome.storage.local.get({ list: [] }, function (data) {
            console.log(data.list);
            update(data.list); //storing the storage value in a variable and passing to update function
        }
    )
}
function update(array) {
    array.push("testAdd");
    //then call the set to update with modified value
    chrome.storage.local.set({ list: array }, function () {
        //console.log("added to list with new values");
        document.getElementById("newdata").innerText = array;
    });
}