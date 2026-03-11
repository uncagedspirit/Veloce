const LEAD_KEY        = 'veloce_lead_draft';
const QUESTIONNAIRE_KEY = 'veloce_questionnaire_draft';

export const DraftManager = {
  saveLead(data) {
    try {
      localStorage.setItem(LEAD_KEY, JSON.stringify({ ...data, _savedAt: Date.now() }));
    } catch (e) {
      console.error('[DraftManager] saveLead failed:', e);
    }
  },

  loadLead() {
    try {
      const raw = localStorage.getItem(LEAD_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveQuestionnaire(data) {
    try {
      localStorage.setItem(QUESTIONNAIRE_KEY, JSON.stringify({ ...data, _savedAt: Date.now() }));
    } catch (e) {
      console.error('[DraftManager] saveQuestionnaire failed:', e);
    }
  },

  loadQuestionnaire() {
    try {
      const raw = localStorage.getItem(QUESTIONNAIRE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  clear() {
    localStorage.removeItem(LEAD_KEY);
    localStorage.removeItem(QUESTIONNAIRE_KEY);
  },

  hasDraft() {
    return !!(localStorage.getItem(LEAD_KEY));
  },

  getLeadId() {
    const lead = this.loadLead();
    return lead?._id || null;
  },

  getLeadStep() {
    const lead = this.loadLead();
    return lead?._step || 0;
  },
};