function doGet(request) {
 
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1H9foKVzI-Xb9qgERlkoplQuGWzKFJyhR4JD1iIv3b8o/edit?usp=sharing");
  var sheet = ss.getSheetByName("Attendance");

  var column_1 = request.parameter.col1;

  var result = {};

  var timeIn = new Date();
  var timeInTimestamp = Utilities.formatDate(timeIn, "Asia/Bangkok", "yyyy-MM-dd HH:mm:ss");
  var timeInText = "Time In";

  // Append data along with time in timestamp
  sheet.appendRow([timeInText,timeInTimestamp, column_1 ]);

  result.result = 'Time In recorded';
  result.timestamp = timeInTimestamp;

  var resultJSON = JSON.stringify(result);

  return ContentService.createTextOutput(resultJSON).setMimeType(ContentService.MimeType.JSON);
}
