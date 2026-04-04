document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
       Simple Syntax Highlighting
       ========================== */
    const codeBlock = document.querySelector('code.language-python');
    if (codeBlock) {
        let code = codeBlock.innerHTML;
        // Simple regex replacements for visual appeal
        code = code.replace(/(def|if|elif|else|for|in|return|while|break|True|False|print|input)(?=\W)/g, '<span class="keyword">$1</span>');
        code = code.replace(/("[^"]*")/g, '<span class="string">$1</span>');
        code = code.replace(/(\'.*?\')/g, '<span class="string">$1</span>');
        code = code.replace(/(#.*)/g, '<span class="comment">$1</span>');
        code = code.replace(/([a-zA-Z_]\w*)(?=\()/g, '<span class="function">$1</span>');
        codeBlock.innerHTML = code;
    }

    /* ==========================
       Copy Code Functionality
       ========================== */
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const rawCode = document.querySelector('code').innerText;
            navigator.clipboard.writeText(rawCode).then(() => {
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
                }, 2000);
            });
        });
    }

    /* ==========================
       Chatbot Logic Simulation
       ========================== */
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearChat');

    // Rule-Based Knowledge Base (Dictionary)
    const rules = {
        "admission": "Admission is open for 2026. Process: Online Registration -> Entrance Test -> Merit List. Visit the admission portal for details.",
        "course": "We offer B.Tech, M.Tech, BCA, MCA, BBA, and MBA. For a detailed syllabus, please check the academics tab.",
        "fee": "Fees vary by course: B.Tech is ₹1,00,000/yr, BCA is ₹60,000/yr. You can pay in 2 installments.",
        "hostel": "Yes, we have separate AC/Non-AC hostels for boys and girls. The fee is ₹80,000 per year including mess food.",
        "time": "College timings are Monday to Saturday, 9:00 AM to 4:30 PM.",
        "timing": "College timings are Monday to Saturday, 9:00 AM to 4:30 PM.",
        "locat": "We are centrally located in University City, 5 mins walking distance from the main metro station.",
        "document": "You generally need: 10th & 12th Marksheets, Transfer Certificate, ID Proof (Aadhar), and 4 Passport size photos.",
        "scholarship": "Yes! Merit-based scholarships up to 50% tuition waiver are available for students scoring above 90% in 12th grade.",
        "contact": "You can contact the admission cell at info@edu.college.edu or call the toll-free number 1800-123-4567.",
        "hi": "Hello! How can I assist you with college enquiries today?",
        "hello": "Hi there! Feel free to ask me anything about admissions, courses, fees, or campus facilities."
    };

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processInput(forcedText = null) {
        // If triggered by button click, the first argument is a MouseEvent object
        const text = (typeof forcedText === 'string') ? forcedText : userInput.value.trim();
        if (text === "") return;

        // Add user message
        appendMessage(text, 'user');
        if (typeof forcedText !== 'string') {
            userInput.value = '';
        }

        // Simulate typing delay
        setTimeout(() => {
            getBotResponse(text.toLowerCase());
        }, 500);
    }

    function getBotResponse(inputStr) {
        let responseFound = false;
        
        // Iterate through rules pattern matching
        for (const [keyword, response] of Object.entries(rules)) {
            if (inputStr.includes(keyword)) {
                appendMessage(response, 'bot');
                responseFound = true;
                break; // Stop after finding first match, standard for simple rule-based
            }
        }

        if (!responseFound) {
            appendMessage("I'm sorry, I don't have information on that. Please ask about admission, courses, fees, hostels, timing, or contact details.", 'bot');
        }
    }

    // Event Listeners for Chat
    sendBtn.addEventListener('click', processInput);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processInput();
        }
    });

    clearBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message bot-message">
                Chat cleared. Hi there! I am the College Enquiry Chatbot. How can I help you today?
            </div>
        `;
    });

    // Make dataset questions clickable
    const datasetItems = document.querySelectorAll('.dataset-list li');
    datasetItems.forEach(li => {
        li.addEventListener('click', () => {
            // Strip any icon text if present, or just use innerText which excludes the icon HTML but keeps the text
            const questionText = li.innerText.trim();
            processInput(questionText);
        });
    });
});
