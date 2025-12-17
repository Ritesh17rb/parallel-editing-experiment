import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import diff from "fast-diff";
import { demoScenarios, agentConfigurations } from './demo-documents.js';
import { AgentManager } from './agent-manager.js';
import { extractTextFromPDF, isPDFFile } from './pdf-utils.js';
import config from './config.js';

// Register Cursors Module
Quill.register('modules/cursors', QuillCursors);

// Register Custom Agent Attribute for Highlighting
const Parchment = Quill.import('parchment');
const AgentIdAttribute = new Parchment.Attributor.Class('agent-id', 'agent-id', {
  scope: Parchment.Scope.INLINE
});
Quill.register(AgentIdAttribute);

// Global state for highlight
let highlightedAgentId = null;

// Helper to toggle highlight (Global)
// Helper to toggle highlight (Global)
window.toggleAgentHighlight = function(agentId, color) {
  // Remove previous rules
  const oldStyle = document.getElementById('agent-highlight-style');
  if (oldStyle) oldStyle.remove();
  
  // If clicking same agent, turn off
  if (highlightedAgentId === agentId) {
    highlightedAgentId = null;
    return;
  }
  
  highlightedAgentId = agentId;
  
  // Add new rule with improved styling for continuity
  const style = document.createElement('style');
  style.id = 'agent-highlight-style';
  style.innerHTML = `
    .agent-id-${agentId} {
      background-color: ${color}40 !important; /* Stronger background */
      border-bottom: 3px solid ${color} !important;
      text-decoration: none; 
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
      padding-top: 2px;
      padding-bottom: 2px;
      margin: 0;
      cursor: pointer;
      position: relative;
    }
    .agent-id-${agentId}::after {
      content: '🖊';
      font-size: 0.7em;
      vertical-align: super;
      margin-left: 2px;
      color: ${color};
    }
  `;
  document.head.appendChild(style);

  // Scroll to edit
  // Scroll to edit
  setTimeout(() => {
     const editorContainer = document.querySelector('.ql-editor');
     if (editorContainer) {
         const match = editorContainer.querySelector(`.agent-id-${agentId}`);
         if (match) {
             match.scrollIntoView({ behavior: 'smooth', block: 'center' });
             
             // Visual Cue
             const originalTransition = match.style.transition;
             match.style.transition = "background-color 0.5s ease";
             match.style.backgroundColor = `${color}AA`;
             setTimeout(() => {
                 match.style.backgroundColor = "";
                 match.style.transition = originalTransition;
             }, 800);
         }
     }
     
     // SHOW DIFF MODAL (Before vs After)
     // Find the latest change for this agent
     if (typeof changeHistory !== 'undefined') {
        let lastChangeId = null;
        let lastTimestamp = 0;
        
        changeHistory.forEach((val, key) => {
            if (val.agentId === agentId && val.timestamp > lastTimestamp) {
                lastTimestamp = val.timestamp;
                lastChangeId = key;
            }
        });

        if (lastChangeId) {
            showDiffModal(lastChangeId);
        }
     }
  }, 50);
};

// ===== GLOBAL STATE =====
let currentScenario = null;
let activeAgents; // Track active agents (Synced)
let userIsTyping = false;
let lastUserActivity = Date.now();

// Remove duplicate agentManager since we are using Yjs for coordination now
// Or keep it for local IDs, but we will mostly rely on Yjs
const agentManager = new AgentManager();

// ===== UTILITY FUNCTIONS =====
function log(msg, type = 'info') {
  const logs = document.getElementById('logs');
  const timestamp = new Date().toLocaleTimeString();
  const icon = type === 'error' ? '❌' : type === 'success' ? '✅' : '📝';
  logs.innerHTML += `<div class="mb-1"><small class="text-muted">${timestamp}</small> ${icon} ${msg}</div>`;
  logs.scrollTop = logs.scrollHeight;
}

// ===== YJS SETUP =====
const ydoc = new Y.Doc();
activeAgents = ydoc.getMap('active-agents-data');
const ytext = ydoc.getText('quill');

const urlParams = new URLSearchParams(window.location.search);
let roomName = urlParams.get('room');
if (!roomName) {
  roomName = 'doc-' + Math.random().toString(36).substring(2, 7);
  window.history.replaceState({}, '', `?room=${roomName}`);
}

const persistence = new IndexeddbPersistence(roomName, ydoc);
persistence.on('synced', () => log('Local storage synced', 'success'));

const provider = new WebrtcProvider(roomName, ydoc, {
  signaling: [
    'wss://signaling-server-2s0k.onrender.com'
  ]
});

provider.on('status', event => {
  const dot = document.getElementById('connection-status-dot');
  const text = document.getElementById('connection-status-text');
  if (dot && text) {
      if (event.connected) {
          log('Connected to collaboration server', 'success');
          dot.classList.replace('bg-warning', 'bg-success');
          text.innerText = "Connected";
      } else {
          log('Disconnected from server', 'error');
          dot.classList.replace('bg-success', 'bg-warning');
          text.innerText = "Connecting...";
      }
  }
});

// ===== USER AWARENESS =====
const COLORS = [
  { color: '#FF3333', light: '#FFD6D6' },
  { color: '#FFAA33', light: '#FFF5D6' },
  { color: '#33AA33', light: '#D6F5D6' },
  { color: '#3333FF', light: '#D6D6FF' },
  { color: '#AA33AA', light: '#F5D6F5' }
];

const myColor = COLORS[Math.floor(Math.random() * COLORS.length)];
const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
const nameInput = document.getElementById('user-name-input');

window.addEventListener('load', () => {
  const storedName = localStorage.getItem('synapse_username');
  if (storedName) {
    nameInput.value = storedName;
    joinSession();
  } else {
    welcomeModal.show();
  }
  initializeDemoCards();
});

function joinSession() {
  const rawName = nameInput.value.trim();
  if (!rawName) {
    alert("Please enter a name!");
    return;
  }
  
  provider.awareness.setLocalStateField('user', {
    name: rawName,
    color: myColor.color
  });

  welcomeModal.hide();
  localStorage.setItem('synapse_username', rawName);
  log(`Joined as ${rawName}`, 'success');
}

document.getElementById('btn-join').onclick = joinSession;
nameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') joinSession();
});

