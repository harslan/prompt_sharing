# Fix for Google Sheet Link Not Opening

## Issue
The "Open Prompt Library Sheet" button may not work if the sheet isn't properly shared for public viewing.

## Solution: Get the Correct Public Sharing Link

### Step 1: Open Your Google Sheet
Go to: https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/edit

### Step 2: Set Up Proper Sharing
1. Click the **"Share"** button (top right, blue button)
2. In the sharing dialog, click **"Change to anyone with the link"**
3. Set permission to **"Viewer"** (not Editor)
4. Click **"Copy link"**
5. The link should look like:
   ```
   https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/edit?usp=sharing
   ```

### Step 3: Convert to View-Only Link
Replace `/edit?` with `/view?` in the URL:
```
https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/view?usp=sharing
```

### Step 4: Test the Link
1. Open the link in an incognito/private browser window
2. It should open without requiring sign-in
3. If it works, this is the correct link to use

## Alternative: Use the Direct Link Format

If the above doesn't work, try this format (removes the `usp=sharing` parameter):
```
https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/view
```

## Current Link in Website
The website currently uses:
```
https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/view?usp=sharing
```

If this doesn't work, the issue is likely the sharing permissions, not the URL format.

## Quick Test
Try opening this link directly in your browser:
https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/view?usp=sharing

- **If it opens**: The link is correct, the button should work
- **If it asks for sign-in**: The sheet isn't set to "Anyone with the link can view"
- **If it says "Access denied"**: Sharing permissions need to be updated

