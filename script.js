const firebaseConfig = {
  apiKey: "AIzaSyBgG9M6LrqzQEngs0Xt6A5QDg5LS-UzN2A",
  authDomain: "project1-ee980.firebaseapp.com",
  databaseURL: "https://project1-ee980-default-rtdb.firebaseio.com",
  projectId: "project1-ee980",
  storageBucket: "project1-ee980.appspot.com",
  messagingSenderId: "653115137440",
  appId: "1:653115137440:web:d3b57f6f10ccf4c2bfd8c5"
};
//   // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//   // Firebase



const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');

const darkMode = document.querySelector('.dark-mode');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

// Kiểm tra xem dark mode có được bật hay không trong localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Function để bật hoặc tắt dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode-variables');
  darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
  darkMode.querySelector('span:nth-child(2)').classList.toggle('active');

  // Lưu trạng thái dark mode vào localStorage
  const isDarkModeEnabled = document.body.classList.contains('dark-mode-variables');
  localStorage.setItem('darkMode', isDarkModeEnabled ? 'enabled' : 'disabled');
}

// Nếu dark mode đã được bật từ trước, kích hoạt nó
if (isDarkMode) {
  toggleDarkMode();
}

// Thêm sự kiện click cho darkMode
darkMode.addEventListener('click', toggleDarkMode);


// Ham chinh aside khi phong to window tro  lai//////////////
window.addEventListener('resize', function() {
  var screenWidth = window.innerWidth;
  var asideElement = document.querySelector('aside');

  if (screenWidth >= 769) {
      asideElement.style.display = 'block';
  } else {
      asideElement.style.display = 'none';
  }
});


/////////////////////////////////////
// chuyen phong ////////
function switchPage(evt, pageName) {
  var i, sections, links;

  // Lấy danh sách các sections
  sections = document.getElementsByTagName("section");

  // Ẩn tất cả các sections
  for (i = 0; i < sections.length; i++) {
      sections[i].style.display = "none";
  }

  // Lấy danh sách các links có class "active"
  links = document.getElementsByClassName("active");

  // Loại bỏ class "active" từ tất cả các links
  for (i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
  }

  // Hiển thị phần tử được chọn và thêm class "active" cho link
  var targetSection = document.getElementById(pageName);
  if (targetSection) {
      if (targetSection.style.display !== "flex") {
          targetSection.style.display = "block";
          evt.currentTarget.classList.add("active");
      }
  }
  // Ngăn chặn mặc định của sự kiện (ví dụ: chặn link từ việc chuyển hướng)
  evt.preventDefault();
}

// Chuyen trang thai dieu khien ///////////////
document.addEventListener('DOMContentLoaded', function() {
  var colorModeToggle = document.getElementById('color_mode');
  var settimeDiv = document.querySelector('.settime');
  var setvalueDiv = document.querySelector('.setvalue');
  var switches = document.querySelectorAll('.switch input[type="checkbox"]');

  function updateDisplay() {
      if (colorModeToggle.checked) {
          settimeDiv.classList.add('hidden');
          setvalueDiv.classList.remove('hidden');
          switches.forEach(function(switchBtn) {
            switchBtn.disabled = true;
            switchBtn.parentNode.classList.add('disabled');
        });
      } else {
          settimeDiv.classList.remove('hidden');
          setvalueDiv.classList.add('hidden');
          switches.forEach(function(switchBtn) {
            switchBtn.disabled = false;
            switchBtn.parentNode.classList.remove('disabled');
        });
      }
  }

  colorModeToggle.addEventListener('change', function() {
    updateDisplay();
    var mode = colorModeToggle.checked ? 'Auto' : 'Manual';
    database.ref('/Mode').set(mode);
});

// Lấy trạng thái từ Firebase khi trang được tải lại
database.ref('/Mode').once('value').then(function(snapshot) {
    var mode = snapshot.val();
    if (mode === 'Auto') {
        colorModeToggle.checked = true;
    } else {
        colorModeToggle.checked = false;
    }
    updateDisplay();
});

updateDisplay();
});

// // Sensorssssssssssssss///////////////////////
firebase.database().ref("/Sensor/Temperature").on("value", function(snapshot) {
  var temp = snapshot.val();
  document.getElementById("temp").innerHTML = temp;
});
firebase.database().ref("/Sensor/Humidity").on("value", function(snapshot) {
  var hum = snapshot.val();
  document.getElementById("hum").innerHTML = hum;
});
firebase.database().ref("/Sensor/Bright").on("value", function(snapshot) {
  var bright = snapshot.val();
  document.getElementById("bright").innerHTML = bright;
});

