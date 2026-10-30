/**
 * ============================================================================
 * STUDIO FIT INDIA — META ADS LEAD CAPTURE GOOGLE APPS SCRIPT
 * ============================================================================
 * 
 * This Google Apps Script connects the /sfi Meta Ads landing page form
 * directly to your Google Sheet: "Studio FIT India - Meta Ads Leads".
 *
 * FEATURES:
 * 1. Automatically sets up the 19 required column headers with styling.
 * 2. Receives lead submissions in real-time from the website.
 * 3. Auto-calculates Lead Priority in Remarks based on start timeline.
 * 4. Sets initial Lead Status to "New Lead".
 * 5. Optional email notification to your Relationship Manager / Sales team.
 * 6. Handles CORS and returns JSON responses.
 *
 * ----------------------------------------------------------------------------
 * STEP-BY-STEP SETUP INSTRUCTIONS:
 * ----------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.google.com) and create a new spreadsheet.
 * 2. Name the spreadsheet: "Studio FIT India - Meta Ads Leads"
 * 3. In the top menu, click: Extensions -> Apps Script
 * 4. Delete any code in the editor, and paste this entire script.
 * 5. (Optional) Set NOTIFICATION_EMAIL below to your email to get instant alerts.
 * 6. Click the blue "Deploy" button at top right -> "New deployment".
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. Configure the web app:
 *    - Description: "SFI Meta Leads Endpoint"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (CRITICAL: must be Anyone so your website can post to it)
 * 9. Click "Deploy", authorize permissions when prompted.
 * 10. Copy the "Web app URL" (it ends with /exec).
 * 11. Open your code: `src/pages/Sfi.jsx`
 *     Replace `YOUR_SCRIPT_ID_HERE` with your Web app URL:
 *     const GSHEET_ENDPOINT = "https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec";
 * 12. Run `npm run build` and you are live!
 * ============================================================================
 */

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const SHEET_NAME = "Studio FIT India - Meta Ads Leads";

// Optional: Enter email addresses (separated by commas) to receive instant lead alerts
const NOTIFICATION_EMAILS = ""; // e.g. "leads@studiofitindia.com, coach@studiofitindia.com"
// ─────────────────────────────────────────────────────────────────────────────

const HEADERS = [
  "Timestamp",
  "Lead ID",
  "Full Name",
  "Mobile Number",
  "WhatsApp Number",
  "Fitness Goal",
  "Preferred Timing",
  "Start Timeline",
  "Contact Method",
  "Consent",
  "Lead Source",
  "Campaign Name",
  "Ad Set Name",
  "Ad Name",
  "Lead Status",
  "Assigned RM",
  "First Contact Time",
  "Follow-up Date",
  "Remarks"
];

/**
 * Handle incoming POST requests from the /sfi web form
 */
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(15000); // Wait up to 15s for concurrent writes

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getActiveSheet();
      sheet.setName(SHEET_NAME);
    }

    // Initialize headers if sheet is brand new
    ensureHeaders(sheet);

    // Parse incoming data
    let data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Auto-calculate Lead Priority & Remarks based on start timeline
    const timeline = data.startTimeline || "";
    let priorityRemark = "";
    if (timeline.indexOf("Immediately") !== -1) {
      priorityRemark = "HIGH PRIORITY: Wants to start immediately (Call promptly)";
    } else if (timeline.indexOf("7 days") !== -1) {
      priorityRemark = "HIGH PRIORITY: Starts within 7 days (Contact & discuss plans)";
    } else if (timeline.indexOf("30 days") !== -1) {
      priorityRemark = "MEDIUM PRIORITY: Starts within 30 days (Share details & follow up)";
    } else if (timeline.indexOf("exploring") !== -1) {
      priorityRemark = "NURTURE: Just exploring options";
    }

    const row = [
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.leadId || ("SFI-" + Date.now().toString(36).toUpperCase()),
      data.fullName || "",
      data.mobile || "",
      data.whatsapp || data.mobile || "",
      data.fitnessGoal || data.program || "",
      data.preferredTiming || data.timing || "",
      data.startTimeline || "",
      data.contactMethod || "",
      data.consent || "Yes",
      data.leadSource || "Website - /sfi",
      data.campaignName || data.utm_campaign || "",
      data.adsetName || data.utm_term || "",
      data.adName || data.utm_content || "",
      "New Lead", // Lead Status default
      "",         // Assigned RM
      "",         // First Contact Time
      "",         // Follow-up Date
      priorityRemark // Remarks
    ];

    sheet.appendRow(row);
    lock.releaseLock();

    // Send optional email notification
    if (NOTIFICATION_EMAILS && NOTIFICATION_EMAILS.trim().length > 0) {
      try {
        const subject = `🔥 New Fitness Lead: ${data.fullName} (${data.fitnessGoal || data.program})`;
        const body = `New Lead Received from Meta Ads:\n\n` +
          `Name: ${data.fullName}\n` +
          `Phone: ${data.mobile}\n` +
          `WhatsApp: ${data.whatsapp || data.mobile}\n` +
          `Goal: ${data.fitnessGoal || data.program}\n` +
          `Timing: ${data.preferredTiming || data.timing}\n` +
          `Start Timeline: ${data.startTimeline}\n` +
          `Contact Via: ${data.contactMethod}\n` +
          `Priority: ${priorityRemark}\n\n` +
          `Campaign: ${data.campaignName || "Direct"}\n` +
          `Timestamp: ${row[0]}`;
        MailApp.sendEmail(NOTIFICATION_EMAILS, subject, body);
      } catch (mailErr) {
        // Continue even if mail fails
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      leadId: row[1],
      message: "Lead recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests for health check
 */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    service: "Studio FIT India Meta Lead Webhook",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Ensure sheet headers match requirements and format them cleanly
 */
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground("#CF1E4C");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    for (let i = 1; i <= HEADERS.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
}
