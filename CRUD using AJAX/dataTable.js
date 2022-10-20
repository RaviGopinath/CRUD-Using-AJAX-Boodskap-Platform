// $(document).ready(function () {
//   $("#table1").DataTable();
// });

// $("#table1").DataTable({
//     "pageLength":3
// })

// $('#table2').DataTable({
//     "pageLength": 3
// });
// var array = [
//     [
//         "Ram",
//         "21",
//         "Male",
//         "Doctor"
//     ],
//     [
//         "Mohan",
//         "32",
//         "Male",
//         "Teacher"
//     ],
//     [
//         "Rani",
//         "42",
//         "Female",
//         "Nurse"
//     ],
//     [
//         "Johan",
//         "23",
//         "Female",
//         "Software Engineer"
//     ],
//     [
//         "Shajia",
//         "39",
//         "Female",
//         "Farmer"
//     ]
// ];

// $("#table2").DataTable({
//     data:array,
//     "pageLength":3
// });

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
          // { 'data': null, title: 'Action', wrap: true, "render": function (item) { return '<div class="btn-group"> <button type="button" onclick="deleteId()" value="0" class="btn btn-warning">Delete</button></div>' } }
          {
            data: "_id",
            render: function (_id) {
              return "<button onclick=\"deleteId('"+_id+"')\">Delete</button>";
            },
          },
        ],
        pageLength: 3,
      });
    },
    error: function (data) {
      alert("Error!");
    },
  });
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
      fname.val(id.firstname);
      lname.val(id.lastname);
      email.val(id.email)
      phone.val(id.phone)
      education.val(id.education)
      place.val(id.place)
      pincode.val(id.pincode)
      console.log(id);
    },
    error: function () {
      alert("error");
    },
  });
}

function deleteId(id){
  $.ajax({
    url:"https://onprem.boodskap.io/api/record/delete/a017d8b5-f0b7-46d6-8d1e-8b576579583a/7077"+"/"+id,
    method:'DELETE',
    success:function(){
      console.log(id);
    },
    error:function(){
      alert("Oops! Try Again");
    }
  })
}