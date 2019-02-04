let saveLink = document.getElementById('saveLink');
var tablink;
var ul = document.getElementById("savedList");
var threshold = 30;


chrome.tabs.getSelected(null, function (tab) {
    tablink = tab.url;
});

document.body.onload = function () {
    var ul = document.getElementById("savedList");

    chrome.storage.local.get({ list: [] }, function (data) {
        var myJSON = JSON.stringify(data);
        var res = JSON.parse(myJSON);
        if(res.list.length > 0)
            generateList(res.list);
    });
}

function generateList(list) {
    for (var i = 0; i < list.length; i++) {
        var li = document.createElement("li");
        var but = document.createElement("i");
        var ref = document.createElement("a");
        ref.setAttribute('href', list[i]);
        ref.setAttribute('target', "_blank"); // oper in new tab but closes the extension
        but.setAttribute('id', i);
        but.setAttribute('class','button removebutton fas fa-minus-circle');
        but.addEventListener("click", remove);
        li.setAttribute('id', i);
        // but.appendChild(document.createTextNode('R'));
        // li.appendChild(document.createTextNode(list[i]));
        ref.appendChild(document.createTextNode(truncateTextIfLongerThan(list[i], threshold)));
        li.appendChild(ref);
        li.appendChild(but);
        ul.appendChild(li);
    }
}

function truncateTextIfLongerThan(str,thresh) {
    let ending = '...'

    if (str.length > thresh) {
        return str.substring(0, thresh - ending.length) + ending;
    } else {
        return str.padEnd(thresh-str.length);
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
            // document.getElementById("newdata").innerText = res.list;
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
            // document.getElementById("newdata").innerText = res.list;
        });
    });
}