//$(function () {
 //   getAllUsers();
    userOperationsListeners();
//});

function getAllUsers() {
    $.ajax({
        url: 'http://localhost:3000/api/users',
        type: 'GET',
        success: function (users) {
            recreateUsersTable(users);
        }
    });
}

function getUserById() {
    $.ajax({
        url: `http://localhost:3000/api/users${userId}`,
        type: 'GET',
        success: function (user) {
            findUser(user);
        }
    });
}

function findUser(user) {
    $("#user-result").empty();
    $("#user-result").append(
        '<p>' +
        'Name: ' + user.first_name + '<br>' +
        'Longitude: '  + user.last_name + '<br>' +
        'Latitude: ' + user.email + '<br>' +
        'Stars: ' + user.gender + '<br>' +
        '<p>'
    );

    $("#get-delete-do").click(()=>
        
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
        let th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < users.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
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
        if ($("#get-delete-do").text() === "Update user") {
            const userId = $("#user-id").val();

            getUserById(userId);
        } else {
            // Delete
        }
    });
}


// function userOperationsListeners() {
//     $("#update-button").click(() => {
//         console.log("hey");
//         getAllUsers();
//     });
// }
// function userOperationsListeners() {

//     $("#get-button").click(() => {
//         $("#get-delete-restaurant").css("display", "none");
//         alert("Add");
//     });

//     $("#update-button").click(() => {
//         $("#get-delete-restaurant").css("display", "none");
//         alert("Update");
//     });

//     $("#get-delete-do").click(() => {
//         if ($("#get-delete-do").text() === "Get") {
//             const restaurantId = $("#rest-id").val();

//             getRestaurantById(restaurantId);
//         } else {
//             // Delete
//         }
//     });
// }