// Share functionality
document.getElementById('btn-share').onclick = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = document.getElementById('btn-share');
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
    btn.classList.replace('btn-outline-primary', 'btn-success');
    
    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.classList.replace('btn-success', 'btn-outline-primary');
    }, 2000);
  });
};

provider.awareness.on('change', () => {
  const count = provider.awareness.getStates().size;
  document.getElementById('user-count').innerText = count;
  updateAgentActivity(); // Also update the activity list to show users
});

// ===== EDITOR SETUP =====
const editor = new Quill('#editor-container', {
  theme: 'snow',
  modules: { 
    cursors: true,
    toolbar: [['bold', 'italic'], [{ header: 1 }, { header: 2 }], ['clean']] 
  },
  placeholder: 'Start typing or load a demo scenario...'
});

const binding = new QuillBinding(ytext, editor, provider.awareness);

// Track user typing activity for UI feedback only (not for pausing agents)
let typingTimeout = null;

editor.on('text-change', (delta, oldDelta, source) => {
  if (source === 'user') {
    // User is typing - just update UI, don't pause agents
    if (!userIsTyping) {
      userIsTyping = true;
      log('You are editing - agents continue working in parallel', 'info');
      updateAgentActivity(); // Update UI to show parallel editing
    }
    
    lastUserActivity = Date.now();
    
    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Reset typing flag after 2 seconds of inactivity
    typingTimeout = setTimeout(() => {
      if (Date.now() - lastUserActivity >= 2000) {
        userIsTyping = false;
        updateAgentActivity(); // Update UI
      }
    }, 2000);
  }
});

// Click listener to detecting clicking on an agent's edit to show diff
editor.on('selection-change', (range, oldRange, source) => {
    if (range && range.length === 0) { // Click/Cursor placement
        const format = editor.getFormat(range.index);
        if (format['change-id']) {
            showDiffModal(format['change-id']);
        }
    }
});

// ===== DEMO CARDS INITIALIZATION =====
function initializeDemoCards() {
  const container = document.getElementById('demo-cards-container');
  
  Object.entries(demoScenarios).forEach(([key, scenario]) => {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4';
    card.innerHTML = `
      <div class="card h-100 demo-card" style="cursor: pointer;" data-scenario="${key}">
        <div class="card-body">
          <h6 class="card-title d-flex align-items-center mb-3">
            <i class="bi ${scenario.icon} fs-4 text-primary me-2"></i>
            ${scenario.title}
          </h6>
          <p class="card-text small text-muted">${scenario.description}</p>
        </div>
      </div>
    `;
    
    card.querySelector('.demo-card').addEventListener('click', () => {
      loadScenario(key);
    });
    
    container.appendChild(card);
  });
}

// ===== LOAD SCENARIO =====
let currentAbortController = null;

function loadScenario(scenarioKey) {
  // Cancel previous agents if any
  if (currentAbortController) {
    currentAbortController.abort();
  }
  currentAbortController = new AbortController();

  // Clear running agents
  activeAgents.forEach((_, id) => {
    removeAgent(id);
    removeAICursor(id);
  });
  activeAgents.clear();
  
  // Hide parent card
  const parentCard = document.getElementById('parent-agent-card');
  if (parentCard) parentCard.style.display = 'none';

  currentScenario = scenarioKey;
  const scenario = demoScenarios[scenarioKey];
  
  // Update UI
  document.querySelectorAll('.demo-card').forEach(card => {
    card.classList.remove('active');
  });
  document.querySelector(`[data-scenario="${scenarioKey}"]`).classList.add('active');
  
  document.getElementById('document-title').textContent = scenario.title;
  
  // Load document content
  editor.clipboard.dangerouslyPasteHTML(0, scenario.document);
  
  // Load sample prompts
  loadSamplePrompts(scenario.samplePrompts);
  
  log(`Loaded: ${scenario.title}`, 'success');
}

// ===== SAMPLE PROMPTS =====
function loadSamplePrompts(prompts) {
  const container = document.getElementById('sample-prompts-container');
  
  // Clear previous content
  container.innerHTML = '';
  
  if (!prompts || prompts.length === 0) {
    return;
  }
  
  prompts.forEach(prompt => {
    // Create a "chip" style element
    const promptEl = document.createElement('button');
    promptEl.className = 'btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center gap-2 mb-2 me-2';
    promptEl.title = prompt.description; // Tooltip for description
    promptEl.innerHTML = `
      <i class="bi bi-magic"></i>
      <span>${prompt.text}</span>
    `;
    
    promptEl.addEventListener('click', () => {
      document.getElementById('custom-prompt').value = prompt.text;
      triggerMultiAgentAI();
      // Scroll to editor or focus logic could go here
    });
    
    container.appendChild(promptEl);
  });
}

// Observe shared agent state
activeAgents.observe(() => {
  updateAgentActivity();
});

