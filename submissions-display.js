// JavaScript to fetch and display submissions from Google Apps Script
// NOTE: Replace SCRIPT_URL below with your Google Apps Script Web App URL after setup

document.addEventListener('DOMContentLoaded', function() {
    // Google Apps Script Web App URL
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCbanolthQx1deSlnuL4_yhK4OEhRIC9oRbHEhJGaE9xXhuGOMg4ITuwXggc9NR54JJQ/exec';
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1t30ZpqmfuEqtwtVwPln4b8jF1ng7Oo6rEZlkZlqjs-E/view?usp=sharing';
    
    const submissionsContainer = document.getElementById('submissions-container');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const departmentFilter = document.getElementById('department-filter');
    
    if (!submissionsContainer) return;
    
    let allSubmissions = [];
    
    // Show loading state
    submissionsContainer.innerHTML = '<div class="loading">Loading submissions...</div>';
    
    // Check if script URL is configured
    if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        submissionsContainer.innerHTML = `
            <div class="no-results">
                <strong>Submissions display not yet configured</strong>
                <p>To display submissions on this website, you need to set up Google Apps Script.</p>
                <p style="margin-top: 1rem;">
                    <a href="${SHEET_URL}" target="_blank" class="btn btn-primary">View Submissions in Google Sheet</a>
                </p>
                <p style="margin-top: 1rem; font-size: 0.9rem;">
                    See <code>IMPLEMENT_SUBMISSIONS_DISPLAY.md</code> for setup instructions.
                </p>
            </div>
        `;
        return;
    }
    
    // Fetch submissions
    // Note: Google Apps Script may redirect, so we need to handle that
    fetch(SCRIPT_URL, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => {
            // Check if response is actually JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            }
            // If redirected or HTML, try to parse as JSON anyway
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    throw new Error('Invalid JSON response from server');
                }
            });
        })
        .then(data => {
            if (data.success && data.submissions && data.submissions.length > 0) {
                allSubmissions = data.submissions;
                displaySubmissions(allSubmissions);
                setupFilters();
            } else {
                // Show sample submissions for demonstration
                allSubmissions = getSampleSubmissions();
                displaySubmissions(allSubmissions);
                setupFilters();
                
                // Add note that these are samples
                const note = document.createElement('div');
                note.className = 'sample-note';
                note.style.cssText = 'text-align: center; padding: 1rem; margin: 2rem 0; background: #e8f4f8; border-radius: 8px; border-left: 4px solid var(--primary-color);';
                note.innerHTML = `
                    <strong>📝 Sample Submissions</strong>
                    <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">
                        These are example submissions to demonstrate the display. 
                        Real submissions from faculty will appear here automatically.
                    </p>
                `;
                submissionsContainer.insertBefore(note, submissionsContainer.firstChild);
            }
        })
        .catch(error => {
            console.error('Error fetching submissions:', error);
            submissionsContainer.innerHTML = `
                <div class="no-results">
                    <strong>Unable to load submissions</strong>
                    <p>There was an error loading submissions from the server.</p>
                    <p style="margin-top: 1rem;">
                        <a href="${SHEET_URL}" target="_blank" class="btn btn-secondary">View in Google Sheet</a>
                    </p>
                    <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-light);">
                        Error: ${error.message}
                    </p>
                </div>
            `;
        });
    
    function setupFilters() {
        if (searchInput) {
            searchInput.addEventListener('input', filterSubmissions);
        }
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterSubmissions);
        }
        if (departmentFilter) {
            departmentFilter.addEventListener('change', filterSubmissions);
        }
    }
    
    function filterSubmissions() {
        const searchTerm = (searchInput?.value || '').toLowerCase();
        const category = categoryFilter?.value || '';
        const department = departmentFilter?.value || '';
        
        const filtered = allSubmissions.filter(sub => {
            // Search filter
            const matchesSearch = !searchTerm || 
                (sub['Course Name/Number'] && sub['Course Name/Number'].toLowerCase().includes(searchTerm)) ||
                (sub['Your Name'] && sub['Your Name'].toLowerCase().includes(searchTerm)) ||
                (sub['Challenge/Problem'] && sub['Challenge/Problem'].toLowerCase().includes(searchTerm)) ||
                (sub['Your Approach'] && sub['Your Approach'].toLowerCase().includes(searchTerm)) ||
                (sub['The Prompt'] && sub['The Prompt'].toLowerCase().includes(searchTerm)) ||
                (sub['Outcome/Results'] && sub['Outcome/Results'].toLowerCase().includes(searchTerm));
            
            // Category filter
            const matchesCategory = !category || (sub.Category && sub.Category === category);
            
            // Department filter
            const matchesDepartment = !department || (sub.Department && sub.Department === department);
            
            return matchesSearch && matchesCategory && matchesDepartment;
        });
        
        displaySubmissions(filtered);
    }
    
    function displaySubmissions(submissions) {
        if (submissions.length === 0) {
            submissionsContainer.innerHTML = `
                <div class="no-results">
                    <strong>No submissions match your filters</strong>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }
        
        const html = submissions.map((sub) => {
            // Escape HTML to prevent XSS
            const escapeHtml = (text) => {
                if (!text) return '';
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            };
            
            const category = escapeHtml(sub.Category || 'Uncategorized');
            const course = escapeHtml(sub['Course Name/Number'] || 'Untitled');
            const name = escapeHtml(sub['Your Name'] || 'Anonymous');
            const department = escapeHtml(sub.Department || 'Unknown Department');
            const challenge = escapeHtml(sub['Challenge/Problem'] || 'No challenge described.');
            const approach = escapeHtml(sub['Your Approach'] || 'No approach described.');
            const prompt = escapeHtml(sub['The Prompt'] || 'No prompt provided.');
            const outcome = escapeHtml(sub['Outcome/Results'] || 'No outcome described.');
            const notes = sub['Additional Notes (Optional)'] ? escapeHtml(sub['Additional Notes (Optional)']) : '';
            const date = formatDate(sub.Timestamp);
            
            return `
                <article class="submission-card">
                    <div class="submission-header">
                        <span class="submission-category">${category}</span>
                        <h3>${course}</h3>
                        <p class="submission-meta">
                            <strong>${name}</strong> • ${department}
                        </p>
                    </div>
                    <div class="submission-content">
                        <div class="submission-section">
                            <h4>📋 Challenge</h4>
                            <p>${challenge}</p>
                        </div>
                        <div class="submission-section">
                            <h4>💡 Approach</h4>
                            <p>${approach}</p>
                        </div>
                        <div class="submission-section">
                            <h4>🤖 Prompt</h4>
                            <div class="prompt-display">
                                <pre>${prompt}</pre>
                            </div>
                        </div>
                        <div class="submission-section">
                            <h4>✅ Outcome</h4>
                            <p>${outcome}</p>
                        </div>
                        ${notes ? `
                            <div class="submission-section">
                                <h4>📝 Additional Notes</h4>
                                <p>${notes}</p>
                            </div>
                        ` : ''}
                    </div>
                    <div class="submission-footer">
                        <span class="submission-date">${date}</span>
                    </div>
                </article>
            `;
        }).join('');
        
        submissionsContainer.innerHTML = html;
    }
    
    function formatDate(dateString) {
        if (!dateString) return 'Date not available';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return dateString; // Return original if invalid
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch (e) {
            return dateString;
        }
    }
    
    function getSampleSubmissions() {
        return [
            {
                'Timestamp': new Date().toISOString(),
                'Email Address': 'faculty1@suffolk.edu',
                'Your Name': 'Dr. Sarah Johnson',
                'Department': 'Management',
                'Course Name/Number': 'MGT 320 - Business Ethics',
                'Challenge/Problem': 'Students in my business ethics course were struggling to engage with multiple perspectives on complex ethical dilemmas. Traditional discussion formats weren\'t generating the depth of analysis needed, and students often defaulted to surface-level responses.',
                'Your Approach': 'I created an AI "student" persona that takes a specific position on ethical issues. Students must engage with this AI character, challenge its reasoning, and defend alternative viewpoints. This forces them to think more critically and articulate their positions more clearly.',
                'The Prompt': 'You are a business student in an ethics course who strongly believes that [SPECIFIC POSITION]. When presented with ethical dilemmas, you always argue from this perspective. Your responses should:\n- Be well-reasoned but somewhat narrow in scope\n- Challenge students to think beyond your position\n- Ask probing questions that reveal assumptions\n- Occasionally concede points when students make compelling arguments\n\nEngage with the following scenario: [SCENARIO]',
                'Outcome/Results': 'Students reported much deeper engagement with ethical reasoning. The AI\'s consistent perspective forced them to articulate their own positions more clearly. Class discussions became more structured and substantive. I noticed students were better prepared for exams and could apply ethical frameworks more effectively.',
                'Category': 'Learning Activities',
                'Additional Notes (Optional)': 'I use this in both synchronous and asynchronous formats. For online courses, students can engage with the AI between class sessions, which extends learning beyond the classroom.'
            },
            {
                'Timestamp': new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
                'Email Address': 'faculty2@suffolk.edu',
                'Your Name': 'Prof. Michael Chen',
                'Department': 'ISOM',
                'Course Name/Number': 'ISOM 330 - Data Analytics',
                'Challenge/Problem': 'Providing detailed, rubric-aligned feedback on student assignments was extremely time-consuming. With 40+ students per section, I was spending 8-10 hours per assignment just on feedback. I needed a way to generate initial feedback that I could review and personalize.',
                'Your Approach': 'I developed a prompt that uses the course rubric as the evaluation framework. The AI generates structured feedback that I can then review, edit, and personalize before sending to students. This maintains quality while dramatically reducing time spent.',
                'The Prompt': 'You are an expert teaching assistant helping to provide feedback on student work. Use the following rubric to evaluate this assignment:\n\n[RUBRIC CRITERIA]\n\nFor each criterion, provide:\n1. A specific strength observed\n2. A specific area for improvement\n3. A concrete suggestion for enhancement\n\nStudent submission:\n[STUDENT WORK]\n\nFormat your feedback as a constructive, encouraging review that helps the student understand both what they did well and how to improve.',
                'Outcome/Results': 'I saved 40-60% of time on initial feedback generation while maintaining quality. The rubric-based approach ensured consistency across all student evaluations. Students appreciated the detailed, structured feedback. I now have more time to focus on higher-level course improvements and one-on-one student support.',
                'Category': 'Assessment',
                'Additional Notes (Optional)': 'I still review every piece of feedback before sending it. The AI helps with the initial draft, but I add personal touches and address specific student needs. This hybrid approach works really well.'
            }
        ];
    }
});

