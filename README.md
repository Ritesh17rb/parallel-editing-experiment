# Parallel Edit - Collaborative Intelligence for Complex Documents
 
**Parallel Edit** is a cutting-edge experiment in human-AI collaboration that goes beyond simple chatbots. It demonstrates a "hive mind" approach where multiple specialized AI agents work simultaneously on different sections of a large document (like contracts, research papers, or proposals) alongside a human editor. Built on **Yjs** for conflict-free real-time collaboration, it ensures that AI and human edits never collide, creating a seamless flow of enhanced productivity.

## 🌟 Key Features

### 1. **Demo Scenarios with Long Documents**
- **Legal Contract Review**: 6-page Master Services Agreement
- **Academic Research Paper**: 5-page scientific manuscript on climate change
- **Business Proposal**: 6-page comprehensive healthcare IT proposal

Each scenario includes realistic, detailed content equivalent to 3-6 pages in a Word document.

### 2. **Multi-Agent Parallelism with Dynamic Naming**
One high-level prompt spawns multiple specialized AI agents that work simultaneously. **Agent names are now dynamically generated based on their specific tasks**, making it easy to understand what each agent is doing at a glance.

**How Dynamic Naming Works:**
- When you give a task, the system analyzes the task description
- Uses LLM (if API key available) or keyword matching to generate a descriptive name
- Names are concise (2-3 words) and professional
- Examples:
  - Task: "Verify all party names and addresses" → **"Parties Verifier"**
  - Task: "Review limitation of liability clauses" → **"Liability Checker"**
  - Task: "Analyze financial projections" → **"Financial Auditor"**
  - Task: "Improve abstract clarity" → **"Abstract Enhancer"**

**Legal Contract Example:**
- **Parties Verifier**: Checks party names, addresses, and legal entities
- **Liability Checker**: Reviews limitation clauses and indemnification
- **IP Rights Analyst**: Analyzes intellectual property provisions

**Research Paper Example:**
- **Abstract Enhancer**: Improves abstract clarity and accuracy
- **Methods Reviewer**: Enhances technical descriptions
- **Results Analyzer**: Verifies data presentation
- **Citation Checker**: Validates references

**Business Proposal Example:**
- **Value Proposition Expert**: Enhances executive summary
- **Financial Auditor**: Verifies calculations and projections
- **Technical Writer**: Improves solution descriptions

### 3. **Concurrent Editing (Non-Blocking)**
- Human users can continue editing while AI agents work
- AI agents pause when detecting user typing activity
- Spatial separation: agents work on different document sections
- Real-time cursor visualization for all agents

### 4. **Visual Clarity**
- **Agent Activity Panel**: Shows exactly what each agent is doing
- **Color-coded cursors**: Each agent has a unique color
- **Status indicators**: Real-time updates on agent progress
- **Section highlighting**: Visual indication of where agents are working

### 5. **Real-Time Collaboration**
- Built on Yjs CRDT for conflict-free collaborative editing
- WebRTC-based peer-to-peer synchronization
- Multiple users can collaborate simultaneously
- Shareable session links

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Optional: OpenAI API key for real AI-powered editing

### Installation

1. **Clone or download this repository**

2. **Serve the files using a local web server**

   Using Python:
   ```bash
   python -m http.server 8000
   ```

   Using Node.js:
   ```bash
   npx serve
   ```

   Using VS Code Live Server extension:
   - Right-click on `index.html` → "Open with Live Server"

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Configuration

#### Setting up AI (Optional)

1. Click the **gear icon** (⚙️) in the top right
2. Enter your OpenAI API key
3. Optionally modify the base URL for custom endpoints
4. Click **Save**

**Note**: Without an API key, the system will simulate AI typing for demonstration purposes.

## 📖 How to Use

### Step 1: Load a Demo Scenario

1. Click one of the three **demo scenario cards** at the top:
   - 🗎 Legal Contract Review
   - 📄 Academic Research Paper
   - 💼 Business Proposal