function updateAgentActivity() {
  const container = document.getElementById('agent-activity-container');
  const countBadge = document.getElementById('active-agents-count');
  
  // Clear container
  container.innerHTML = '';
  
  // 1. SHOW CONNECTED USERS (Collaborators)
  const states = provider.awareness.getStates();
  let onlineUsers = 0;
  
  states.forEach((state, clientId) => {
    // Skip if it's us? No, show us too so we see what others see? 
    // Usually "Collaborators" lists everyone.
    // The user said "see him... and he see me".
    if (state.user && state.user.name) {
       onlineUsers++;
       const isMe = clientId === provider.awareness.clientID;
       const userEl = document.createElement('div');
       userEl.className = 'agent-item p-2 mb-2 bg-body rounded';
       // Use a different border style for humans
       userEl.style.borderLeft = `4px solid ${state.user.color}`;
       userEl.style.backgroundColor = isMe ? 'rgba(var(--bs-primary-rgb), 0.05)' : '';
       
       userEl.innerHTML = `
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <span class="agent-status-dot" style="background-color: ${state.user.color}; animation: none;"></span>
            <strong class="small">${state.user.name} ${isMe ? '(You)' : ''}</strong>
          </div>
          <span class="badge bg-primary-subtle text-primary">Human</span>
        </div>
        <div class="small text-muted mt-1">
          <i class="bi bi-pencil-square me-1"></i>Collaborator
        </div>
       `;
       container.appendChild(userEl);
    }
  });

  // Separator if we have both users and agents
  if (onlineUsers > 0 && activeAgents.size > 0) {
     const hr = document.createElement('hr');
     hr.className = 'my-2 opacity-25';
     container.appendChild(hr);
  }

  // 2. SHOW AI AGENTS
  if (activeAgents.size === 0 && onlineUsers === 0) {
    container.innerHTML = '<p class="text-muted text-center small mb-0">No active agents or users</p>';
    if (countBadge) countBadge.textContent = '0 Active';
    return;
  }
  
  // Update total count (Agents + Users) or just Agents?
  // The badge ID is 'active-agents-count'. Let's keep it for agents for now, or total?
  // "He should be able to see me and the agents".
  // Let's update badge to show total activity.
  if (countBadge) countBadge.textContent = `${activeAgents.size + onlineUsers} Active`;

  // Show parallel editing indicator if user is typing
  if (userIsTyping) {
    const parallelIndicator = document.createElement('div');
    parallelIndicator.className = 'alert alert-info py-2 px-3 mb-2 small';
    parallelIndicator.innerHTML = '<i class="bi bi-people-fill me-2"></i><strong>Parallel Editing</strong> - content updates live';
    container.prepend(parallelIndicator);
  }
  
  activeAgents.forEach((agentJson, agentId) => {
    const agent = typeof agentJson === 'string' ? JSON.parse(agentJson) : agentJson;
    
    // Fallback for color if missing
    const color = agent.color || '#6c757d';

    const agentEl = document.createElement('div');
    // Only animate if not completed
    const isWorking = agent.status !== 'Completed' && agent.status !== 'Failed';
    agentEl.className = `agent-item p-2 mb-2 bg-body rounded ${isWorking ? 'working' : ''}`;
    agentEl.style.borderLeftColor = color;
    agentEl.style.borderLeft = `4px solid ${color}`;
    agentEl.style.cursor = 'pointer'; // Make clickable
    agentEl.title = isWorking ? "Working..." : "Click to see changes";
    agentEl.onclick = () => window.toggleAgentHighlight(agentId, color);
    
    // Status Badge Color and Text
    let badgeClass = 'bg-info-subtle text-info';
    let statusText = agent.status || 'Working';
    
    if (agent.status === 'Completed') {
      badgeClass = 'bg-success-subtle text-success';
      statusText = 'Completed';
    } else if (agent.status === 'Failed') {
      badgeClass = 'bg-danger-subtle text-danger';
      statusText = 'Failed';
    } else if (agent.status === 'reading') {
      badgeClass = 'bg-primary-subtle text-primary';
      statusText = 'Reading';
    } else if (agent.status === 'working' || agent.status === 'Writing') {
      badgeClass = 'bg-warning-subtle text-warning';
      statusText = 'Working';
    } else if (agent.status === 'verifying') {
      badgeClass = 'bg-info-subtle text-info';
      statusText = 'Verifying';
    } else if (agent.status === 'simulating') {
      badgeClass = 'bg-secondary-subtle text-secondary';
      statusText = 'Simulating';
    }

    agentEl.innerHTML = `
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <span class="agent-status-dot" style="background-color: ${color}; animation: ${isWorking ? 'blink 1.5s infinite' : 'none'}"></span>
          <strong class="small">${agent.name}</strong>
        </div>
        <span class="badge ${badgeClass}">${statusText}</span>
      </div>
      <div class="small text-muted mt-1">
        <i class="bi bi-list-task me-1"></i>${agent.task}
      </div>
    `;
    
    // Prepend to show latest agents on top
    container.prepend(agentEl);
  });
}

function addAgent(agentConfig) {
  // Store as string to be safe with Yjs Map value types
  activeAgents.set(agentConfig.id, JSON.stringify({
    ...agentConfig,
    status: 'Working'
  }));
  
  // Inject unique color styling for this agent's text highlighting
  const existingStyle = document.getElementById(`agent-style-${agentConfig.id}`);
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = `agent-style-${agentConfig.id}`;
    const color = agentConfig.color || '#6c757d';
    
    // Create semi-transparent background from the agent's color
    style.innerHTML = `
      .agent-id-${agentConfig.id} {
        background-color: ${color}30 !important;
        border-bottom-color: ${color} !important;
        color: inherit;
      }
      .agent-id-${agentConfig.id}:hover {
        background-color: ${color}50 !important;
      }
    `;
    document.head.appendChild(style);
  }
}

function removeAgent(agentId) {
  activeAgents.delete(agentId);
  
  // Clean up the agent's color style
  const agentStyle = document.getElementById(`agent-style-${agentId}`);
  if (agentStyle) {
    agentStyle.remove();
  }
}

function updateAgentStatus(agentId, status) {
  if (activeAgents.has(agentId)) {
    const current = JSON.parse(activeAgents.get(agentId));
    current.status = status;
    // Ensure name and task are preserved
    activeAgents.set(agentId, JSON.stringify(current));
  }
}

// ===== SECTION DETECTION =====
function findSectionInDocument(sectionKeyword) {
  const content = editor.getText();
  const lines = content.split('\n');
  
  // Try to find section by keyword
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toUpperCase();
    if (line.includes(sectionKeyword.toUpperCase())) {
      // Calculate character position
      let position = 0;
      for (let j = 0; j < i; j++) {
        position += lines[j].length + 1; // +1 for newline
      }
      
      // Find end of section (next heading or end of document)
      let endPosition = content.length;
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j];
        // Check if it's a heading (starts with number or all caps)
        if (/^[0-9]+\./.test(nextLine) || /^[A-Z\s]{10,}$/.test(nextLine)) {
          endPosition = 0;
          for (let k = 0; k < j; k++) {
            endPosition += lines[k].length + 1;
          }
          break;
        }
      }
      
      return { start: position, end: endPosition, text: content.substring(position, endPosition) };
    }
  }
  
  // If not found, return a random section
  const sectionLength = Math.floor(content.length / 4);
  const start = Math.floor(Math.random() * (content.length - sectionLength));
  return { start, end: start + sectionLength, text: content.substring(start, start + sectionLength) };
}

// ===== AI CURSOR MANAGEMENT =====
const aiCursors = ydoc.getMap('ai-cursors');

