$(document).ready(function () {
  get();
});


function get() {
  var jsonQuery = {
    query: '{\n  "query":{\n    "match_all":{\n      \n    }\n  }\n}',
    type: "RECORD",
    specId: 7077,
  };
  $.ajax({
    url: "https://onprem.boodskap.io/api/elastic/search/query/a017d8b5-f0b7-46d6-8d1e-8b576579583a/RECORD?specId=7077",

    type: "POST",
    data: JSON.stringify(jsonQuery),
    contentType: "application/json",

    success: function (data) {
      console.log(data);
      var jsonConvert = JSON.parse(data.result);
      var jsonHits = jsonConvert.hits.hits;
      var sourceId = jsonHits._id;

      console.log(sourceId);
      console.log(jsonHits);

      $("#table2").DataTable({
        data: jsonHits,
        columns: [
          { data: "_source.firstname" },
          { data: "_source.lastname" },
          { data: "_source.email" },
          { data: "_source.phone" },
          { data: "_source.education" },
          { data: "_source.place" },
          { data: "_source.pincode" },
          {
            data: "_id",
            render: function (_id) {
              return "<button  onclick=\"editId('" + _id + "')\">Edit</button>";
            },
          },

          {data:"_id",render:function(_id){ return "<button onclick=\"updateId('"+_id+"')\">Update</button>"}},

          // { 'data': null, title: 'Action', wrap: true, "render": function (item) { return '<div class="btn-group"> <button type="button" onclick="deleteId()" value="0" class="btn btn-warning">Delete</button></div>' } }
          {
            data: "_id",
            render: function (_id) {
              return "<button onclick=\"deleteId('"+_id+"')\">Delete</button>";
            },
          },
        ],
        pageLength: 3,
        lengthMenu: [ 3, 5, 10, 20, 50, 100, 200, 500],
      });
    },
    error: function (data) {
      alert("Error!");
    },
  });
}


// function get() {
//   var jsonQuery = {
//     query: '{\n  "query":{\n    "match_all":{\n      \n    }\n  }\n}',
//     type: "RECORD",
//     specId: 7077,
//   };
//   $.ajax({
//     url: "https://onprem.boodskap.io/api/elastic/search/query/a017d8b5-f0b7-46d6-8d1e-8b576579583a/RECORD?specId=7077",

//     type: "POST",
//     data: JSON.stringify(jsonQuery),
//     contentType: "application/json",

//     success: function (data) {
//       console.log(data);
//       var jsonConvert = JSON.parse(data.result);
//       var jsonHits = jsonConvert.hits.hits;
//       console.log(jsonHits);
//       // var trow = $("#trow");
//       // jsonHits.forEach((gopi) => {
//       //   console.log(gopi);
//       //   var sourceId = gopi._id;
//       //   var sources = gopi._source;
//       //   trow.append(
//       //     "<tr><td>" +
//       //       sources.firstname +
//       //       "</td><td>" +
//       //       sources.lastname +
//       //       "</td><td>" +
//       //       sources.email +
//       //       "</td><td>" +
//       //       sources.phone +
//       //       "</td><td>" +
//       //       sources.education +
//       //       "</td><td>" +
//       //       sources.place +
//       //       "</td><td>" +
//       //       sources.pincode +
//       //       "</td><td><button onclick='editId(\"" +
//       //       sourceId +
//       //       "\")'>Edit</button></td>" +
//       //       "</td><td><button onclick='updateId(\"" +
//       //       sourceId +
//       //       "\")'>Update</button></td>" +
//       //       "</td><td><button onclick='deleteId(\"" +
//       //       sourceId +
//       //       "\")'>Delete</button></td><tr>"
//       //   );
//       // });
//         $("#table2").DataTable({
//           data:jsonHits,
//           content:[
//             {data:"_source.firstname"},
//             {data:"_source.lastname"},
//             {data:"_source.email"},
//             {data:"_source.phone"},
//             {data:"_source.education"},
//             {data:"_source.place"},
//             {data:"_source.pincode"},
//             {data:"_id",render:function(_id){"<button onclick=\"editId('"+_id+"')\">Edit</button>"}},
//             // {data:"_id",render:function(_id){"<button onclick=\updateId"('"+_id+"')\">Update</button>"}}
//             {data:"_id",render:function(_id){"<button onclick=\"updateId('"+_id+"')\">Update</button>"}},
//             {data:"_id",render:function(_id){"<button onclick=\"deleteId('"+_id+"')\">Delete</button>"}}
//           ]
//         })
//     },
//     error: function (data) {
//       alert("Error!");
//     },
//   });
// }

function refresh(){
      fname.val("");
      lname.val("");
      email.val("");
      phone.val("");
      education.val("");
      place.val("");
      pincode.val("");
}

function deleteId(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      $.ajax({
        url:
          "https://onprem.boodskap.io/api/record/delete/a017d8b5-f0b7-46d6-8d1e-8b576579583a/7077" +
          "/" +
          id,
        method: "DELETE",
        success: function () {
          console.log(Id);
          refresh();
          // get();
          // alert("Successfully Deleted!");   
        },
        error: function (request, msg, error) {
          alert("Oops! try again");
        },
      });

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
  // $.ajax({
  //   url:
  //     "https://onprem.boodskap.io/api/record/delete/598dfd7f-8af3-47d9-be9e-510677e1e34c/7077" +
  //     "/" +
  //     sourceId,
  //   method: "DELETE",
  //   success: function () {
  //     console.log(sourceId);
  //     refresh();
  //     get();
  //     // alert("Successfully Deleted!");   
  //   },
  //   error: function (request, msg, error) {
  //     alert("Oops! try again");
  //   },
  // });
}
var fname = $("#fname");
var lname = $("#lname");
var email = $("#email");
var phone = $("#phone");
var education = $("#education");
var place = $("#place");
var pincode = $("#pincode");

function editId(id) {
  $.ajax({
    url:
      "https://onprem.boodskap.io/api/record/get/a017d8b5-f0b7-46d6-8d1e-8b576579583a/7077" +
      "/" +
      id,
    method: "GET",
    dataType: "json",
    success: function (id) {
      console.log(id);
      // fname.value(sourceId.firstname)
      fname.val(id.firstname);
      lname.val(id.lastname);
      email.val(id.email);
      phone.val(id.phone);
      education.val(id.education);
      place.val(id.place);
      pincode.val(id.pincode);
    },
    error: function () {
      alert("error");
    },
  });
  // updateId(sourceId)
}
function updateId(id){
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: 'Updated Successfully!'
  })
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var education = document.getElementById("education").value;
  var place = document.getElementById("place").value;
  var pincode = document.getElementById("pincode").value;
  
  var jsonFormater = {
      "firstname":fname,
      "lastname":lname,
      "email":email,
      "phone":phone,
      "education":education,
      "place":place,
      "pincode":pincode
  }
  var postData = JSON.stringify(jsonFormater);
   $.ajax({
    url:"https://onprem.boodskap.io/api/record/insert/static/a017d8b5-f0b7-46d6-8d1e-8b576579583a/7077"+"/"+id,
    method:'POST',
    data:postData,
    contentType:'text/plain',
    success:function(postData){
      // alert("Updated Successfully!");
      console.log(postData);
      // console.log(sourceId);
    },
    error:function(){
      console.log(error);
    }
   })
  }
  
