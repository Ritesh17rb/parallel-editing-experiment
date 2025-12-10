import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { demoScenarios, agentConfigurations } from './demo-documents.js';

// Register Cursors Module
Quill.register('modules/cursors', QuillCursors);

// ===== GLOBAL STATE =====
let currentScenario = null;
let activeAgents = new Map(); // Track active agents
let userIsTyping = false;
let lastUserActivity = Date.now();

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
  signaling: ['wss://signaling-server-2s0k.onrender.com']
});

provider.on('status', event => {
  if (event.connected) log('Connected to collaboration server', 'success');
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
  welcomeModal.show();
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
  document.getElementById('user-count').innerText = provider.awareness.getStates().size;
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

// Track user typing activity
editor.on('text-change', (delta, oldDelta, source) => {
  if (source === 'user') {
    userIsTyping = true;
    lastUserActivity = Date.now();
    
    // Reset typing flag after 1 second of inactivity
    setTimeout(() => {
      if (Date.now() - lastUserActivity >= 1000) {
        userIsTyping = false;
      }
    }, 1000);
  }
});

// ===== DEMO CARDS INITIALIZATION =====
function initializeDemoCards() {
  const container = document.getElementById('demo-cards-container');
  
  Object.entries(demoScenarios).forEach(([key, scenario]) => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="demo-card card h-100 p-3" data-scenario="${key}">
        <div class="d-flex align-items-center mb-2">
          <i class="bi ${scenario.icon} fs-3 text-primary me-3"></i>
          <div>
            <h6 class="mb-0">${scenario.title}</h6>
            <small class="text-muted">${scenario.description}</small>
          </div>
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
function loadScenario(scenarioKey) {
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
  
  if (!prompts || prompts.length === 0) {
    container.innerHTML = '';
    return;
  }
  
  container.innerHTML = `
    <hr>
    <small class="text-muted fw-bold d-block mb-2">
      <i class="bi bi-lightbulb me-1"></i>Sample Prompts (Click to use)
    </small>
  `;
  
  prompts.forEach(prompt => {
    const promptEl = document.createElement('div');
    promptEl.className = 'sample-prompt p-2 mb-2 bg-body rounded';
    promptEl.innerHTML = `
      <div class="fw-bold small">${prompt.text}</div>
      <div class="text-muted" style="font-size: 0.75rem;">${prompt.description}</div>
    `;
    
    promptEl.addEventListener('click', () => {
      document.getElementById('custom-prompt').value = prompt.text;
      triggerMultiAgentAI();
    });
    
    container.appendChild(promptEl);
  });
}

// ===== AGENT ACTIVITY UI =====
function updateAgentActivity() {
  const container = document.getElementById('agent-activity-container');
  const countBadge = document.getElementById('active-agents-count');
  
  if (activeAgents.size === 0) {
    container.innerHTML = '<p class="text-muted text-center small mb-0">No agents currently working</p>';
    countBadge.textContent = '0 Active';
    return;
  }
  
  countBadge.textContent = `${activeAgents.size} Active`;
  container.innerHTML = '';
  
  activeAgents.forEach((agent, agentId) => {
    const agentEl = document.createElement('div');
    agentEl.className = 'agent-item p-2 mb-2 bg-body rounded working';
    agentEl.style.borderLeftColor = agent.color;
    agentEl.innerHTML = `
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <span class="agent-status-dot" style="background-color: ${agent.color};"></span>
          <strong class="small">${agent.name}</strong>
        </div>
        <span class="badge bg-primary-subtle text-primary">${agent.status}</span>
      </div>
      <div class="small text-muted mt-1">
        <i class="bi bi-geo-alt me-1"></i>${agent.section}
      </div>
      <div class="small text-muted">
        <i class="bi bi-list-task me-1"></i>${agent.task}
      </div>
    `;
    
    container.appendChild(agentEl);
  });
}

function addAgent(agentConfig) {
  activeAgents.set(agentConfig.id, {
    ...agentConfig,
    status: 'Working'
  });
  updateAgentActivity();
}

function removeAgent(agentId) {
  activeAgents.delete(agentId);
  updateAgentActivity();
}

function updateAgentStatus(agentId, status) {
  if (activeAgents.has(agentId)) {
    activeAgents.get(agentId).status = status;
    updateAgentActivity();
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
}

function removeAICursor(agentId) {
  aiCursors.delete(agentId);
}

// Listen for AI cursor updates
aiCursors.observe(() => {
  const cursorsModule = editor.getModule('cursors');
  
  aiCursors.forEach((cursorData, agentId) => {
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

  if (!apiKey) {
    log('⚠ No API Key. Simulating AI typing...', 'info');
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
    
    // Get agent-specific text or use default
    const agentId = messages[0]?.content?.match(/You are (\S+)/)?.[1] || 'agent';
    const mock = mockTexts[agentId] || ' [AI-generated improvement text] ';
    
    for (const char of mock.split('')) {
      await new Promise(r => setTimeout(r, 40));
      onChunk(char);
    }
    return;
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ 
        model: 'gpt-4o-mini', 
        messages, 
        stream: true,
        temperature: 0.7
      })
    });

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
    log("AI Error: " + e.message, 'error');
  }
}

// ===== SINGLE AGENT EXECUTION =====
async function runSingleAgent(agentConfig) {
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
  await callLLM(messages, async (chunk) => {
    // If user is typing, wait briefly instead of skipping
    while (userIsTyping) {
      await new Promise(r => setTimeout(r, 100));
    }
    
    ydoc.transact(() => {
      ytext.insert(currentIndex, chunk);
      currentIndex += chunk.length;
      updateAICursor(agentConfig.id, currentIndex, agentConfig.color, agentConfig.name);
    });
  });
  
  // Cleanup
  removeAICursor(agentConfig.id);
  removeAgent(agentConfig.id);
  log(`${agentConfig.name} completed work`, 'success');
}

// ===== INDEPENDENT AGENT EXECUTION =====
async function runAutonomousAgent(agentConfig) {
  addAgent(agentConfig);
  log(`${agentConfig.name} started working on ${agentConfig.section}`, 'info');
  
  // Find the section in the document
  const section = findSectionInDocument(agentConfig.section);
  
  if (!section || section.text.length < 10) {
    log(`⚠️ ${agentConfig.name}: Section "${agentConfig.section}" not found or too short, skipping`, 'error');
    removeAgent(agentConfig.id);
    return;
  }
  
  // Create relative positions to track section boundaries robustly
  // This ensures that if other agents modify the document earlier, these positions shift accordingly
  const startRel = Y.createRelativePositionFromTypeIndex(ytext, section.start);
  const endRel = Y.createRelativePositionFromTypeIndex(ytext, section.end);

  const prompt = `You are ${agentConfig.name}, a specialized AI agent.
YOUR SPECIFIC TASK: ${agentConfig.task}

SECTION TO IMPROVE (${agentConfig.section}):
"""
${section.text.substring(0, 1500)}
"""

INSTRUCTIONS:
1. Focus ONLY on your assigned section
2. Make specific, meaningful improvements
3. Write clear, professional text
4. Do NOT add meta-commentary or explanations
5. Provide ONLY the improved text for this section.`;

  const messages = [{ role: 'user', content: prompt }];
  
  updateAgentStatus(agentConfig.id, 'Analyzing');
  
  // Minimal random delay to prevent instantaneous API rate limiting if many agents start exactly at once
  await new Promise(r => setTimeout(r, Math.random() * 200));
  
  updateAgentStatus(agentConfig.id, 'Writing');
  
  // Delete the old content first, using safe relative positioning
  ydoc.transact(() => {
    const startAbs = Y.createAbsolutePositionFromRelativePosition(startRel, ydoc);
    const endAbs = Y.createAbsolutePositionFromRelativePosition(endRel, ydoc);
    
    if (startAbs && endAbs) {
      const len = endAbs.index - startAbs.index;
      if (len > 0) {
        ytext.delete(startAbs.index, len);
      }
    }
  });

  // Track insertion point using a relative position that updates as we write
  let currentRelPos = startRel;

  try {
    await callLLM(messages, async (chunk) => {
      // If user is typing, wait briefly instead of skipping
      while (userIsTyping) {
        await new Promise(r => setTimeout(r, 100));
      }
      
      ydoc.transact(() => {
        // Resolve current insertion point
        const absPos = Y.createAbsolutePositionFromRelativePosition(currentRelPos, ydoc);
        
        if (absPos) {
          ytext.insert(absPos.index, chunk);
          
          // Update tracking position to end of inserted chunk
          currentRelPos = Y.createRelativePositionFromTypeIndex(ytext, absPos.index + chunk.length);
          
          // Visual cursor update
          updateAICursor(agentConfig.id, absPos.index + chunk.length, agentConfig.color, agentConfig.name);
        }
      });
    });
    
    log(`${agentConfig.name} completed work`, 'success');
  } catch (error) {
    log(`${agentConfig.name} encountered error: ${error.message}`, 'error');
  }
  
  // Cleanup
  removeAICursor(agentConfig.id);
  removeAgent(agentConfig.id);
}

// ===== PARALLEL MULTI-AGENT EXECUTION =====
async function triggerMultiAgentAI() {
  if (!currentScenario) {
    log('Please load a demo scenario first!', 'error');
    return;
  }
  
  const instruction = document.getElementById('custom-prompt').value;
  // Instruction is used globally or just passed? 
  // In the new simplified model, agents just follow their specialized tasks, 
  // but we could append the user instruction to their prompt if desired.
  // For now, adhering to user request to specific "agents not behaving properly", 
  // we will rely on their config task, but maybe valid to append user instruction.
  
  const agents = agentConfigurations[currentScenario];
  if (!agents || agents.length === 0) {
    log('No agents configured for this scenario', 'error');
    return;
  }
  
  log(`🚀 Launching ${agents.length} agents simultaneously...`, 'success');
  
  // Hide parent agent UI if it was visible
  document.getElementById('parent-agent-card').style.display = 'none';
  
  // Run all agents in parallel
  const agentPromises = agents.map(agent => runAutonomousAgent(agent));
  
  await Promise.all(agentPromises);
  
  log('✨ All agents finished!', 'success');
}

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
  // Check if we should use multi-agent or single agent
  if (currentScenario && agentConfigurations[currentScenario]) {
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

// LLM Config
document.getElementById('save-llm-config').onclick = () => {
  localStorage.setItem('llm_api_key', document.getElementById('llm-api-key').value);
  localStorage.setItem('llm_url', document.getElementById('llm-url').value);
  bootstrap.Modal.getInstance(document.getElementById('llmConfigModal')).hide();
  log("Settings saved", 'success');
};

document.getElementById('llm-api-key').value = localStorage.getItem('llm_api_key') || '';
document.getElementById('llm-url').value = localStorage.getItem('llm_url') || '';