function updateAICursor(agentId, index, color, name) {
  const relPos = Y.createRelativePositionFromTypeIndex(ytext, index);
  const encoded = Y.encodeRelativePosition(relPos);
  aiCursors.set(agentId, { position: encoded, color, name: name || agentId });
  
  // Auto-scroll to keep agent work visible
  setTimeout(() => {
    const editorContainer = document.querySelector('.ql-editor');
    if (editorContainer) {
      const cursorElement = document.querySelector(`[data-id="${agentId}"]`);
      if (cursorElement) {
        cursorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, 50);
}

function removeAICursor(agentId) {
  aiCursors.delete(agentId);
}

// Listen for AI cursor updates
const knownAICursorIds = new Set();

aiCursors.observe(() => {
  const cursorsModule = editor.getModule('cursors');
  const currentIds = new Set(aiCursors.keys());
  
  // 1. Remove deleted cursors
  knownAICursorIds.forEach(id => {
      if (!currentIds.has(id)) {
          cursorsModule.removeCursor(id);
          knownAICursorIds.delete(id);
      }
  });

  // 2. Update/Create current cursors
  aiCursors.forEach((cursorData, agentId) => {
    knownAICursorIds.add(agentId); // Track it
    
    if (!cursorData.position) {
      cursorsModule.removeCursor(agentId);
      return;
    }
    
    try {
      const relPos = Y.decodeRelativePosition(cursorData.position);
      const absPos = Y.createAbsolutePositionFromRelativePosition(relPos, ydoc);
      
      if (absPos && absPos.index !== null) {
        // Create or update cursor
        cursorsModule.createCursor(agentId, cursorData.name || agentId, cursorData.color);
        cursorsModule.moveCursor(agentId, { index: absPos.index, length: 0 });
      }
    } catch (e) {
      console.error("Error updating AI cursor:", e);
    }
  });
});

// ===== LLM CALL =====
async function callLLM(messages, onChunk) {
  const apiKey = localStorage.getItem('llm_api_key');
  const baseUrl = localStorage.getItem('llm_url') || 'https://api.openai.com/v1';

  // Helper function for simulation (Shared logic)
  const runSimulation = async () => {
      // Enhanced simulation with agent-specific content
      const mockTexts = {
        'agent-parties': ' [Verified: All party information is accurate and complete. Legal entities properly identified.] ',
        'agent-liability': ' [Reviewed: Liability caps are reasonable. Indemnification clauses are balanced.] ',
        'agent-ip': ' [Analyzed: IP ownership clearly defined. Licensing terms are appropriate.] ',
        'agent-abstract': ' [Enhanced: Abstract now includes key findings and methodology summary.] ',
        'agent-methodology': ' [Improved: Technical descriptions are clearer and more reproducible.] ',
        'agent-results': ' [Verified: All data presentations are accurate and properly formatted.] ',
        'agent-references': ' [Checked: All citations are properly formatted and complete.] ',
        'agent-executive': ' [Enhanced: Value proposition is now more compelling and clear.] ',
        'agent-financial': ' [Verified: All financial calculations and projections are accurate.] ',
        'agent-technical': ' [Improved: Technical solution descriptions are more detailed.] '
      };
      
      const agentId = messages[0]?.content?.match(/You are (\S+)/)?.[1] || 'agent';
      const mock = mockTexts[agentId] || ' [AI-generated improvement text based on your request.] ';
      
      for (const char of mock.split('')) {
        await new Promise(r => setTimeout(r, 40));
        onChunk(char);
      }
  };

  if (!apiKey) {
    log('⚠ No API Key. Simulating AI typing...', 'info');
    await runSimulation();
    return;
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ 
        model: config.defaultModel || 'gpt-4o-mini', 
        messages, 
        stream: true,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          try {
            const content = JSON.parse(line.substring(6)).choices[0]?.delta?.content;
            if (content) {
              for (const char of content) {
                await new Promise(r => setTimeout(r, 30));
                onChunk(char);
              }
            }
          } catch (e) {}
        }
      }
    }
  } catch (e) {
    if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError') || e.name === 'TypeError') {
         log("⚠ Connection refused. Using simulation.", 'warning');
         await runSimulation();
    } else {
         log("AI Error: " + e.message, 'error');
    }
  }
}

// ===== GENERATE AGENT NAME BASED ON TASK =====
function generateAgentNameSync(task, section) {
  // Synchronous fallback name generation based on task keywords
  const taskKeywords = task.toLowerCase();
  
  // Check for specific keywords and return appropriate names
  if (taskKeywords.includes('verify') || taskKeywords.includes('check')) return 'Verification Specialist';
  if (taskKeywords.includes('review') || taskKeywords.includes('analyze')) return 'Analysis Expert';
  if (taskKeywords.includes('enhance') || taskKeywords.includes('improve')) return 'Enhancement Specialist';
  if (taskKeywords.includes('simplify') || taskKeywords.includes('concise')) return 'Simplification Specialist';
  if (taskKeywords.includes('financial') || taskKeywords.includes('number')) return 'Financial Analyst';
  if (taskKeywords.includes('technical') || taskKeywords.includes('architecture')) return 'Technical Writer';
  if (taskKeywords.includes('legal') || taskKeywords.includes('compliance')) return 'Legal Compliance Reviewer';
  if (taskKeywords.includes('add') || taskKeywords.includes('insert')) return 'Content Adder';
  if (taskKeywords.includes('remove') || taskKeywords.includes('delete')) return 'Content Remover';
  if (taskKeywords.includes('rewrite') || taskKeywords.includes('rephrase')) return 'Content Rewriter';
  if (taskKeywords.includes('format') || taskKeywords.includes('style')) return 'Formatting Specialist';
  if (taskKeywords.includes('grammar') || taskKeywords.includes('spelling')) return 'Grammar Checker';
  if (taskKeywords.includes('summarize') || taskKeywords.includes('summary')) return 'Summarization Expert';
  if (taskKeywords.includes('expand') || taskKeywords.includes('elaborate')) return 'Content Expander';
  
  // Extract first meaningful word from task as fallback
  const words = task.split(' ').filter(w => w.length > 3 && !['the', 'and', 'for', 'with'].includes(w.toLowerCase()));
  if (words.length > 0) {
    return `${words[0]} Specialist`;
  }
  
  // Last resort: use section name
  return section ? `${section} Agent` : 'Task Agent';
}

