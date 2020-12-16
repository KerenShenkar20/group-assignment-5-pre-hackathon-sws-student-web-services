//$(function () {
 //   getAllUsers();
    userOperationsListeners();
//});

function getAllUsers() {
    $.ajax({
        url: 'http://localhost:3000/api/users',
        type: 'GET',
        success: function (users) {
            console.log(users);
            recreateUsersTable(users);
        }
    });
}

function recreateUsersTable(users) {
    $("table").empty().remove();

    users.array.forEach(element => {
        $('#userTable > tbody:last-child').append(`<tr>${element}</tr>`);
    });
}

function userOperationsListeners() {
    $("#show-button").click(() => {
        
        getAllUsers();
    });
}
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
