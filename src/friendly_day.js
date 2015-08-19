var WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function (dateString) {
  var d = new Date(dateString);

  return WEEK_DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
}