// Deviceeeeeeeeeeeeeeeeee///////////////////
var bulb = document.getElementById("bulb-btn"); 
bulb.onclick = function(){  
      firebase.database().ref("/Device").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Bulb").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Device").update({
          "Bulb": newStatus
        });
      });
};

firebase.database().ref("/Device/Bulb").on("value", function(snapshot) {
  var bulb = snapshot.val();
  document.getElementById("bulb-status").innerHTML = bulb;
  if (bulb == 'ON') {
    document.getElementById("bulb-img").src = "./img/light-on.png";
    document.getElementById("bulb-btn").checked = true;
  }
  else {
    document.getElementById("bulb-img").src = "./img/light-off.png";
    document.getElementById("bulb-btn").checked = false;
  }
});

var fan = document.getElementById("fan-btn"); 
fan.onclick = function(){  
      firebase.database().ref("/Device").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Fan").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Device").update({
          "Fan": newStatus
        });
      });
};

firebase.database().ref("/Device/Fan").on("value", function(snapshot) {
  var fan = snapshot.val();
  var fan_img = document.getElementById("fan-img");
  document.getElementById("fan-status").innerHTML = fan;
  if (fan == 'ON') {
    document.getElementById("fan-img").src = "./img/fan-on.png";
    fan_img.classList.add('rotate');
    document.getElementById("fan-btn").checked = true;
  }
  else {
    document.getElementById("fan-img").src = "./img/fan-off.png";
    fan_img.classList.remove('rotate');
    document.getElementById("fan-btn").checked = false;
  }
});

var pump = document.getElementById("pump-btn"); 
pump.onclick = function(){  
      firebase.database().ref("/Device").once("value").then(function(snapshot) {
        var currentStatus = snapshot.child("Pump").val();
    
        // Chuyển đổi trạng thái
        var newStatus = (currentStatus === "OFF") ? "ON" : "OFF";
    
        // Cập nhật trạng thái mới vào Firebase
        firebase.database().ref("/Device").update({
          "Pump": newStatus
        });
      });
};

firebase.database().ref("/Device/Pump").on("value", function(snapshot) {
  var pump = snapshot.val();
  document.getElementById("pump-status").innerHTML = pump;
  if (pump == 'ON') {
    document.getElementById("pump-img").src = "./img/pump-on.png";
    document.getElementById("pump-btn").checked = true;
  }
  else {
    document.getElementById("pump-img").src = "./img/pump-off.png";
    document.getElementById("pump-btn").checked = false;
  }
});
// VoltAmpeeeeeeeeeeeeeeeeeeeee////////////////
firebase.database().ref("/VoltAmpe/Bulb").on("value", function(snapshot) {
  var bulb_volt = snapshot.child("Volt").val();
  document.getElementById("bulb-volt").innerHTML = bulb_volt;
  var bulb_ampe = snapshot.child("Ampe").val();
  document.getElementById("bulb-ampe").innerHTML = bulb_ampe;

  if(bulb_volt >= 20 && bulb_volt <= 30 && bulb_ampe >= 20 && bulb_ampe <= 30){
    document.getElementById("bulb-warn").innerHTML = "Good";
    document.getElementById("bulb-warn").style.color = "#1b9c85";
  }
  else {
    document.getElementById("bulb-warn").innerHTML = "Warning";
    document.getElementById("bulb-warn").style.color = "#ff0060";
  }
});

firebase.database().ref("/VoltAmpe/Fan").on("value", function(snapshot) {
  var fan_volt = snapshot.child("Volt").val();
  document.getElementById("fan-volt").innerHTML = fan_volt;
  var fan_ampe = snapshot.child("Ampe").val();
  document.getElementById("fan-ampe").innerHTML = fan_ampe;

  if(fan_volt >= 20 && fan_volt <= 30 && fan_ampe >= 20 && fan_ampe <= 30){
    document.getElementById("fan-warn").innerHTML = "Good";
    document.getElementById("fan-warn").style.color = "#1b9c85";
  }
  else {
    document.getElementById("fan-warn").innerHTML = "Warning";
    document.getElementById("fan-warn").style.color = "#ff0060";
  }
});

