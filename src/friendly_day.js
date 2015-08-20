var WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function (dateString) {
  var d = new Date(dateString);

  var time;
  var hour = d.getHours();
  var minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hour >= 12) {
    if (hour > 12) {
      time = d.getHours() - 12;
    }
    else {
      time = d.getHours();
    }
    time += ":" + minutes + "PM";
  }
  else {
    time = d.getHours() + ":" + minutes + "AM";
  }

  return WEEK_DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear() + " at " + time;
}