async function generateAgentName(task, section) {
  const apiKey = localStorage.getItem('llm_api_key');
  const baseUrl = localStorage.getItem('llm_url') || 'https://api.openai.com/v1';

  // Always use sync fallback first for immediate display
  const fallbackName = generateAgentNameSync(task, section);
  
  // If no API key, return fallback immediately
  if (!apiKey) {
    return fallbackName;
  }

  try {
    const prompt = `Given this task: "${task}" for section "${section}", generate a concise, professional agent name (2-3 words max) that describes what this agent does. 

Examples:
- Task: "Verify all party names and addresses" → "Parties Verifier"
- Task: "Review limitation of liability clauses" → "Liability Checker"
- Task: "Analyze intellectual property provisions" → "IP Rights Analyst"
- Task: "Improve abstract clarity and accuracy" → "Abstract Enhancer"
- Task: "Verify financial calculations" → "Financial Auditor"

Respond with ONLY the agent name, nothing else.`;

    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ 
        model: config.defaultModel || 'gpt-4o-mini', 
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 20
      })
    });

    if (!response.ok) throw new Error("Fetch failed");

    const data = await response.json();
    const generatedName = data.choices[0]?.message?.content?.trim();
    
    if (generatedName && generatedName.length > 0 && generatedName.length < 50) {
      return generatedName;
    }
  } catch (e) {
    // Silently fall back to sync name
  }

  // Return fallback name if API call failed
  return fallbackName;
}

// ===== SINGLE AGENT EXECUTION =====
async function runSingleAgent(agentConfig) {
  // Generate dynamic agent name based on task
  const dynamicName = await generateAgentName(agentConfig.task, agentConfig.section);
  agentConfig.name = dynamicName;
  
  addAgent(agentConfig);
  log(`${agentConfig.name} started working on ${agentConfig.section}`, 'info');
  
  // Find the section in the document
  const section = findSectionInDocument(agentConfig.section);
  let currentIndex = section.start;
  
  // Prepare the prompt
  const prompt = `You are ${agentConfig.name}, a specialized AI agent. Your task: ${agentConfig.task}

Section content to improve:
"""
${section.text.substring(0, 1000)}
"""

Provide ONLY the improved text for this section. Be concise and focused. Write naturally without meta-commentary.`;

  const messages = [{ role: 'user', content: prompt }];
  
  // Update agent status
  updateAgentStatus(agentConfig.id, 'Analyzing');
  
  // Wait a bit before starting to avoid overwhelming
  await new Promise(r => setTimeout(r, Math.random() * 1000 + 500));
  
  updateAgentStatus(agentConfig.id, 'Writing');
  


// Stream and insert text
  try {
      await callLLM(messages, async (chunk) => {
        if (currentAbortController && currentAbortController.signal.aborted) {
             throw new Error("Aborted");
        }
        
        // If user is typing, wait briefly instead of skipping
        while (userIsTyping) {
          await new Promise(r => setTimeout(r, 100));
        }
        
        ydoc.transact(() => {
          // INSERT WITH ATTRIBUTES
          ytext.insert(currentIndex, chunk, { 'agent-id': agentConfig.id });
          currentIndex += chunk.length;
          updateAICursor(agentConfig.id, currentIndex, agentConfig.color, agentConfig.name);
        });
      });
  } catch(e) {
      if (e.message === "Aborted") {
          log(`${agentConfig.name} stopped.`, 'warning');
          removeAICursor(agentConfig.id);
          removeAgent(agentConfig.id);
          return;
      }
      throw e;
  }
  
  // Cleanup
  removeAICursor(agentConfig.id);
  // Do NOT remove agent - keep it for highlighting history
  updateAgentStatus(agentConfig.id, 'Completed');
  log(`${agentConfig.name} completed work`, 'success');
}

// ===== CHANGE HISTORY SYNC =====
const changeHistory = ydoc.getMap('change-history');

// Register Custom Change Attribute
const ChangeIdAttribute = new Parchment.Attributor.Class('change-id', 'change-id', {
  scope: Parchment.Scope.INLINE
});
Quill.register(ChangeIdAttribute);

// ===== REVIEW UI =====
function showDiffModal(changeId) {
    const changeData = changeHistory.get(changeId);
    if (!changeData) return;

    const modal = new bootstrap.Modal(document.getElementById('diffModal'));
    const beforeEl = document.getElementById('diff-before-content');
    const afterEl = document.getElementById('diff-after-content');
    const titleEl = document.getElementById('diff-modal-title');

    // Get Agent Name
    const agentData = activeAgents.get(changeData.agentId);
    const agentName = agentData ? JSON.parse(agentData).name : 'Agent';

    titleEl.innerText = `Edit by ${agentName}`;

    // Simple diff view
    beforeEl.innerText = changeData.before;
    afterEl.innerText = changeData.after;
    
    // Advanced Diff calc for highlighting within the modal
    const changes = diff(changeData.before, changeData.after);
    let html = '';
    changes.forEach(([action, text]) => {
        if (action === 0) html += text;
        else if (action === -1) html += `<span class="diff-del">${text}</span>`;
        else if (action === 1) html += `<span class="diff-ins">${text}</span>`;
    });
    
    // We can show a combined view or side-by-side. 
    // The user asked for "Before vs After". Side by side is often clearest, 
    // but a combined inline diff is also powerful.
    // Let's stick to the dual pane in the modal as placeholders suggest.
    // Actually, let's use the combined HTML for a "Diff" view and raw text for others?
    // Let's make the modal body contain Three views? No, keep it simple.
    // We will populate a "Visual Diff" area.
    
    const visualContainer = document.getElementById('diff-visual-container');
    if (visualContainer) visualContainer.innerHTML = html;

    modal.show();
}

// ===== ORCHESTRATION =====

