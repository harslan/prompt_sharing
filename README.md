# SAIL Prompt Library

A GitHub Pages website for Suffolk University's SAIL (Student AI Literacy) Fridays program, featuring a curated collection of AI prompts with context, challenges, and solutions from faculty.

## Overview

This project implements **Option 3** from the planning discussion:
- **GitHub Pages site**: Curated examples and case studies with full context
- **Google Sheet**: Living repository of all faculty submissions (browsable, searchable)
- **Google Form**: Simple submission interface for faculty

This approach provides both quality (curated examples) and accessibility (complete library), while keeping maintenance manageable.

## Features

- 🎯 **Context-Rich Examples**: Case studies showing problem → process → solution
- 📚 **Complete Library**: Link to Google Sheet with all submissions
- ✍️ **Easy Submission**: Google Form for faculty contributions
- 🎨 **Modern Design**: Clean, professional interface
- 📱 **Responsive**: Works on all devices
- ⚡ **Fast**: Static site, no backend required

## Quick Start

### 1. Set Up GitHub Pages

1. **Push this repository to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SAIL Prompt Library"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/prompt_sharing.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch and **/ (root)** folder
   - Click **Save**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/prompt_sharing/`

### 2. Set Up Google Form & Sheet

#### Create the Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form titled: **"SAIL Prompt Submission"**
3. Add the following fields (in order):

   **Field 1: Your Name**
   - Type: Short answer
   - Required: Yes

   **Field 2: Email**
   - Type: Short answer
   - Required: Yes
   - Validation: Email format

   **Field 3: Department**
   - Type: Dropdown or Short answer
   - Required: Yes
   - Options: Accounting, Finance, Management, Marketing, Analytics, etc.

   **Field 4: Course Name/Number**
   - Type: Short answer
   - Required: Yes
   - Example: "MGT 320 - Business Ethics"

   **Field 5: Challenge/Problem**
   - Type: Paragraph
   - Required: Yes
   - Description: "What specific challenge or problem were you trying to solve? What was the context?"

   **Field 6: Your Approach**
   - Type: Paragraph
   - Required: Yes
   - Description: "How did you approach solving this challenge? What was your thinking process?"

   **Field 7: The Prompt**
   - Type: Paragraph
   - Required: Yes
   - Description: "Share your actual prompt (or a template version if you prefer). Include any important instructions or context you provided to the AI."

   **Field 8: Outcome/Results**
   - Type: Paragraph
   - Required: Yes
   - Description: "What were the results? What worked well? What would you do differently?"

   **Field 9: Category**
   - Type: Multiple choice
   - Required: Yes
   - Options:
     - Learning Activities
     - Assessment
     - Course Design
     - Student Support
     - Research
     - Other

   **Field 10: Additional Notes (Optional)**
   - Type: Paragraph
   - Required: No
   - Description: "Any additional context, tips, or resources you'd like to share?"

4. **Customize the form**:
   - Add a description at the top explaining the purpose
   - Set up a confirmation message thanking submitters
   - Enable email notifications for yourself (Settings → Responses → Get email notifications)

#### Create the Google Sheet

1. The form automatically creates a Google Sheet when you start collecting responses
2. Go to **Responses** tab in your form → Click the Sheets icon
3. This creates a linked spreadsheet
4. **Set up the sheet**:
   - Rename it: "SAIL Prompt Library"
   - Add a header row if needed
   - Consider adding tabs:
     - "All Submissions" (main tab)
     - "By Department" (filtered views)
     - "By Category" (filtered views)
   - Format the sheet for readability (bold headers, alternating row colors)
   - Set sharing permissions:
     - Share with your team (editors)
     - Share with faculty (viewers) - get a shareable link

### 3. Update Links in the Website

1. **Get your Google Sheet URL**:
   - Open your Google Sheet
   - Click **Share** → **Get link**
   - Set to "Anyone with the link can view"
   - Copy the URL

2. **Get your Google Form URL**:
   - Open your Google Form
   - Click **Send** → Copy the link
   - Or use the form's public URL

3. **Update `index.html`**:
   - Find the line with `id="sheet-link"` (around line 200)
   - Replace `href="#"` with your Google Sheet URL
   - Find the line with `id="form-link"` (around line 230)
   - Replace `href="#"` with your Google Form URL

### 4. Seed with Initial Content

1. Review the case studies in `index.html`
2. Customize them with real examples from your Canvas module or SAIL Friday sessions
3. Add 2-3 more case studies if you have them
4. Commit and push updates

## File Structure

```
prompt_sharing/
├── index.html          # Main landing page
├── styles.css          # Styling
├── script.js           # JavaScript for interactivity
└── README.md          # This file
```

## Customization

### Adding More Case Studies

Edit `index.html` and add new case studies in the `#examples` section. Follow this structure:

```html
<article class="case-study">
    <div class="case-study-header">
        <span class="category">Category Name</span>
        <h3>Your Case Study Title</h3>
    </div>
    <div class="case-study-content">
        <div class="case-section">
            <h4>📋 The Challenge</h4>
            <p>Your challenge description...</p>
        </div>
        <div class="case-section">
            <h4>💡 The Approach</h4>
            <p>Your approach description...</p>
        </div>
        <div class="case-section">
            <h4>🤖 The Prompt</h4>
            <div class="prompt-box">
                <pre>Your prompt here...</pre>
            </div>
        </div>
        <div class="case-section">
            <h4>✅ The Outcome</h4>
            <p>Your outcome description...</p>
        </div>
    </div>
</article>
```

### Changing Colors

Edit `styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #1a4d7a;    /* Main brand color */
    --secondary-color: #2c7fb8;  /* Secondary color */
    --accent-color: #f39c12;     /* Accent/highlight color */
}
```

### Adding More Sections

You can add new sections to `index.html` following the existing pattern. Make sure to:
1. Add a navigation link in the `<nav>` section
2. Create a new `<section>` with a unique `id`
3. Style it consistently with existing sections

## Maintenance Workflow

### Weekly (15-30 minutes)
1. Review new submissions in Google Sheet
2. Check for any issues or questions
3. Consider featuring standout examples

### Monthly (30-60 minutes)
1. Select 1-2 best submissions from the sheet
2. Create case study pages for featured prompts
3. Update the main site with new examples
4. Share highlights in SAIL Friday announcements

### Ongoing
- Monitor form submissions
- Respond to questions or feedback
- Update case studies as you learn what works best

## Integration with Canvas

Link to this site from your Canvas module:
1. Add a page or external link in Canvas
2. Point to your GitHub Pages URL
3. Include instructions for faculty on how to use both the site and the form

## Future Enhancements (Optional)

If you want to level up later:

- **Automation**: Use Google Apps Script to auto-format submissions
- **Search**: Add client-side search functionality
- **Categories**: Create separate pages for different prompt categories
- **Analytics**: Add Google Analytics to track usage
- **RSS Feed**: Generate an RSS feed for new submissions
- **Export**: Add ability to export prompts to NotebookLM format

## Support

For questions or issues:
- Email: harslan@suffolk.edu
- Canvas: [SBS Team Resources](https://canvas.suffolk.edu/courses/15628)

## License

Internal use for Suffolk University faculty and staff.

---

**Built with ❤️ for SAIL Fridays**

