// Agent Manager - Handles agent lifecycle and coordination
export class AgentManager {
    constructor() {
        this.agents = new Map();
        this.activeAgentIds = new Set();
        this.isAnyAgentWorking = false;
    }

    spawnAgent(agentConfig) {
        const id = agentConfig.id || `agent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        agentConfig.id = id;
        
        this.agents.set(id, {
            ...agentConfig,
            status: 'queued',
            startTime: Date.now(),
            logs: []
        });
        
        this.activeAgentIds.add(id);
        this.isAnyAgentWorking = true;
        
        return id;
    }

    updateAgentStatus(id, status) {
        const agent = this.agents.get(id);
        if (agent) {
            agent.status = status;
            agent.lastUpdate = Date.now();
        }
    }

    addAgentLog(id, message) {
        const agent = this.agents.get(id);
        if (agent) {
            agent.logs.push({
                timestamp: Date.now(),
                message
            });
        }
    }

    completeAgent(id) {
        this.activeAgentIds.delete(id);
        const agent = this.agents.get(id);
        if (agent) {
            agent.status = 'completed';
            agent.endTime = Date.now();
        }
        
        if (this.activeAgentIds.size === 0) {
            this.isAnyAgentWorking = false;
        }
    }

    failAgent(id, error) {
        this.activeAgentIds.delete(id);
        const agent = this.agents.get(id);
        if (agent) {
            agent.status = 'failed';
            agent.error = error;
            agent.endTime = Date.now();
        }
        
        if (this.activeAgentIds.size === 0) {
            this.isAnyAgentWorking = false;
        }
    }

    isAgentActive(id) {
        return this.activeAgentIds.has(id);
    }

    getActiveCount() {
        return this.activeAgentIds.size;
    }

    clearCompleted() {
        const toRemove = [];
        this.agents.forEach((agent, id) => {
            if (agent.status === 'completed' || agent.status === 'failed') {
                if (Date.now() - agent.endTime > 30000) { // 30 seconds
                    toRemove.push(id);
                }
            }
        });
        toRemove.forEach(id => this.agents.delete(id));
    }
}
