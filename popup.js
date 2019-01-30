let saveLink = document.getElementById('saveLink');
var tablink;
var ul = document.getElementById("savedList");


chrome.tabs.getSelected(null, function (tab) {
    tablink = tab.url;
});

document.body.onload = function () {
    var testArray = ["aaa", "bbb", "ccc","ddd"];

    chrome.storage.local.set({ list: testArray }, function () {
       
    });
    var ul = document.getElementById("savedList");

    chrome.storage.local.get({ list: [] }, function (data) {
        var myJSON = JSON.stringify(data);
        var res = JSON.parse(myJSON);
        generateList(res.list);
    });
}

function generateList(list) {
    for (var i = 0; i < list.length; i++) {
        var li = document.createElement("li");
        var but = document.createElement("button");
        but.setAttribute('id', i);
        but.addEventListener("click", remove);
        li.setAttribute('id', i);
        but.appendChild(document.createTextNode('Remove'));
        li.appendChild(document.createTextNode(list[i]));
        li.appendChild(but);
        ul.appendChild(li);
    }
}

function remove(element) {
    var id = element.target.id;
    // rimuovo l'elemento con id i dalla lista
    chrome.storage.local.get({ list: [] }, function (data) {
        var myJSON = JSON.stringify(data);
        var res = JSON.parse(myJSON);

        if(id > -1) {
            res.list.splice(id, 1);
        }
        // salvo 
        chrome.storage.local.set({ list: res.list }, function () {
            var ul = document.getElementById("savedList");
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            generateList(res.list);
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
    chrome.storage.local.get({ list: [] }, function (data) {
        var myJSON = JSON.stringify(data);
        var res = JSON.parse(myJSON);
        res.list.push(tablink);
        chrome.storage.local.set({ list: res.list }, function () {
            var ul = document.getElementById("savedList");
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
            generateList(res.list);
            document.getElementById("newdata").innerText = res.list;
        });
    });
}