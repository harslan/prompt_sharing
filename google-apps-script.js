/**
 * Google Apps Script to Convert Google Sheet to JSON
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Save the project
 * 5. Click Deploy > New deployment
 * 6. Select type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Click Deploy
 * 10. Copy the Web App URL
 * 11. Use that URL in your website's JavaScript
 */

function doGet() {
  // Your Sheet ID (already configured)
  const SHEET_ID = '1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E';
  // Sheet tab name - update if your tab has a different name
  const SHEET_NAME = 'Form Responses 1';
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Get headers (first row)
    const headers = data[0];
    
    // Get all rows except header
    const rows = data.slice(1);
    
    // Convert to array of objects
    const submissions = rows
      .filter(row => row[0] !== '') // Filter out empty rows
      .map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
    
    // Return as JSON
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      count: submissions.length,
      submissions: submissions
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