firebase.database().ref("/VoltAmpe/Pump").on("value", function(snapshot) {
  var pump_volt = snapshot.child("Volt").val();
  document.getElementById("pump-volt").innerHTML = pump_volt;
  var pump_ampe = snapshot.child("Ampe").val();
  document.getElementById("pump-ampe").innerHTML = pump_ampe;

  if(pump_volt >= 20 && pump_volt <= 30 && pump_ampe >= 20 && pump_ampe <= 30){
    document.getElementById("pump-warn").innerHTML = "Good";
    document.getElementById("pump-warn").style.color = "#1b9c85";
  }
  else {
    document.getElementById("pump-warn").innerHTML = "Warning";
    document.getElementById("pump-warn").style.color = "#ff0060";
  }
});

// // Cameraaaaaaaaaaaaaaaaaaaa///////////////////
// function getImageUrl() {
//     var storage = firebase.storage();
//     var storageRef = storage.ref();

//     // Tên tệp ảnh bạn muốn truy cập
//     var fileName = 'data/photo.jpg';

//     // Lấy URL tải xuống của tệp ảnh
//     storageRef.child(fileName).getDownloadURL().then(function(url) {
//         // Gán URL cho thuộc tính src của một thẻ <img>
//         var img = document.getElementById('photo');
//         img.src = url;
//     }).catch(function(error) {
//         console.error("Error retrieving image:", error);
//     });
// }
// // Gọi hàm getImageUrl() mỗi giây
// setInterval(getImageUrl, 100); // 100 milliseconds = 0.1 second


// firebase.database().ref("/IP").on("value", function(snapshot) {
//     var iplivecam = snapshot.val();
//     // Gắn địa chỉ IP lấy được vào nút "ip-livecam"
//     document.getElementById("ip-livecam").addEventListener("click", function() {
//       // Chuyển hướng đến địa chỉ IP khi nhấn vào nút
//       window.location.href = "http://" + iplivecam;
//     });
//   });

