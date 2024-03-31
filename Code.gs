var sheetURL = "https://docs.google.com/spreadsheets/d/1H9foKVzI-Xb9qgERlkoplQuGWzKFJyhR4JD1iIv3b8o/edit?usp=sharing";

var Route = {};

Route.path = function(route,callback){
  Route[route] = callback;
}


function doGet(e) {

  Route.path("attendance",loadAttendance);
  // Route.path("edit",loadEdit);

  if (Route[e.parameters.v]){
    return Route[e.parameters.v]();
  } else {
    return render("index");
  }
  // return HtmlService.createTemplateFromFile("Attendance").evaluate();
}


function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function render(file,argsObject){
  var tmp = HtmlService.createTemplateFromFile(file);

  if(argsObject){
    var keys = Object.keys(argsObject);

    keys.forEach(function(key){
      tmp[key] = argsObject[key];
    });
  }//END IF
  return tmp.evaluate();

}

function getScriptUrl() {
 var pageUrl = ScriptApp.getService().getUrl();
 Logger.log(pageUrl);
 return pageUrl;
}

function getData(){
  var ss = SpreadsheetApp.openByUrl(sheetURL);
  var ws = ss.getSheetByName("Employtee_Details");
  var data = ws.getRange(2, 1, ws.getLastRow()-1,6).getValues();

  // var jsondata = JSON.stringify(data)
  Logger.log(data);
  return (data);
}

function getAttendance(){
  var ss = SpreadsheetApp.openByUrl(sheetURL);
  var ws = ss.getSheetByName("Attendance");
  var data = ws.getRange(2, 3, ws.getLastRow()-1,1).getValues();
  
  var attendanceIds = data.map(function(row) {
    return String(row[0]); // Extracting only the first element (ID) from each row
  });

  Logger.log(attendanceIds);
  return attendanceIds;
}

function loadAttendance(){
  return render("Attendance",{title: Attendance})
}