// ===== SINGLE AGENT TRIGGER =====
async function triggerMultiAgentAI() {
  const instructionInput = document.getElementById('custom-prompt');
  const instruction = instructionInput.value.trim();
  
  if (instruction.length > 0) {
      // 1. Immediate UI Feedback
      // 1. Immediate UI Feedback
      // instructionInput.value = ''; // User requested to keep the instruction
      log(`🧠 Assigning task: "${instruction}"...`, 'info');
      
      // 2. Spawn Single Agent (No Orchestration)
      const colors = ['#FF3333', '#FFAA33', '#33AA33', '#3333FF', '#AA33AA'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Random color or sequential
      
      const config = {
          task: instruction,
          section: 'General', 
          color: randomColor,
          // name will be generated
      };
      
      await runAutonomousAgent(config);
      return;
  }

  // Fallback: If no input, try scenario agents
  if (!currentScenario) {
    log('Please load a demo scenario or type a specific task!', 'warning');
    return;
  }
  
  const agents = agentConfigurations[currentScenario];
  if (!agents || agents.length === 0) {
    log('No agents configured for this scenario', 'error');
    return;
  }
  
  log(`🚀 Launching ${agents.length} scenario agents...`, 'success');
  
  // Run all agents in parallel
  // Note: "if i give a task one agent should work on it". 
  // For scenarios, multiple pre-defined agents is likely still desired behavior 
  // properly separating the pre-defined demo from manual tasks.
  // We keep parallel execution for "Demo Scenarios" as that validates the "Parallel" tech.
  const agentPromises = agents.map(agent => runAutonomousAgent(agent));
  
  await Promise.all(agentPromises);
  
  log('✨ All agents finished!', 'success');
}

// ===== INDEPENDENT AGENT EXECUTION =====
async function runAutonomousAgent(agentConfig) {
  // 1. Generate name immediately (synchronously) if not provided
  if (!agentConfig.name) {
      agentConfig.name = generateAgentNameSync(agentConfig.task, agentConfig.section);
  }
  
  // Register with AgentManager (Show in UI immediately with proper name)
  const agentId = agentManager.spawnAgent(agentConfig);
  agentConfig.id = agentId;
  addAgent(agentConfig); // Ensure UI element is created with the name
  
  log(`${agentConfig.name} started working on: ${agentConfig.task}`, 'info');
  
  try {
    updateAgentStatus(agentId, 'reading');
  
    // 1. Get Context (Section or Whole Doc)
    let currentText = ytext.toString();
    updateAgentStatus(agentId, 'working');

    const apiKey = localStorage.getItem('llm_api_key');
    const baseUrl = localStorage.getItem('llm_url') || 'https://api.openai.com/v1';

    if (!apiKey) {
       // Manual Mock mode trigger
       await runAgentSimulation(agentId, agentConfig);
       return;
    }

    // --- PHASE 1: EXECUTION ---
    agentManager.updateAgentStatus(agentId, 'reading');

    agentManager.updateAgentStatus(agentId, 'working');

    // Query LLM for Edits
    let response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ 
        model: config.defaultModel || 'gpt-4o', 
        messages: [
            {
                role: "system",
                content: `You are ${agentConfig.name}. Your goal is to EXECUTING the user's task on the provided document.
                
RETURN JSON: { operations: [{ match: "exact text to replace", replacement: "new content" }] }

RULES:
1. STRICT ADHERENCE: You must perform exactly what the task asks. Do not summarize or just comment. Change the text.
2. EXACT MATCH: The "match" field must be a UNIQUE substring found in the document. Copy it exactly from the source (including punctuation/whitespace).
3. TO ADD TEXT: To add text, "match" should be the sentence or heading immediately preceding the insertion point. "replacement" should be "match" + "\n\n" + "new text".
4. TO DELETE TEXT: "replacement" should be empty string "".
5. TO EDIT TEXT: "match" is the old text, "replacement" is the new text.
6. CONTEXT: Use the provided Section info to locate the area, but search the whole text if needed.

Do not hallucinate matches. If you cannot find the text to change, return empty operations.`
            },
            {
                role: "user",
                content: `Document:\n${currentText}\n\nTask: ${agentConfig.task}\nSection: ${agentConfig.section}`
            }
        ],
        response_format: { 
            type: "json_schema", 
            json_schema: {
                name: "contract_edit",
                schema: {
                    type: "object",
                    properties: {
                        operations: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    match: { type: "string" },
                                    replacement: { type: "string" }
                                },
                                required: ["match", "replacement"],
                                additionalProperties: false
                            }
                        }
                    },
                    required: ["operations"],
                    additionalProperties: false
                }
            } 
        }
      })
    });
    
    if (!response.ok) {
         throw new Error(`API Error: ${response.status}`);
    }

    let data = await response.json();
    let operations = [];
    try {
        operations = JSON.parse(data.choices[0].message.content).operations || [];
    } catch (e) {
        log(`${agentConfig.name} produced no valid edits.`, 'warning');
    }
    
    // Success path continues below...
    
    if (operations.length > 0) {
        log(`${agentConfig.name} applying ${operations.length} edits...`, 'info');
        await applyOperations(operations, agentId, agentConfig.name, agentConfig.color);
    }
    
    // --- PHASE 2: SELF-VERIFICATION ---
    updateAgentStatus(agentId, 'verifying');
    currentText = ytext.toString(); 
    
    response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ 
         model: config.defaultModel || 'gpt-4o',
         messages: [
            { role: "system", content: "Verify correct completion. Return JSON { operations: [] } if good. If mistakes found, provide fix operations." },
            { role: "user", content: `Doc:\n${currentText}\nTask: ${agentConfig.task}` }
         ],
         response_format: { type: "json_object" }
      })
    });
    
    // ... verification logic ...

  } catch (error) {
    // FALLBACK TO SIMULATION IF NETWORK FAILS
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
        log(`⚠ Network error. Switching ${agentConfig.name} to simulation.`, 'warning');
        await runAgentSimulation(agentId, agentConfig);
        return; // Exit normally as simulation handles completion
    }
    
    agentManager.failAgent(agentId, error.message);
    log(`${agentConfig.name} error: ${error.message}`, 'error');
    updateAgentStatus(agentConfig.id, 'Failed');
  } finally {
    // Cleanup
    removeAICursor(agentConfig.id);
    const finalState = activeAgents.get(agentConfig.id);
    if (finalState) {
        const state = JSON.parse(finalState);
        if (state.status !== 'Failed') {
            updateAgentStatus(agentConfig.id, 'Completed');
        }
    }
  }
}

