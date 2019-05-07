//Lincoln MacKay
//ENHANCED Name Generator

//Pretty cool

//INFINITE LOOPS LOL

//Fixed

//3/19/2019 11:17am Added tons of functionality and styling.

//3/19/2019 12:00pm Added a new button to create random groups by number of groups.

//3/19/2019 3:49pm  Well I managed to style the fuck outta this.  Looks neato and I have a cool
//                  knockout text h1 tag.

//Last Edited 3/19/2019

var nameField = document.getElementById("nameField"),
    submitBtn = document.getElementById('submitBtn'),
    deleteBtn = document.getElementById('deleteBtn'),
    randomBtn = document.getElementById('randomBtn'),
    groupSizeBtn = document.getElementById('groupSizeBtn'),
    groupNumberBtn = document.getElementById('groupNumberBtn'),
    groupField = document.getElementById('groupField'),
    groupNumberField = document.getElementById('groupNumberField'),
    randomGroupsDisplay = document.getElementById('randomGroupsDisplay');

randomBtn.addEventListener('click', function () {
    if (nameList.length == 0) {
        alert('Dude you need to add some names first');
    } else {
        //need to run this first to reset the acdive class.
        populateListDisplay();
        let rNum = Math.floor(Math.random() * nameList.length);
        var listName = document.getElementById("index"+rNum);
        listName.className = "list-group-item list-group-item-action active";
    }
});

groupSizeBtn.addEventListener('click', function () {
    randomGroupSizeFunction();
});

groupSizeField.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        randomGroupSizeFunction();
    }
});

groupNumberBtn.addEventListener('click', function () {
    randomGroupNumberFunction();
});

groupNumberField.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        randomGroupNumberFunction();
    }
});

function randomGroupSizeFunction(){
    if (nameList.length == 0) {
        alert('Dude you need to add some names first');
    } else if (groupSizeField.value == "") {
        alert('Try clicking OTHER buttons on your keyboard first');
    } else if (groupSizeField.value.toLowerCase() == "numbers") {
        alert("Fuck you");
    } else if (isNaN(groupSizeField.value)) {
        alert("Dude enter numbers");
    } else if (groupSizeField.value == 0) {
        alert("Dude don't enter zero");
    } else if (groupSizeField.value < 0) {
        alert("What dimension do you even live in?");
    } else if (groupSizeField.value % 1 != 0) {
        alert("Please don't enter decimals")
    } else if (groupSizeField.value > nameList.length) {
        alert("Just for the record that group size is larger than the actual number of students.  Whatever here's your group.  Moron.")
        randomGroupSize();
    } else {
        randomGroupSize();
    }
}

function randomGroupNumberFunction() {
    if (nameList.length == 0) {
        alert('Dude you need to add some names first');
    } else if (groupNumberField.value == "") {
        alert('Try clicking OTHER buttons on your keyboard first');
    } else if (groupNumberField.value.toLowerCase() == "numbers") {
        alert("Fuck you");
    } else if (isNaN(groupNumberField.value)) {
        alert("Dude enter numbers");
    } else if (groupNumberField.value == 0) {
        alert("Dude don't enter zero");
    } else if (groupNumberField.value < 0) {
        alert("What dimension do you even live in?");
    } else if (groupNumberField.value % 1 != 0) {
        alert("Please don't enter decimals")
    } else if (groupNumberField.value > nameList.length) {
        alert("Just for the record that group size is larger than the actual number of students.  Whatever here's your group.  Moron.")
        randomGroupNumber();
    } else {
        randomGroupNumber();
    }
}

function randomGroupNumber() {
    groupSize = Math.ceil(nameList.length / groupNumberField.value);
    randomGroups();
}

function randomGroupSize(){
    groupSize = groupSizeField.value;
    randomGroups();
}

function randomGroups() {
    //Remove previous elements.
    while (randomGroupsDisplay.firstChild) {
        randomGroupsDisplay.removeChild(randomGroupsDisplay.firstChild);
    }
    //This is the answer.  let groupList = nameList does NOT work.  Literally sets these variables equal to each other at all times.
    //This slice(0) method makes a copy.  Very useful.
    let groupList = nameList.slice(0);
    let counter = 1;
    groupSizeField.value = "";
    groupNumberField.value = "";
    //Also I'd like to mention that before I made groupField.value="" not work it made an infinite loop or some shit
    //and I had to force close the browser.

    //Revamped this section to make rows and columns for nice styling.
    while (groupList.length > 0) {
        /* var row = document.createElement('div');
        row.className="row"; */
        var col = document.createElement('div');
        col.className="col boxStyle";
        var h3Tag = document.createElement('h3');
        h3Tag.innerText = "GROUP NO. " + counter;
        col.appendChild(h3Tag);
        /* row.appendChild(col);
        randomGroups.appendChild(row); */
        randomGroupsDisplay.appendChild(col);
        for (let i = 0; i < groupSize; i++) {
            if (groupList.length == 0) {
                continue;
            } else {
                let rNum = Math.floor(Math.random() * groupList.length);
                var pTag = document.createElement('p');
                pTag.innerText = groupList[rNum];
                col.appendChild(pTag);
                groupList.splice(rNum, 1);
            }
        }
        counter++;
    }
}

submitBtn.addEventListener('click', function () {
    addName();
});

nameField.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        addName();
    }
});

function addName() {
    if (nameField.value == "") {
        alert("Names typically include letters.");
    }
    else if (nameList.includes(nameField.value)) {
        alert("Dude don't enter duplicates.");
    } else {
        nameList.push(nameField.value);
        localStorage.setItem('names', JSON.stringify(nameList));
        nameField.value = "";
        populateListDisplay();
    }
}

//This function deletes all childs in listDisplay and then populates listDisplay with pTag holding items from
//the nameList array.
function populateListDisplay() {

    var listDisplay = document.getElementById("listDisplay");

    while (listDisplay.firstChild) {
        listDisplay.removeChild(listDisplay.firstChild);
    }

    for (let i = 0; i < nameList.length; i++) {
        var aTag = document.createElement('a');
        aTag.className = "list-group-item list-group-item-action";
        aTag.setAttribute('href', '#');
        aTag.setAttribute('id', 'index'+i)
        aTag.innerText = nameList[i];
        listDisplay.appendChild(aTag);
        //An event listener to delete the pTags.
        aTag.addEventListener('click', function (e) {
            for (let i = 0; i < nameList.length; i++) {
                if (nameList[i] === e.toElement.innerHTML) {
                    //This is the only nameList.splice function in the entire program.  This is working as intended.
                    nameList.splice(i, 1);
                    localStorage.setItem('names', JSON.stringify(nameList));
                }
            }
            populateListDisplay();
        });
    }
}

function firstLoad() {
    if (localStorage.getItem('names')) {
        nameList = JSON.parse(localStorage.getItem('names'));
        populateListDisplay();
    } else {
        nameList = [];
    }
}

firstLoad();