// Set timeeeee////////////////
document.addEventListener('DOMContentLoaded', function () {

  function addTask() {
      var datetime = document.getElementById("datetime-input").value;
      var device_name = document.getElementById("device-name").value;
      var device_oper = document.getElementById("device-oper").value;

      var currentTime = new Date();
      var selectedTime = new Date(datetime);

      if (!datetime) {
          alert("Vui lòng chọn thời gian cụ thể.");
          return;
      }
      if (selectedTime < currentTime) {
          alert("Vui lòng chọn thời gian sau thời điểm hiện tại.");
          document.getElementById("datetime-input").value = ''; // Xóa giá trị đã chọn nếu nó trước thời gian hiện tại
          return;
      }

      // Kiểm tra xem phần tử .task-body-table tồn tại trong DOM hay không
      var task_table = document.querySelector(".task-body-table table tbody");

      // Lấy số hàng hiện tại trong bảng
      var currentRowCount = task_table.rows.length;
      if (currentRowCount > 10) {
          alert("Số lượng task đã đạt tối đa (10 tasks).");
          return;
      }

      // Tạo hàng mới
      var task_row = task_table.insertRow();

      // Tạo cột số thứ tự
      var index_cell = task_row.insertCell(0);
      index_cell.textContent = currentRowCount + 1;

      // Tạo cột device
      var device_cell = task_row.insertCell(1);
      device_cell.textContent = device_name;

      // Tạo cột datetime
      var datetime_cell = task_row.insertCell(2);
      datetime_cell.textContent = datetime;

      // Tạo cột state
      var state_cell = task_row.insertCell(3);
      state_cell.textContent = device_oper;

      // Tạo cột nút xóa
      var delete_cell = task_row.insertCell(4);
      var delete_button = document.createElement("button");
      delete_button.innerHTML = "Delete";
      delete_button.className = "delete-button"; // Thêm class cho nút xóa để áp dụng CSS
      delete_button.onclick = function () {
          var rowIndex = this.parentNode.parentNode.rowIndex; // Lấy chỉ số hàng của task được xóa
          var taskId = task_row.getAttribute("data-task-id"); // Lấy ID của task từ thuộc tính data-task-id

          // Xóa task khỏi Firebase
          database.ref("/Tasks/" + taskId).remove();

          // Xóa hàng chứa nút xóa
          this.parentNode.parentNode.remove();

          // Cập nhật lại số thứ tự của các task sau khi xóa
          for (var i = 0; i < task_table.rows.length; i++) {
              task_table.rows[i].cells[0].textContent = i + 1; // Cập nhật số thứ tự
          }
      };
      delete_cell.appendChild(delete_button);

      // Lưu task vào Firebase
      var newTaskRef = database.ref("/Tasks").push();
      var taskId = newTaskRef.key;

      newTaskRef.set({
          id: taskId,
          device: device_name,
          status: device_oper,
          datetime: datetime
      });

      // Thiết lập timeout cho task
      var timeDifference = selectedTime.getTime() - currentTime.getTime();
      setTimeout(function () {
          // Cập nhật Firebase với trạng thái của thiết bị
          var devicePath = "/Device/" + device_name; // Đường dẫn cố định cho từng thiết bị
          database.ref(devicePath).set(device_oper);

          // Xóa task khỏi Firebase sau khi thực hiện
          database.ref("/Tasks/" + taskId).remove();

          // Xóa hàng task sau khi thực hiện
          task_row.remove();

          // Cập nhật lại số thứ tự của các task sau khi xóa
          for (var i = 0; i < task_table.rows.length; i++) {
              task_table.rows[i].cells[0].textContent = i + 1; // Cập nhật số thứ tự
          }

      }, timeDifference);

      // Gán ID của task vào hàng để tiện truy cập
      task_row.setAttribute("data-task-id", taskId);
  }

  // Tải các task từ Firebase khi trang được tải lại
  database.ref("/Tasks").once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
          var task = childSnapshot.val();
          var task_table = document.querySelector(".task-body-table table tbody");

          // Tạo hàng mới
          var task_row = task_table.insertRow();

          // Tạo cột số thứ tự
          var index_cell = task_row.insertCell(0);
          index_cell.textContent = task_table.rows.length;

          // Tạo cột device
          var device_cell = task_row.insertCell(1);
          device_cell.textContent = task.device;

          // Tạo cột datetime
          var datetime_cell = task_row.insertCell(2);
          datetime_cell.textContent = task.datetime;

          // Tạo cột state
          var state_cell = task_row.insertCell(3);
          state_cell.textContent = task.status;

          // Tạo cột nút xóa
          var delete_cell = task_row.insertCell(4);
          var delete_button = document.createElement("button");
          delete_button.innerHTML = "Delete";
          delete_button.className = "delete-button"; // Thêm class cho nút xóa để áp dụng CSS
          delete_button.onclick = function () {
              var rowIndex = this.parentNode.parentNode.rowIndex; // Lấy chỉ số hàng của task được xóa
              var taskId = task_row.getAttribute("data-task-id"); // Lấy ID của task từ thuộc tính data-task-id

              // Xóa task khỏi Firebase
              database.ref("/Tasks/" + taskId).remove();

              // Xóa hàng chứa nút xóa
              this.parentNode.parentNode.remove();

              // Cập nhật lại số thứ tự của các task sau khi xóa
              for (var i = 0; i < task_table.rows.length; i++) {
                  task_table.rows[i].cells[0].textContent = i + 1; // Cập nhật số thứ tự
              }
          };
          delete_cell.appendChild(delete_button);
      });
  });

  // Gán hàm addTask cho nút Add
  document.getElementById("add-task-button").onclick = addTask;
});