2. The document will load into the editor

### Step 2: Try Sample Prompts

Each scenario includes sample prompts that demonstrate multi-agent capabilities:

1. Look for the **"Sample Prompts"** section in the AI Co-Pilot panel
2. Click any sample prompt to automatically trigger multi-agent editing
3. Watch the **Agent Activity** panel to see agents working in parallel

### Step 3: Observe Parallel Editing

When agents are activated:

1. **Agent Activity Panel** shows:
   - Agent name and color
   - Current status (Analyzing, Writing, etc.)
   - Section being edited
   - Specific task

2. **Document Editor** displays:
   - Color-coded cursors for each agent
   - Agent names above cursors
   - Real-time text insertion

3. **You can continue editing** while agents work!
   - Type anywhere in the document
   - Agents will pause if you're typing nearby
   - Your edits and AI edits merge seamlessly

### Step 4: Custom Prompts

You can also enter custom prompts:

1. Type your instruction in the AI Co-Pilot text area
2. Click **"Draft / Edit"**
3. If a demo scenario is loaded, multiple agents will spawn
4. Otherwise, a single AI agent will assist

## 🏗️ Architecture

### Technology Stack

- **Yjs**: CRDT-based collaborative editing
- **Quill**: Rich text editor
- **WebRTC**: Peer-to-peer synchronization
- **Bootstrap 5**: UI framework
- **Vanilla JavaScript**: ES6 modules

### Key Components

#### 1. **Demo Documents** (`demo-documents.js`)
- Contains three comprehensive scenarios
- Each with 3-6 pages of realistic content
- Agent configurations for each scenario
- Sample prompts with descriptions

#### 2. **Multi-Agent System** (`script.js`)
- **Agent Spawning**: Creates multiple agents from one prompt
- **Section Detection**: Intelligently finds document sections
- **Parallel Execution**: Runs agents concurrently using Promise.all()
- **Cursor Management**: Tracks and displays each agent's position
- **Conflict Avoidance**: Pauses when user is typing

#### 3. **UI Components** (`index.html`)
- Demo scenario cards
- Agent activity visualization
- Real-time status updates
- Sample prompt interface

### Data Flow

```
User clicks sample prompt
    ↓
System identifies current scenario
    ↓
Spawns configured agents (3-4 agents)
    ↓
Each agent:
  1. Finds its assigned section
  2. Analyzes content
  3. Calls LLM with specialized prompt
  4. Streams improvements back
  5. Updates cursor position
    ↓
All agents work in parallel
    ↓
User can edit simultaneously
    ↓
Yjs merges all changes conflict-free
```

## 🎯 Use Cases

### 1. **Legal Document Review**
- Multiple lawyers reviewing different contract sections
- Automated compliance checking across clauses
- Parallel fact-checking of parties and terms

### 2. **Academic Writing**
- Co-authors working on different paper sections
- Automated citation verification
- Simultaneous methodology and results refinement

### 3. **Business Proposals**
- Team members enhancing different proposal sections
- Financial verification while improving narrative
- Parallel technical and executive summary updates

### 4. **Content Creation**
- Multiple editors working on long-form content
- Automated fact-checking and style improvements
- Concurrent SEO optimization and readability enhancement

## 🔧 Advanced Features

### Intelligent Section Detection

The system automatically identifies document sections using:
- Heading detection (numbered sections, all-caps titles)
- Keyword matching for agent-specific sections
- Fallback to proportional document division

### User Activity Detection

Prevents AI interference with user editing:
- Tracks text-change events from user
- Sets `userIsTyping` flag with 1-second timeout
- Agents pause chunk insertion when flag is active
- Resumes automatically when user stops

### Cursor Synchronization

Uses Yjs relative positioning for robust cursor tracking:
- Encodes cursor positions relative to document structure
- Survives concurrent edits from multiple sources
- Automatically updates when document changes
- Displays with unique colors and agent names

### Performance Optimization

