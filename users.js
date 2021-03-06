
const service_url = 'http://localhost:3000/api/users';

//Self invoke  for the button listeners
;

// logics of the buttons.
(function userOperationsListeners() {
   
    //Update button, display the option to update user.
    $("#update-button").click(() => {
        $("#get-update-user").css("display", "block");
        $("#get-update-do").text("Get");
    });
    
    $("#get-update-do").click(() => {
        const userId = $("#user-id").val();
        getUserById(userId);
    });

    //Show button, calling get all users function.
    $("#show-button").click(() => {
        $("#Filter").css("display", "block");
        getAllUsers();
        
    });

    $("#get-query-value").click(() =>{
        const queryValue = $("#query-value").val();
        const queryFilter = $("#query-filter-list").val();
        const query = `?${queryFilter}=${queryValue}`;
        if(queryFilter == "job" ||queryFilter == "gender" || queryFilter == "email" )
            getAllUsersFiltered(query);    

    });

    $("#Hide-button").click(() => {
        $("table").hide();
    });

}())


//CRUD functions, GET & UPDATE
function getAllUsers() {
    $.ajax({
        url: service_url,
        type: 'GET',
        success: function (users) {
            recreateUsersTable(users);
        }
    });
}

function getAllUsersFiltered(query) {
    $.ajax({
        url: service_url + query,
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
        data: info
    });
}

function findUser(user) {
    $("#user-result").empty();
    $("#user-result").append(
        `<input type="text" placeholder="key" id="key">` +
        `<input type="text" placeholder="value" id="value">` +
        '<button type="button" class="btn-danger" id="updateKey">Enter</button><br>'
    );

    $("#updateKey").click(() => {
        let data = {};
        const key = document.getElementById("key").value;
        const value = document.getElementById("value").value;
        data[key] = value;
        console.log(user);
        updateUserById(user.id, data);
    });
}

// creates a table with all the users, by the following format - all users with all the information about them, ignore the color column - just color the font of the row and show the avatar in the right column.
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

    col.splice(9, 1);
    col.splice(0, 1);

    // CREATE DYNAMIC TABLE.
    let table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    let tr = table.insertRow(-1);// TABLE ROW.
    console.log(tr);

    for (let i = 0; i < col.length; i++) {
        if (i == 6)
            continue;
        let th = document.createElement("th");// TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < users.length; i++) {
        tr = table.insertRow(-1);
        //each user gets colored font accordingly to his color, hides the col of the color.
        tr.style.color = users[i]['color'];

        for (let j = 0; j < col.length; j++) {
            if (j == 6)
                continue;

            let tabCell = tr.insertCell(-1);
            if (j == 5) {
                //Showing avatar as backgroundimage in the table cell
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