// Set valueeeeeeeeeeee///////////
document.addEventListener('DOMContentLoaded', function() {
  // Xử lý sự kiện submit cho các giá trị min/max
  function isValidInput(min, max) {
    if (isNaN(min) || isNaN(max)) {
        alert("Vui lòng nhập số hợp lệ cho giá trị min và max.");
        return false;
    }
    if (parseFloat(min) >= parseFloat(max)) {
        alert("Giá trị max phải lớn hơn giá trị min.");
        return false;
    }
    return true;
}

  document.getElementById('temp-submit').addEventListener('click', function() {
      var tempMin = document.getElementById('text-temp-min').value;
      var tempMax = document.getElementById('text-temp-max').value;
      if (isValidInput(tempMin, tempMax)) {
        database.ref('Set Value/Temperature').set({
            Min: tempMin,
            Max: tempMax
        });
      }
  });

  document.getElementById('hum-submit').addEventListener('click', function() {
      var humMin = document.getElementById('text-hum-min').value;
      var humMax = document.getElementById('text-hum-max').value;
      if (isValidInput(humMin, humMax)) {
        database.ref('Set Value/Humidity').set({
            Min: humMin,
            Max: humMax
        });
      }
  });

  document.getElementById('bright-submit').addEventListener('click', function() {
      var brightMin = document.getElementById('text-bright-min').value;
      var brightMax = document.getElementById('text-bright-max').value;
      if (isValidInput(tempMin, tempMax)) {
        database.ref('Set Value/Brightness').set({
            Min: brightMin,
            Max: brightMax
        });
      }
  });

  // Lấy các giá trị min/max từ Firebase khi tải lại trang
  database.ref('Set Value/Temperature').once('value').then(function(snapshot) {
      var tempSettings = snapshot.val();
      document.getElementById('text-temp-min').value = tempSettings.Min;
      document.getElementById('text-temp-max').value = tempSettings.Max;
  });

  database.ref('Set Value/Humidity').once('value').then(function(snapshot) {
      var humSettings = snapshot.val();
      document.getElementById('text-hum-min').value = humSettings.Min;
      document.getElementById('text-hum-max').value = humSettings.Max;
  });

  database.ref('Set Value/Brightness').once('value').then(function(snapshot) {
      var brightSettings = snapshot.val();
      document.getElementById('text-bright-min').value = brightSettings.Min;
      document.getElementById('text-bright-max').value = brightSettings.Max;
  });

  // Kiểm tra các giá trị và điều khiển thiết bị
  function checkAndControlDevices() {
      // Lấy các giá trị từ Firebase
      database.ref('/Mode').once('value').then(function(snapshot) {
        var mode = snapshot.val();
        if (mode === 'Auto') {
          firebase.database().ref("/Sensor").on("value", function(snapshot) {
              var currentTemp = snapshot.child("Temperature").val(); // Hàm giả lập lấy nhiệt độ hiện tại
              var currentHum = snapshot.child("Humidity").val(); // Hàm giả lập lấy độ ẩm hiện tại
              var currentBright = snapshot.child("Brightness").val(); // Hàm giả lập lấy độ sáng hiện tại

              firebase.database().ref("/Set Value").on("value", function(snapshot) {
              // Điều khiển thiết bị dựa trên giá trị nhiệt độ
                var setvalue = snapshot.val();
                if (currentTemp < setvalue.Temperature.Min) {
                    controlDevice('Fan', 'OFF');
                    controlDevice('Bulb', 'ON');
                } else if (currentTemp >= setvalue.Temperature.Min && currentTemp <= setvalue.Temperature.Max) {
                    controlDevice('Fan', 'OFF');
                    controlDevice('Bulb', 'OFF');
                } else if (currentTemp > setvalue.Temperature.Max) {
                    controlDevice('Fan', 'ON');
                    controlDevice('Bulb', 'OFF');
                }

                // Điều khiển thiết bị dựa trên giá trị độ ẩm
                // if (currentHum < settings.humidity.min) { ... }
                // if (currentHum > settings.humidity.max) { ... }

                // Điều khiển thiết bị dựa trên giá trị độ sáng
                // if (currentBright < settings.brightness.min) { ... }
                // if (currentBright > settings.brightness.max) { ... }
            });
          });
        }
      });
  }
  function controlDevice(device, state) {
    var devicePath = "/Device/" + device;
    database.ref(devicePath).set(state);
}
  setInterval(checkAndControlDevices, 1000);
});
// Clockkkkkkkkkkkk/////////
// Lấy các phần tử HTML cần thao tác
var hourDisplay = document.querySelector('.hdisplay');
var minuteDisplay = document.querySelector('.mdisplay');
var secondDisplay = document.querySelector('.sdisplay');

// Hàm cập nhật giờ, phút, giây
function updateClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');

    // Cập nhật nội dung cho các phần tử hiển thị giờ, phút, giây
    hourDisplay.textContent = hours;
    minuteDisplay.textContent = minutes;
    secondDisplay.textContent = seconds;
}

// Gọi hàm cập nhật lần đầu tiên để hiển thị thời gian ban đầu
updateClock();

// Cập nhật thời gian mỗi giây
setInterval(updateClock, 1000);

// Lấy phần tử HTML cần thao tác
var dayDisplay = document.querySelector('.day-display');
var monthDisplay = document.querySelector('.month-display');
var yearDisplay = document.querySelector('.year-display');

// Hàm cập nhật ngày, tháng, năm
function updateDate() {
    var now = new Date();
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var dayOfWeek = daysOfWeek[now.getDay()];
    var month = monthsOfYear[now.getMonth()];
    var day = now.getDate();
    var year = now.getFullYear();

    // Cập nhật nội dung cho các phần tử hiển thị ngày, tháng, năm
    dayDisplay.textContent = dayOfWeek + ", " + month + " " + day + " " + year;
}

// Gọi hàm cập nhật ngày tháng khi trang web được tải
updateDate();