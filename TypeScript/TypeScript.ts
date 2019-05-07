//Lincoln MacKay
//ENHANCED Name Generator

//Pretty cool

//INFINITE LOOPS LOL

//Fixed

//3/19/2019 11:17am Added tons of functionality and styling.

//3/19/2019 12:00pm Added a new button to create random groups by number of groups.

//3/19/2019 3:49pm  Well I managed to style the fuck outta this.  Looks neato and I have a cool
//                  knockout text h1 tag.

//3/26/2019 10:00am honestly didn't take that long to convert to typescript.  Mostly adding a lot of String and
//                  parseInt for the fields, arrays and innerTexts.  Also manually globally declaring my
//                  variables since they can't be declared and referenced inside of functions.  Converting everything
//                  In this version of the program (Not the most up to date I realized 90% into it) in about 40 minutes.

//                  Since this is not the up to date version it doesn't have upper/lower case checking.  Have to readd that.
//                  Last time I used two fucking local storages but that was honestly a total hassle and I'm pretty sure
//                  making variables to compare is way better.

//Last Edited 3/26/2019

var nameField = document.getElementById("nameField") as HTMLInputElement,
    submitBtn = document.getElementById('submitBtn') as HTMLElement,
    deleteBtn = document.getElementById('deleteBtn') as HTMLElement,
    randomBtn = document.getElementById('randomBtn') as HTMLElement,
    groupSizeBtn = document.getElementById('groupSizeBtn') as HTMLElement,
    groupNumberBtn = document.getElementById('groupNumberBtn') as HTMLElement,
    groupNumberField = document.getElementById('groupNumberField') as HTMLInputElement,
    groupSizeField = document.getElementById('groupSizeField') as HTMLInputElement,
    randomGroupsDisplay = document.getElementById('randomGroupsDisplay') as HTMLDivElement;


//Have to globally declare.  Can't globally declare inside functions in typescript.  I would have to make a class
//and reference the class.
let groupSize: Number;
let nameList: Array<string> = [];

randomBtn.addEventListener('click', function () {
    if (nameList.length == 0) {
        alert('Dude you need to add some names first');
    } else {
        //need to run this first to reset the active class.
        populateListDisplay();
        let rNum = Math.floor(Math.random() * nameList.length);
        var listName = document.getElementById("index" + rNum) as HTMLElement;
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

function randomGroupSizeFunction() {
    if (nameList.length == 0) {
        alert('Dude you need to add some names first');
    } else if (groupSizeField.value == "") {
        alert('Try clicking OTHER buttons on your keyboard first');
    } else if (groupSizeField.value.toLowerCase() == "numbers") {
        alert("Fuck you");
    } else if (isNaN(parseInt(groupSizeField.value))) {
        alert("Dude enter numbers");
    } else if (parseInt(groupSizeField.value) == 0) {
        alert("Dude don't enter zero");
    } else if (parseInt(groupSizeField.value) < 0) {
        alert("What dimension do you even live in?");
    } else if (parseInt(groupSizeField.value) % 1 != 0) {
        alert("Please don't enter decimals")
    } else if (parseInt(groupSizeField.value) > nameList.length) {
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
    } else if (isNaN(parseInt(groupNumberField.value))) {
        alert("Dude enter numbers");
    } else if (parseInt(groupNumberField.value) == 0) {
        alert("Dude don't enter zero");
    } else if (parseInt(groupNumberField.value) < 0) {
        alert("What dimension do you even live in?");
    } else if (parseInt(groupNumberField.value) % 1 != 0) {
        alert("Please don't enter decimals")
    } else if (parseInt(groupNumberField.value) > nameList.length) {
        alert("Just for the record that group size is larger than the actual number of students.  Whatever here's your group.  Moron.")
        randomGroupNumber();
    } else {
        randomGroupNumber();
    }


    //So apparently this is pretty slow.  If statements are a lot better for performance.
    /* switch (true){
        case nameList.length==0:{
            break;
        }
        case groupNumberField.value.toLowerCase() == "numbers":{
            break;
        }
    } */
}

function randomGroupNumber() {
    groupSize = Math.ceil(nameList.length / parseInt(groupNumberField.value));
    randomGroups();
}

function randomGroupSize() {
    groupSize = parseInt(groupSizeField.value);
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
    //Also I'd like to mention that before I made the groupFields = "" not work it made an infinite loop or some shit
    //and I had to force close the browser.

    //Revamped this section to make rows and columns for nice styling.
    while (groupList.length > 0) {
        /* var row = document.createElement('div');
        row.className="row"; */
        var col = document.createElement('div');
        col.className = "col boxStyle";
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
                var pTag = document.createElement('p') as HTMLElement;
                pTag.innerText = String(groupList[rNum]);
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
    //Nifty.  Found this online.  MUCH better than using two separate lists.
    let regex = new RegExp(nameList.join("|"), "i");
    let caseCheck: boolean = regex.test(nameField.value);

    if (nameField.value == "") {
        alert("Names typically include letters.");
    }
    else if (caseCheck === true) {
        alert("Dude don't enter duplicates.");
    } else {
        nameList.push(nameField.value);
        nameList.sort();
        localStorage.setItem('names', JSON.stringify(nameList));
        nameField.value = "";
        populateListDisplay();
    }
}

//This function deletes all children in listDisplay and then populates listDisplay with pTag holding items from
//the nameList array.
function populateListDisplay() {

    var listDisplay = document.getElementById("listDisplay") as HTMLDivElement;

    while (listDisplay.firstChild) {
        listDisplay.removeChild(listDisplay.firstChild);
    }

    for (let i = 0; i < nameList.length; i++) {
        var aTag = document.createElement('a');
        aTag.className = "list-group-item list-group-item-action";
        aTag.setAttribute('href', '#');
        aTag.setAttribute('id', 'index' + i)
        aTag.innerText = nameList[i];
        listDisplay.appendChild(aTag);
        //An event listener to delete the pTags.
        aTag.addEventListener('click', function (e) {
            for (let i = 0; i < nameList.length; i++) {
                if (nameList[i] === (<HTMLSelectElement>e.target).innerText) {
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
        nameList = JSON.parse(String(localStorage.getItem('names')));
        populateListDisplay();
    } else {
        nameList = [];
    }
}

firstLoad();