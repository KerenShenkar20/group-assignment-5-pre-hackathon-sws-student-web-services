
const service_url = 'http://localhost:3000/api/users';
let data = {};

userOperationsListeners();

function getAllUsers() {
    $.ajax({
        url: service_url,
        type: 'GET',
        success: function (users) {
            recreateUsersTable(users);
        }
    });
}

function getUserById(userId) {
    $.ajax({
        url: service_url + `/${userId}`,
        type: 'GET',
        success: function (user) {
            findUser(user);
        }
    });
}

function updateUserById(userId, info) {

    $.ajax({
        url: service_url + `/${userId}`,
        type: 'PUT',
        data : info
    });
}

function findUser(user) {
    $("#user-result").empty();
    $("#user-result").append(
        `First Name <input type="text" placeholder="${user.first_name}" id="firstName">` +
        '<button type="button" class="btn-danger" id="updateFisrtName">Enter</button><br>' +
        `Last Name <input type="text" placeholder="${user.last_name}" id="lastName">` +
        '<button type="button" class="btn-danger" id="updateLastName">Enter</button><br>' +
        `Email <input type="text" placeholder="${user.email}">` +
        '<button type="button" class="btn-danger" id="updateEmail">Enter</button><br>' +
        `Gender <input type="text" placeholder="${user.gender}">` +
        '<button type="button" class="btn-danger" id="updateGender">Enter</button><br>'
    );

        $("#updateFisrtName").click(() => {
            const firstName = document.getElementById("firstName").value;
            const lastName = document.getElementById("lastName").value;
            
            data = {"first_name" : firstName};
            updateUserById(user.id, data);
        });

}


function recreateUsersTable(users) {

    // EXTRACT VALUE FOR HTML HEADER. 
    let col = [];
    for (let i = 0; i < users.length; i++) {
        for (let key in users[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    let table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    let tr = table.insertRow(-1);                   // TABLE ROW.

    for (let i = 0; i < col.length; i++) {

        if (i == 6)
            continue;
        let th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < users.length; i++) {

        tr = table.insertRow(-1);
        tr.style.color = users[i][col[7]];
        for (let j = 0; j < col.length; j++) {

            if (j == 5)
                continue;

            let tabCell = tr.insertCell(-1);
            if (j == 6) {

                tabCell.style.backgroundImage = `url(${users[i][col[j]]})`
                continue;
            }

            tabCell.innerHTML = users[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    const divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function userOperationsListeners() {
    $("#update-button").click(() => {
        $("#get-delete-user").css("display", "block");
        $("#get-delete-do").text("Get");
    });

    $("#get-delete-do").click(() => {
        const userId = $("#user-id").val();
        console.log(userId);

        getUserById(userId);
    });

    $("#show-button").click(() => {
        getAllUsers();
    });


    $("#Hide-button").click(() => {
        $("table").hide();
    });

}



