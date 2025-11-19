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
                submissionsContainer.innerHTML = `
                    <div class="no-results">
                        <strong>No submissions yet</strong>
                        <p>Be the first to share your prompt with the community!</p>
                        <p style="margin-top: 1rem;">
                            <a href="#submit" class="btn btn-primary">Submit Your Prompt</a>
                        </p>
                    </div>
                `;
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
});

