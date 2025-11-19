# Google Form Setup Guide

This guide provides detailed instructions for setting up the Google Form that will collect prompt submissions from faculty.

## Form Structure

### Form Title
**"SAIL Prompt Submission"**

### Form Description
Add this at the top of the form:

```
Share your AI prompts with the SAIL community! Include the context, challenge, 
and outcome so others can learn from your experience. Your submission will be 
reviewed and added to our shared library.

Questions? Contact [your email]
```

## Required Fields

### 1. Your Name
- **Type**: Short answer
- **Required**: Yes
- **Placeholder**: "John Smith"

### 2. Email Address
- **Type**: Short answer
- **Required**: Yes
- **Validation**: Email format
- **Placeholder**: "john.smith@suffolk.edu"

### 3. Department
- **Type**: Dropdown (recommended) or Short answer
- **Required**: Yes
- **Options** (if dropdown):
  - Accounting
  - Finance
  - Management
  - Marketing
  - Analytics/Information Systems
  - Strategy & International Business
  - Public Administration
  - Healthcare Administration
  - Other (with follow-up field)

### 4. Course Name/Number
- **Type**: Short answer
- **Required**: Yes
- **Description**: "e.g., MGT 320 - Business Ethics"
- **Placeholder**: "MGT 320"

### 5. Challenge/Problem
- **Type**: Paragraph
- **Required**: Yes
- **Description**: 
  ```
  What specific challenge or problem were you trying to solve? 
  What was the context? (e.g., "Students were struggling with X", 
  "I needed to Y", "The course had Z issue")
  ```
- **Character limit**: None (but encourage 100-500 words)

### 6. Your Approach
- **Type**: Paragraph
- **Required**: Yes
- **Description**:
  ```
  How did you approach solving this challenge? What was your thinking 
  process? What alternatives did you consider?
  ```
- **Character limit**: None (but encourage 100-500 words)

### 7. The Prompt
- **Type**: Paragraph
- **Required**: Yes
- **Description**:
  ```
  Share your actual prompt (or a template version if you prefer). 
  Include any important instructions, context, or system prompts you 
  provided to the AI. You can use placeholders like [COURSE_NAME] or 
  [STUDENT_WORK] if you want to share a template.
  ```
- **Character limit**: None

### 8. Outcome/Results
- **Type**: Paragraph
- **Required**: Yes
- **Description**:
  ```
  What were the results? What worked well? What would you do differently? 
  Any unexpected benefits or challenges?
  ```
- **Character limit**: None (but encourage 100-500 words)

### 9. Category
- **Type**: Multiple choice
- **Required**: Yes
- **Options**:
  - Learning Activities
  - Assessment
  - Course Design
  - Student Support
  - Research
  - Administrative Tasks
  - Other

### 10. Additional Notes (Optional)
- **Type**: Paragraph
- **Required**: No
- **Description**: 
  ```
  Any additional context, tips, resources, or links you'd like to share? 
  This could include links to course materials, related prompts, or 
  follow-up ideas.
  ```

## Form Settings

### General Settings
1. **Collect email addresses**: Yes (for follow-up if needed)
2. **Limit to 1 response**: No (faculty may submit multiple prompts)
3. **Show progress bar**: Yes (helpful for longer forms)
4. **Shuffle question order**: No

### Presentation
1. **Confirmation message**: 
   ```
   Thank you for sharing your prompt with the SAIL community! 
   Your submission will be reviewed and added to our library. 
   We'll notify you once it's published.
   ```
2. **Show link to submit another response**: Yes

### Responses
1. **Accepting responses**: Yes
2. **Collect email addresses**: Yes
3. **Send respondents a copy of their response**: Optional (recommended: Yes)
4. **Get email notifications for new responses**: Yes (to your email)

## Google Sheet Setup

### Initial Setup
1. The form automatically creates a Google Sheet when you start collecting responses
2. Go to **Responses** tab → Click the Sheets icon (green)
3. This creates a linked spreadsheet

### Sheet Organization

#### Main Tab: "All Submissions"
- This is automatically created
- Contains all form responses
- Format headers (bold, colored background)
- Freeze header row
- Add alternating row colors for readability

#### Optional Tabs (Create filtered views)
1. **By Department**: Create a filter view for each department
2. **By Category**: Create a filter view for each category
3. **Featured**: Manually add rows you want to feature on the website

### Formatting Recommendations
- **Header row**: Bold, background color (e.g., Suffolk blue)
- **Column widths**: Auto-fit or set appropriate widths
- **Text wrapping**: Enable for long text columns
- **Alternating colors**: Use conditional formatting for readability

### Sharing Settings
1. **For your team (editors)**:
   - Share with specific people who will review submissions
   - Give "Editor" access

2. **For faculty (viewers)**:
   - Click **Share** → **Get link**
   - Set to "Anyone with the link can view"
   - Copy this URL to use in your website

### Column Headers (Auto-generated)
The form will create columns like:
- Timestamp
- Your Name
- Email Address
- Department
- Course Name/Number
- Challenge/Problem
- Your Approach
- The Prompt
- Outcome/Results
- Category
- Additional Notes

## Testing the Form

Before sharing:
1. Fill out the form yourself with a test submission
2. Verify all fields work correctly
3. Check that responses appear in the Google Sheet
4. Test the email notification
5. Verify the confirmation message displays correctly

## Sharing the Form

### Get the Form URL
1. Click **Send** button in Google Forms
2. Click the link icon (🔗)
3. Copy the URL
4. Use this URL in your website's "Submit Your Prompt" button

### Embedding (Optional)
You can also embed the form directly in your website if preferred:
1. Click **Send** → **<> (Embed HTML)**
2. Copy the embed code
3. Add to your HTML where you want the form to appear

## Workflow After Setup

1. **Share the form** with faculty via:
   - Canvas announcement
   - SAIL Friday sessions
   - Email to faculty list
   - Link on the GitHub Pages site

2. **Monitor submissions**:
   - Check email notifications
   - Review Google Sheet weekly
   - Respond to any questions

3. **Curate content**:
   - Review submissions for quality and completeness
   - Select standout examples for the website
   - Follow up with submitters if clarification is needed

## Tips

- **Keep it simple**: Don't add too many fields - faculty are busy
- **Make it clear**: Use descriptions to guide what you're looking for
- **Test first**: Always test the form yourself before sharing
- **Set expectations**: Let faculty know how long review takes
- **Follow up**: Thank submitters and let them know when their prompt is published

## Troubleshooting

**Form not collecting responses?**
- Check that "Accepting responses" is enabled in Settings

**Responses not appearing in Sheet?**
- Verify the Sheet is linked (Responses tab → Sheets icon)
- Check Sheet permissions

**Email notifications not working?**
- Verify your email in form settings
- Check spam folder
- Ensure "Get email notifications" is enabled

---

**Need help?** Contact the SAIL team or refer to [Google Forms Help](https://support.google.com/docs/topic/9054603)

