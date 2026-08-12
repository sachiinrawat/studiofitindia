// ─────────────────────────────────────────────────────────────────────────────
// Studio FIT India – Batch Finder Quiz Lead Collector
// Paste this entire file into Google Apps Script and deploy as Web App:
//   Execute as: Me
//   Who has access: Anyone (even anonymous)
// ─────────────────────────────────────────────────────────────────────────────

const SHEET_NAME = "Batch Leads"; // Change this to your actual sheet tab name

function doPost(e) {
  try {
    // Parse the incoming JSON body (sent as text/plain from the React app)
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Auto-create headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Phone", "Goal", "Timing", "Diet", "Source"]);
    }

    // Append a new row with the lead data
    sheet.appendRow([
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name   || "",
      data.phone  || "",
      data.goal   || "",
      data.timing || "",
      data.diet   || "Skipped",
      data.source || "Batch Finder Quiz",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function you can run directly in Apps Script editor
function testDoPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        phone: "9999999999",
        goal: "Weight Loss",
        timing: "9 AM to 11 AM",
        diet: "Skipped",
        source: "Batch Finder Quiz"
      })
    }
  };
  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
