# Implementation Guide: Display Submissions on Website

This guide shows you how to display Google Sheet submissions directly on your website using Google Apps Script.

## Overview

Instead of linking to Google Sheets, submissions will appear as beautiful cards on your website with:
- ✅ Professional styling
- ✅ Search and filter capabilities
- ✅ Mobile-friendly design
- ✅ Automatic updates (when new submissions arrive)

## Step 1: Set Up Google Apps Script (5 minutes)

1. **Open your Google Sheet**
   - Go to: https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/edit

2. **Open Apps Script**
   - Click **Extensions** → **Apps Script**

3. **Paste the code**
   - Delete any existing code
   - Copy the code from `google-apps-script.js`
   - Paste it into the editor
   - **Update the SHEET_ID** if needed (should already be correct)

4. **Save the project**
   - Click the floppy disk icon or press Cmd+S
   - Name it: "SAIL Submissions API"

5. **Deploy as Web App**
   - Click **Deploy** → **New deployment**
   - Click the gear icon ⚙️ next to "Select type"
   - Choose **Web app**
   - Set:
     - **Description**: "SAIL Submissions JSON API"
     - **Execute as**: Me
     - **Who has access**: Anyone
   - Click **Deploy**
   - **Copy the Web App URL** (you'll need this!)

6. **Authorize the script**
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [project name] (unsafe)**
   - Click **Allow**

## Step 2: Update Your Website (10 minutes)

### 2.1 Add the HTML container

In `index.html`, replace the "Browse All Prompts" section with:

```html
<section id="browse" class="section">
    <div class="container">
        <h2>Browse All Prompts</h2>
        <p class="section-intro">
            Explore faculty-submitted prompts with full context. Search and filter by department, 
            category, or course.
        </p>
        
        <!-- Search and Filter Controls -->
        <div class="submissions-controls">
            <input type="text" id="search-input" placeholder="Search prompts, courses, or challenges...">
            <select id="category-filter">
                <option value="">All Categories</option>
                <option value="Learning Activities">Learning Activities</option>
                <option value="Assessment">Assessment</option>
                <option value="Course Design">Course Design</option>
                <option value="Student Support">Student Support</option>
                <option value="Research">Research</option>
                <option value="Administrative Tasks">Administrative Tasks</option>
            </select>
            <select id="department-filter">
                <option value="">All Departments</option>
                <option value="Accounting">Accounting</option>
                <option value="Finance">Finance</option>
                <option value="ISOM">ISOM</option>
                <option value="Management">Management</option>
                <option value="Marketing">Marketing</option>
                <option value="Strategy/International Business">Strategy/International Business</option>
                <option value="Public Administration">Public Administration</option>
                <option value="Healthcare Administration">Healthcare Administration</option>
            </select>
        </div>
        
        <!-- Submissions will appear here -->
        <div id="submissions-container"></div>
        
        <!-- Fallback link -->
        <div style="text-align: center; margin-top: 2rem;">
            <a href="https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/view?usp=sharing" 
               target="_blank" 
               class="btn btn-secondary">
                View Full Sheet
            </a>
        </div>
    </div>
</section>
```

### 2.2 Add the CSS

Add this to `styles.css` (or include `submissions-display.css`):

```html
<link rel="stylesheet" href="submissions-display.css">
```

### 2.3 Add the JavaScript

1. **Update `submissions-display.js`**
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL from Step 1
   - Replace `YOUR_SHEET_URL` with your sheet URL

2. **Include in `index.html`** (before closing `</body>` tag):

```html
<script src="submissions-display.js"></script>
```

### 2.4 Add Search/Filter Functionality (Optional)

Add this to `submissions-display.js`:

```javascript
// Add search and filter functionality
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const departmentFilter = document.getElementById('department-filter');

let allSubmissions = [];

function filterSubmissions() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const department = departmentFilter.value;
    
    const filtered = allSubmissions.filter(sub => {
        const matchesSearch = !searchTerm || 
            (sub['Course Name/Number'] && sub['Course Name/Number'].toLowerCase().includes(searchTerm)) ||
            (sub['Challenge/Problem'] && sub['Challenge/Problem'].toLowerCase().includes(searchTerm)) ||
            (sub['The Prompt'] && sub['The Prompt'].toLowerCase().includes(searchTerm));
        
        const matchesCategory = !category || sub.Category === category;
        const matchesDepartment = !department || sub.Department === department;
        
        return matchesSearch && matchesCategory && matchesDepartment;
    });
    
    displaySubmissions(filtered);
}

if (searchInput) searchInput.addEventListener('input', filterSubmissions);
if (categoryFilter) categoryFilter.addEventListener('change', filterSubmissions);
if (departmentFilter) departmentFilter.addEventListener('change', filterSubmissions);
```

## Step 3: Test It

1. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Add submissions display functionality"
   git push
   ```

2. **Wait 1-2 minutes** for GitHub Pages to update

3. **Visit your site** and check the "Browse All Prompts" section

4. **Test with a submission** - submit a test entry via the form and see if it appears

## Troubleshooting

### Submissions not loading?
- Check browser console (F12) for errors
- Verify the Web App URL is correct
- Make sure the Apps Script is deployed and accessible
- Check that the Sheet ID matches

### CORS errors?
- Make sure Apps Script is deployed with "Anyone" access
- Check that the script is published as a web app (not just saved)

### Data not appearing?
- Verify the Sheet tab name matches in the script
- Check that submissions exist in the sheet
- Look at the JSON response in browser Network tab

## Next Steps

Once it's working, you can:
- ✅ Add pagination for many submissions
- ✅ Add "Featured" badges for curated prompts
- ✅ Add sorting options
- ✅ Add export functionality
- ✅ Add analytics tracking

## Alternative: Simpler Approach

If you want something simpler, you can:
1. Manually select best submissions monthly
2. Add them as case studies (like current examples)
3. Keep the sheet link for full access

This requires no technical setup but more manual work.

---

**Questions?** The code is ready to go - just follow the steps above!