- Staggered agent start times (500-1500ms random delay)
- Character-by-character streaming with 30ms delay
- Efficient section caching
- Minimal DOM manipulation

## 🐛 Troubleshooting

### Agents Not Appearing

1. **Check API Key**: Ensure you've entered a valid OpenAI API key in settings
2. **Load Scenario**: Make sure you've clicked a demo scenario card first
3. **Console Errors**: Open browser DevTools (F12) and check for errors

### Cursor Not Showing

1. **Refresh Page**: Sometimes cursor module needs reinitialization
2. **Check Scenario**: Ensure a demo scenario is loaded
3. **Browser Compatibility**: Try a different browser

### Slow Performance

1. **Reduce Agents**: Edit `demo-documents.js` to use fewer agents
2. **Increase Delays**: Modify typing speed in `callLLM` function
3. **Disable Simulation**: Set up real API key instead of simulation

### Collaboration Issues

1. **Check Network**: Ensure WebRTC can connect (not blocked by firewall)
2. **Share Correct URL**: Include the `?room=` parameter when sharing
3. **Refresh Both Clients**: Sometimes helps re-establish connection

## 📝 Customization

### Adding New Scenarios

Edit `demo-documents.js`:

```javascript
export const demoScenarios = {
  "my-scenario": {
    title: "My Custom Scenario",
    icon: "bi-file-text",
    description: "Description here",
    document: `<h1>Your long document content...</h1>`,
    samplePrompts: [
      {
        text: "Sample prompt text",
        description: "What this prompt does"
      }
    ]
  }
};

export const agentConfigurations = {
  "my-scenario": [
    {
      id: "agent-custom",
      name: "Custom Agent",
      color: "#FF5733",
      section: "SECTION_KEYWORD",
      task: "What this agent should do"
    }
  ]
};
```

### Modifying Agent Behavior

In `script.js`, edit the `runSingleAgent` function:

```javascript
const prompt = `Custom prompt template for ${agentConfig.name}...`;
```

### Changing Typing Speed

Adjust delays in the `callLLM` function:

```javascript
await new Promise(r => setTimeout(r, 30)); // Change 30 to desired ms
```

### Customizing Agent Name Generation

The system automatically generates agent names based on tasks. You can customize this behavior in `script.js`:

**With API Key (LLM-based):**
The `generateAgentName` function sends a prompt to the LLM to create contextual names:

```javascript
async function generateAgentName(task, section) {
  // Modify the prompt to change naming style
  const prompt = `Given this task: "${task}" for section "${section}", 
  generate a concise, professional agent name (2-3 words max)...`;
  // ... rest of function
}
```

**Without API Key (Keyword-based):**
The function uses keyword matching as fallback:

```javascript
if (!apiKey) {
  const taskKeywords = task.toLowerCase();
  if (taskKeywords.includes('verify')) return 'Verification Specialist';
  if (taskKeywords.includes('review')) return 'Analysis Expert';
  // Add your own keyword patterns here
  return 'Document Specialist'; // Default fallback
}
```

**Disabling Dynamic Naming:**
If you prefer static names, simply remove the name generation calls in `runAutonomousAgent` and `runSingleAgent`:

```javascript
// Remove these lines:
const dynamicName = await generateAgentName(agentConfig.task, agentConfig.section);
agentConfig.name = dynamicName;

// The agent will use the name from agentConfigurations in demo-documents.js
```

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Additional demo scenarios (medical records, technical documentation, etc.)
- More sophisticated section detection algorithms
- Agent coordination and communication
- Undo/redo support for AI edits
- Export functionality with change tracking
- Voice-to-text integration for prompts

## 📄 License

MIT License - feel free to use this code for your own projects!

## 🙏 Acknowledgments

- **Yjs** for the excellent CRDT implementation
- **Quill** for the rich text editor
- **Bootstrap** for UI components
- **OpenAI** for GPT models

## 📧 Support

For questions or issues, please open a GitHub issue or contact the development team.

---

**Built with ❤️ to demonstrate the future of human-AI collaborative editing**