// ===== ROBUST SIMULATION =====
async function runAgentSimulation(agentId, agentConfig) {
    updateAgentStatus(agentId, 'simulating');
    log(`⚠ ${agentConfig.name} running in SIMULATION mode (No API Key or Network Error).`, 'warning');
    await wait(1000);
    
    // Try to find a real word to replace for a good demo
    const currentText = ytext.toString();
    const words = currentText.split(/\s+/).filter(w => w.length > 4);
    
    let operations = [];
    
    // Simple heuristic for simulation based on task keywords
    const task = agentConfig.task.toLowerCase();
    
    if (words.length > 0) {
        if (task.includes('delete') || task.includes('remove')) {
             const target = words[Math.floor(Math.random() * words.length)];
             operations.push({ match: target, replacement: "" });
        } else if (task.includes('upper') || task.includes('capitalize')) {
             const target = words[Math.floor(Math.random() * words.length)];
             operations.push({ match: target, replacement: target.toUpperCase() });
        } else {
             // Default: Append a note or modify a word slightly
             const target = words[Math.floor(Math.random() * words.length)];
             operations.push({ match: target, replacement: `${target} (simulated edit)` });
        }
    } else {
        // Fallback append if empty
        operations.push({ match: "", replacement: `\n[Simulation: ${agentConfig.task}]\n` });
    }
    
    if (operations.length > 0) {
        log(`${agentConfig.name} (Simulated) applying edits...`, 'info');
        await applyOperations(operations, agentId, agentConfig.name, agentConfig.color);
    }
    
    updateAgentStatus(agentId, 'Completing');
    agentManager.completeAgent(agentId);
    await wait(1000);
}

// ===== PARALLEL MULTI-AGENT EXECUTION =====


// ===== SINGLE AI TRIGGER (Original functionality) =====
async function triggerSingleAI() {
  const instruction = document.getElementById('custom-prompt').value;
  if (!instruction) return;

  const statusEl = document.getElementById('ai-status');
  statusEl.classList.remove('d-none');
  statusEl.innerText = "AI Working...";
  
  const range = editor.getSelection();
  let index = range ? range.index : ytext.length;
  let length = range ? range.length : 0;

  if (length > 0) {
    ydoc.transact(() => {
      ytext.delete(index, length);
    });
  }

  const allText = ytext.toString();
  const context = allText.substring(Math.max(0, index - 500), Math.min(allText.length, index + 500));
  
  const prompt = `You are an expert editor. Context: "...${context}...". Instruction: ${instruction}. WRITE TEXT ONLY.`;

  log("Single AI agent starting work...");

  await callLLM([{role: 'user', content: prompt}], (chunk) => {
    if (userIsTyping) return; // Pause if user is typing
    
    ydoc.transact(() => {
      ytext.insert(index, chunk);
      index += chunk.length;
    });
  });

  statusEl.innerText = "Done";
  setTimeout(() => {
    statusEl.classList.add('d-none');
  }, 2000);
}

// ===== EVENT LISTENERS =====
document.getElementById('btn-trigger').addEventListener('click', () => {
  const hasInstruction = document.getElementById('custom-prompt').value.trim().length > 0;
  const hasScenarioAgents = currentScenario && agentConfigurations[currentScenario];

  if (hasInstruction || hasScenarioAgents) {
    triggerMultiAgentAI();
  } else {
    triggerSingleAI();
  }
});



// Template buttons
document.querySelectorAll('.template-btn').forEach(btn => {
  btn.onclick = () => {
    const templates = {
      "MSA": `<h1 style="text-align: center;">MASTER SERVICES AGREEMENT</h1><p><strong>1. PARTIES.</strong> Agreement made between [Party A] and [Party B].</p>`,
      "NDA": `<h1 style="text-align: center;">NON-DISCLOSURE AGREEMENT</h1><p><strong>1. CONFIDENTIALITY.</strong> The parties agree to keep information secret.</p>`
    };
    const type = btn.getAttribute('data-template');
    editor.clipboard.dangerouslyPasteHTML(editor.getLength(), templates[type]);
  };
});

// File Upload Handler (PDF and Text)
// File Upload Handler (PDF and Text)
const fileUploadInput = document.getElementById('file-upload');
if (fileUploadInput) {
  fileUploadInput.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      log(`Uploading ${file.name}...`, 'info');
      let textContent = '';

      if (isPDFFile(file)) {
        // Extract text from PDF
        log('Extracting text from PDF...', 'info');
        textContent = await extractTextFromPDF(file);
        log('PDF text extracted successfully', 'success');
      } else {
        // Read as plain text
        textContent = await file.text();
      }

      // Replace document content
      ydoc.transact(() => {
        ytext.delete(0, ytext.length);
        ytext.insert(0, textContent);
      }, 'file-upload');

      document.getElementById('document-title').textContent = file.name;
      log(`Loaded ${file.name} (${textContent.length} characters)`, 'success');
      
    } catch (error) {
      log(`Failed to load file: ${error.message}`, 'error');
      console.error('File upload error:', error);
    } finally {
      // Reset input
      event.target.value = '';
    }
  });
}

// Share Button Logic
document.getElementById('btn-share').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        log('📋 Link copied as URL', 'success');
        
        // Visual feedback on button
        const btn = document.getElementById('btn-share');
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-lg"></i> Copied';
        btn.classList.replace('btn-outline-light', 'btn-success');
        
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.classList.replace('btn-success', 'btn-outline-light');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
        log('Failed to copy link.', 'error');
    }
});

// LLM Config
function populateModelSelect() {
  const select = document.getElementById('llm-model');
  select.innerHTML = '';
  const currentModel = config.defaultModel || 'gpt-4o-mini';
  
  config.availableModels.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.text = model;
      if (model === currentModel) option.selected = true;
      select.appendChild(option);
  });
}

document.getElementById('save-llm-config').onclick = () => {
  localStorage.setItem('llm_api_key', document.getElementById('llm-api-key').value);
  localStorage.setItem('llm_url', document.getElementById('llm-url').value);
  
  // Save model selection
  const selectedModel = document.getElementById('llm-model').value;
  config.defaultModel = selectedModel; // Update runtime config
  // In a real app we'd persist this too, maybe in localStorage
  localStorage.setItem('llm_model', selectedModel);

  bootstrap.Modal.getInstance(document.getElementById('llmConfigModal')).hide();
  log(`Settings saved. Model: ${selectedModel}`, 'success');
};

// Initialize Config Modal
document.getElementById('llm-api-key').value = localStorage.getItem('llm_api_key') || '';
document.getElementById('llm-url').value = localStorage.getItem('llm_url') || '';
// Load saved model if exists
const savedModel = localStorage.getItem('llm_model');
if (savedModel) config.defaultModel = savedModel;
populateModelSelect();

