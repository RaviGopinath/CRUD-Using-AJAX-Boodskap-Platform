// function send(){
//     let fname = document.getElementById("fname").value;
//     let lname = document.getElementById("lname").value;
//     let email = document.getElementById("email").value;
//     let phone = document.getElementById("phone").value;
//     let education = document.getElementById("Qualification").value;
//     let place = document.getElementById("place").value;
//     let pincode = document.getElementById("pincode").value;


// var payload = {    
//     "education":education,
//     "email":email,
//     "firstname":fname,
//     "lastname":lname,
//     "phone":phone,
//     "pincode":pincode,
//     "place":place  
// };

// var topic = "/MIPPCMEXKG/device/4545/msgs/lenovo/2.0/7077"

// var clientId = "DEV_4545";

// var message = new Paho.MQTT.Message(JSON.stringify(payload));
// message.destinationName = topic;
// message.qos = 2;

// console.log(message);
// client = new Paho.MQTT.Client("192.168.0.121", Number(8083), "/mqtt", clientId);

// // Called when the connection is made
// function onConnect() {
//     console.log("Connected!");
//     client.send(message);
// }

// client.connect({
//     onSuccess: onConnect,
//     userName: "DEV_MIPPCMEXKG",
//     password: "dcXxnjeNZwX9"
// });

// }

// function getData(){
//     $.get('https://onprem.boodskap.io/api/record/get/9a5ef975-7c63-4ac7-a394-ce0f6c3f9be9/7077/16e2326f-5e23-418f-a5c8-11c4590d4697', function(datas, status){
//         document.getElementById("fname").innerText=datas.firstname
//         document.getElementById("lname").innerText=datas.lastname
//         document.getElementById("email").innerText=datas.email
//         document.getElementById("phone").innerText=datas.phone
//         document.getElementById("education").innerText=datas.education
//         document.getElementById("place").innerText=datas.place
//         document.getElementById("pincode").innerText=datas.pincode

//     });
//   };
function send(){
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var education = document.getElementById("Qualification").value;
  var place = document.getElementById("place").value;
  var pincode = document.getElementById("pincode").value;

  if(fname == ""){
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Please Fill Your Firstname',
      showConfirmButton: false,
      timer: 1500
    })
    return false;
  }

  if(lname == ""){
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Please Fill Your Lastname',
      showConfirmButton: false,
      timer: 1500
    })
    return false;
  }

  if(email == ""){
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Please Fill Your Email',
      showConfirmButton: false,
      timer: 1500
    })
    return false;
  }

  if(phone == ""){
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Please Fill Your Phone Number',
      showConfirmButton: false,
      timer: 1500
    })
    return false;
  }

  if(education == ""){
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Please Fill Your Education Qualification',
      showConfirmButton: false,
      timer: 1500
    })
    return false;
  }

  if(place == ""){
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Please Fill Your Address',
      showConfirmButton: false,
      timer: 1500
    })
    return false;
  }

  if(pincode == ""){
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Pincode Fill Pandra Dei!!',
      showConfirmButton: false,
      timer: 1500
    })
    return false;
  }

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
// var domainKey = "MIPPCMEXKG";
// var apiKey = "dcXxnjeNZwX9";
// var token = "598dfd7f-8af3-47d9-be9e-510677e1e34c";
// var url = https://onprem.boodskap.io/api/record/insert/dynamic/598dfd7f-8af3-47d9-be9e-510677e1e34c/7077

var jsonFormat = {
    "firstname":fname,
    "lastname":lname,
    "email":email,
    "phone":phone,
    "education":education,
    "place":place,
    "pincode":pincode
}
var sendData = JSON.stringify(jsonFormat);
 $.ajax({
  url:"https://onprem.boodskap.io/api/record/insert/dynamic/a017d8b5-f0b7-46d6-8d1e-8b576579583a/7077",
  method:'POST',
  data:sendData,
  contentType:'text/plain',
  success:function(sendData){
    console.log(sendData);

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("Qualification").value = "";
    document.getElementById("place").value = "";
    document.getElementById("pincode").value = "";
    // alert("Data sent succesfully!");
  },
  error:function(){
    console.log(error);
  }
 })
}
