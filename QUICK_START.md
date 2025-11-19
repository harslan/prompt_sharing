# Quick Start - Get Your Site Live in 15 Minutes

## Step 1: Test Locally (2 minutes)

First, let's make sure everything works on your computer:

1. **Open Terminal** in this directory
2. **Start a simple web server**:

```bash
# Python 3 (most common)
python3 -m http.server 8000

# OR if you have Python 2
python -m SimpleHTTPServer 8000

# OR if you have Node.js
npx http-server
```

3. **Open your browser** and go to: `http://localhost:8000`
4. You should see your site! Click around to test it.
5. **Press Ctrl+C** in terminal to stop the server when done testing

## Step 2: Create GitHub Repository (5 minutes)

### Option A: Using GitHub Website (Easiest)

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Repository name: `prompt_sharing` (or any name you like)
4. Description: "SAIL Prompt Library for Suffolk University"
5. Set to **Public** (required for free GitHub Pages)
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **Create repository**

### Option B: Using GitHub CLI (if you have it installed)

```bash
gh repo create prompt_sharing --public --source=. --remote=origin --push
```

## Step 3: Push Your Code to GitHub (3 minutes)

Run these commands in your terminal (from the project directory):

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: SAIL Prompt Library website"

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/prompt_sharing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: If you haven't set up git credentials, GitHub will prompt you. You may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys

## Step 4: Enable GitHub Pages (2 minutes)

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/prompt_sharing`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Select **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes, then visit: `https://YOUR_USERNAME.github.io/prompt_sharing/`

**Your site is now live!** 🎉

## Step 5: Set Up Google Form & Sheet (5 minutes)

### Create Google Form

1. Go to [forms.google.com](https://forms.google.com)
2. Click **Blank** to create new form
3. Name it: "SAIL Prompt Submission"
4. Follow the detailed guide in `GOOGLE_FORM_SETUP.md` OR use this quick version:

**Add these fields:**
- Your Name (Short answer, Required)
- Email (Short answer, Required, Email validation)
- Department (Dropdown, Required)
- Course Name/Number (Short answer, Required)
- Challenge/Problem (Paragraph, Required)
- Your Approach (Paragraph, Required)
- The Prompt (Paragraph, Required)
- Outcome/Results (Paragraph, Required)
- Category (Multiple choice: Learning Activities, Assessment, Course Design, Student Support, Research, Other)
- Additional Notes (Paragraph, Optional)

5. Click **Send** → Copy the form link

### Create Google Sheet

1. In your form, click **Responses** tab
2. Click the green **Sheets** icon (📊)
3. This creates a linked spreadsheet
4. In the Sheet: Click **Share** → **Get link** → Set to "Anyone with the link can view"
5. Copy the Sheet URL

## Step 6: Update Links in Your Website (2 minutes)

1. Go back to your GitHub repository
2. Click on `index.html`
3. Click the **pencil icon** (✏️) to edit
4. Find line ~240 (search for `id="sheet-link"`)
5. Replace `href="#"` with your Google Sheet URL
6. Find line ~270 (search for `id="form-link"`)
7. Replace `href="#"` with your Google Form URL
8. Scroll down, click **Commit changes**
9. Your site will update automatically in 1-2 minutes!

## Step 7: Share It! (1 minute)

Your site is now live at:
`https://YOUR_USERNAME.github.io/prompt_sharing/`

Share this URL with:
- Faculty via Canvas
- SAIL Friday sessions
- Email announcements

## Troubleshooting

**Site not showing?**
- Wait 2-3 minutes after enabling Pages
- Check Settings → Pages to ensure it's enabled
- Make sure repository is Public

**Can't push to GitHub?**
- Make sure you're authenticated (GitHub will guide you)
- You may need a Personal Access Token (Settings → Developer settings → Personal access tokens)

**Links not working?**
- Make sure you updated both the Sheet and Form URLs in index.html
- Test the URLs in a new browser tab first

**Need help?** Check the full README.md for detailed instructions!