// New Session Logic
document.getElementById('btn-new-session').onclick = () => {
    if(confirm("Start a new session? This will clear the current document and disconnect you from the current room.")) {
        // Simple reload without query params to generate a new room
        window.location.href = window.location.pathname;
    }
};

// ===== SMART EDITING HELPERS =====
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function applySmartDiff(oldText, newText, agentId, name, color) {
  const changes = diff(oldText, newText);
  let headAnchor = Y.createRelativePositionFromTypeIndex(ytext, 0);

  for (const [action, chunk] of changes) {
    if (action === 0) { // EQ
      // Move anchor
      const startPos = Y.createAbsolutePositionFromRelativePosition(headAnchor, ydoc);
      if (startPos) {
        headAnchor = Y.createRelativePositionFromTypeIndex(ytext, startPos.index + chunk.length);
      }
    } else if (action === -1) { // DEL
      const startPos = Y.createAbsolutePositionFromRelativePosition(headAnchor, ydoc);
      if (startPos) {
        updateAICursor(agentId, startPos.index, color, name);
        await wait(25);
        ydoc.transact(() => {
          ytext.delete(startPos.index, chunk.length);
        }, agentId);
        // Head anchor stays at startPos (content shifted)
      }
    } else if (action === 1) { // INS
      const startPos = Y.createAbsolutePositionFromRelativePosition(headAnchor, ydoc);
      if (startPos) {
        let instAnchor = Y.createRelativePositionFromTypeIndex(ytext, startPos.index);
        for (const char of chunk) {
          const abs = Y.createAbsolutePositionFromRelativePosition(instAnchor, ydoc);
          if (abs) {
            updateAICursor(agentId, abs.index, color, name);
            ydoc.transact(() => {
              ytext.insert(abs.index, char);
            }, agentId);
            instAnchor = Y.createRelativePositionFromTypeIndex(ytext, abs.index + 1);
          }
           await wait(5); // fast typing effect
        }
        headAnchor = instAnchor;
      }
    }
  }
}

async function applyOperations(operations, agentId, name, color) {
    for (const op of operations) {
        const match = op.match;
        const replacement = op.replacement;
        if (!match) continue;

        let anchorRelPos = null;
        let found = false;
        let startIndex = -1;

        // 1. Locate the text to replace
        ydoc.transact(() => {
            const current = ytext.toString();
            // Robust Search
            let idx = current.indexOf(match);
            
            // Fallback 1: Try trimmed
            if (idx === -1) {
                idx = current.indexOf(match.trim());
            }

            // Fallback 2: Normalize whitespace (basic)
            if (idx === -1) {
                const normalize = (s) => s.replace(/\s+/g, ' ').trim();
                const cleanMatch = normalize(match);
                // This is expensive for large docs, but okay for this prototype
                // We'll search chunks if needed, but here simple scan:
                // We can't easily find index of normalized string in raw string without mapping.
                // Alternative: Fuzzy Match or ignore logic.
                // Let's try getting the section content if possible?
                // Just logging failure for now if exact match fails, but provide detailed warning.
            }

            if (idx !== -1) {
                startIndex = idx;
                // Create an anchor where we want to start
                anchorRelPos = Y.createRelativePositionFromTypeIndex(ytext, idx);
                found = true;
            }
        }, agentId);

        if (!found) {
             console.log(`Could not find match for replacement: "${match.slice(0,10)}..."`);
             continue;
        }

        // Show cursor at deletion point
        updateAICursor(agentId, startIndex, color, name);
        await wait(300); // Pause before deleting
        
        log(`${name} removing old text...`, "info");
        
        // Delete character by character (backwards for visual effect)
        for (let i = match.length - 1; i >= 0; i--) {
            ydoc.transact(() => {
                const absPos = Y.createAbsolutePositionFromRelativePosition(anchorRelPos, ydoc);
                if (absPos) {
                    ytext.delete(absPos.index, 1);
                    updateAICursor(agentId, absPos.index, color, name);
                }
            }, agentId);
            await wait(30); // Slow deletion
        }

        log(`${name} rewriting...`, "info");
        
        const currentChangeId = `ch-${agentId}-${Math.random().toString(36).substr(2,9)}`;
        changeHistory.set(currentChangeId, {
             agentId: agentId,
             before: match,
             after: replacement,
             timestamp: Date.now()
        });
        
        // 2. Slow Character-by-Character Typing (VISIBLE AGENT WORK)
        log(`${name} typing replacement...`, "info");
        
        // Type character by character with visible cursor and highlighting
        let currentPos = Y.createAbsolutePositionFromRelativePosition(anchorRelPos, ydoc);
        
        for (let i = 0; i < replacement.length; i++) {
            const char = replacement[i];
            
            // Update cursor position to show where agent is typing
            if (currentPos) {
                updateAICursor(agentId, currentPos.index, color, name);
            }
            
            // Insert one character at a time with agent attribution
            ydoc.transact(() => {
                const absPos = Y.createAbsolutePositionFromRelativePosition(anchorRelPos, ydoc);
                if (absPos) {
                    ytext.insert(absPos.index, char, { 
                        'agent-id': agentId,
                        'change-id': currentChangeId 
                    });
                    
                    // Move anchor forward
                    anchorRelPos = Y.createRelativePositionFromTypeIndex(ytext, absPos.index + 1);
                    currentPos = Y.createAbsolutePositionFromRelativePosition(anchorRelPos, ydoc);
                }
            }, agentId);
            
            // Slow typing speed - adjust this value to make it faster/slower
            // 50ms = readable typing speed, 100ms = very slow, 20ms = fast
            await wait(50);
        }
        
        // Final cursor update
        const finalPos = Y.createAbsolutePositionFromRelativePosition(anchorRelPos, ydoc);
        if (finalPos) {
            updateAICursor(agentId, finalPos.index, color, name);
        }
        
        log(`${name} completed replacement`, "success");
    }
}

// Clear Agents Button Logic
const clearBtn = document.getElementById('btn-clear-agents');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    // Clear Yjs map
    activeAgents.forEach((_, id) => {
      removeAICursor(id);
    });
    activeAgents.clear();
    
    // Clear change history so new agents start fresh
    changeHistory.clear();
    
    // Clear highlight styles
    const oldStyle = document.getElementById('agent-highlight-style');
    if (oldStyle) oldStyle.remove();
    highlightedAgentId = null; // Reset global tracking var

    log('Cleared agent activity history.', 'info');
  });
}
