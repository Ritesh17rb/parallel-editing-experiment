import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';

// --- 0. CONFIG ---
const templates = {
  "MSA": `<h1 style="text-align: center;">MASTER SERVICES AGREEMENT</h1><p><strong>1. PARTIES.</strong> Agreement made between [Party A] and [Party B].</p>`,
  "NDA": `<h1 style="text-align: center;">NON-DISCLOSURE AGREEMENT</h1><p><strong>1. CONFIDENTIALITY.</strong> The parties agree to keep information secret.</p>`
};

function log(msg) {
  const logs = document.getElementById('logs');
  logs.innerHTML += `<div>> ${msg}</div>`;
  logs.scrollTop = logs.scrollHeight;
}

// --- 1. SETUP YJS ---
const ydoc = new Y.Doc();
const ytext = ydoc.getText('quill');

// Room setup
const urlParams = new URLSearchParams(window.location.search);
let roomName = urlParams.get('room');
if (!roomName) {
    roomName = 'doc-' + Math.random().toString(36).substring(2, 7);
    window.history.replaceState({}, '', `?room=${roomName}`);
}

// Persistence (Offline Support)
const persistence = new IndexeddbPersistence(roomName, ydoc);
persistence.on('synced', () => log('Local storage loaded.'));

// Network (WebRTC) - ONLY ONE PROVIDER PER ROOM
const provider = new WebrtcProvider(roomName, ydoc, {
    signaling: [
        'wss://signaling-server-2s0k.onrender.com',       // Run "npx y-webrtc-signaling" locally for best results
        'wss://y-webrtc.fly.dev',    // Public backup
        'wss://signaling.yjs.dev'    // Official backup
    ]
});

provider.on('status', event => {
    if(event.connected) log('Connected to collaboration server.');
    else log('Connecting to peers...');
});

// Awareness
const COLORS = ['#958DF1', '#F98181', '#FBBC88', '#FAF594'];
provider.awareness.setLocalStateField('user', {
    name: 'User ' + Math.floor(Math.random() * 100),
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
});

provider.awareness.on('change', () => {
    document.getElementById('user-count').innerText = provider.awareness.getStates().size;
});

// --- 2. EDITOR SETUP ---
const editor = new Quill('#editor-container', {
    theme: 'snow',
    modules: { toolbar: [['bold', 'italic'], [{ header: 1 }, { header: 2 }], ['clean']] },
    placeholder: 'Start typing...'
});

const binding = new QuillBinding(ytext, editor, provider.awareness);

// --- 3. AI LOGIC (PARALLEL EDITING) ---

async function callLLM(messages, onChunk) {
    const apiKey = localStorage.getItem('llm_api_key');
    const baseUrl = localStorage.getItem('llm_url') || 'https://api.openai.com/v1';

    if (!apiKey) {
        log('⚠ No API Key. Simulating AI typing...');
        const mock = " This is simulated text because no API key was provided. Configure settings to use real AI. ";
        for (const char of mock.split('')) {
            await new Promise(r => setTimeout(r, 50));
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
                messages: messages,
                stream: true
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
                        if (content) onChunk(content);
                    } catch (e) {}
                }
            }
        }
    } catch (e) {
        log("AI Error: " + e.message);
    }
}

async function triggerAI() {
    const instruction = document.getElementById('custom-prompt').value;
    if (!instruction) return;

    const statusEl = document.getElementById('ai-status');
    statusEl.classList.remove('d-none');
    statusEl.innerText = "AI Writing...";
    
    // Determine insertion point
    const sel = editor.getSelection();
    let insertIndex = sel ? sel.index + sel.length : ytext.length;
    
    // Create an anchor so insertion point adjusts if you type while AI types
    let relPos = Y.createRelativePositionFromTypeIndex(ytext, insertIndex);

    const prompt = `You are a legal assistant. 
    Context: ${ytext.toString().slice(-500)}
    Instruction: ${instruction}
    Output: Only the new text clause to insert.`;

    await callLLM([{role: 'user', content: prompt}], (chunk) => {
        // Resolve anchor to current position
        const absPos = Y.createAbsolutePositionFromRelativePosition(relPos, ydoc);
        const currentPos = absPos ? absPos.index : ytext.length;

        ydoc.transact(() => {
            // Insert text with Green Highlight (Simulating AI Cursor)
            ytext.insert(currentPos, chunk, { background: '#e2f0d9' });
        });

        // Move anchor forward
        relPos = Y.createRelativePositionFromTypeIndex(ytext, currentPos + chunk.length);
    });

    statusEl.innerText = "Done";
    setTimeout(() => statusEl.classList.add('d-none'), 2000);
}

// --- 4. EVENT LISTENERS ---

document.getElementById('btn-trigger').addEventListener('click', triggerAI);

document.querySelectorAll('.template-btn').forEach(btn => {
    btn.onclick = () => {
        const type = btn.getAttribute('data-template');
        editor.clipboard.dangerouslyPasteHTML(editor.getLength(), templates[type]);
    };
});

// Config Logic
document.getElementById('save-llm-config').onclick = () => {
    localStorage.setItem('llm_api_key', document.getElementById('llm-api-key').value);
    localStorage.setItem('llm_url', document.getElementById('llm-url').value);
    bootstrap.Modal.getInstance(document.getElementById('llmConfigModal')).hide();
    log("Settings saved.");
};

// Load saved config
document.getElementById('llm-api-key').value = localStorage.getItem('llm_api_key') || '';