# Google Sheets Form Integration Setup

Follow these steps to connect the contact form to a Google Sheets spreadsheet.

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Sign in with your connor@ifp.org account
3. Create a new spreadsheet
4. Name it "Let DC Build - Signups" (or whatever you prefer)
5. In the first row, add these headers:
   - Column A: `Name`
   - Column B: `Email`
   - Column C: `Timestamp`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.name,
      data.email,
      data.timestamp
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (disk icon)
5. Name the project "Let DC Build Form Handler"

## Step 3: Deploy as Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the details:
   - **Description**: "Form submission handler"
   - **Execute as**: Me (your connor@ifp.org account)
   - **Who has access**: Anyone
4. Click **Deploy**
5. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your connor@ifp.org account
   - Click **Advanced** > **Go to [project name] (unsafe)**
   - Click **Allow**
6. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...`)

## Step 4: Update the Website

1. Open the `script.js` file in your website code
2. Find this line:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual Web app URL (in quotes)
4. Save the file
5. Commit and push to GitHub

## Testing

1. Visit your website at https://letdcbuild.com
2. Fill out the form with test data
3. Click Submit
4. Check your Google Sheet - a new row should appear with the submission

## Troubleshooting

- Make sure the script is deployed as "Anyone" can access
- Make sure you authorized the script with your connor@ifp.org account
- Check the Apps Script execution logs: **Extensions** > **Apps Script** > **Executions**
- Form submissions should appear in your sheet within seconds
