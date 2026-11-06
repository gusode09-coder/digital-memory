/* Vuex store — memories (including user-uploaded via AddMemoryModal) */
import { createStore } from 'vuex';
import { items as initialItems } from '../data/items.js';

const STORAGE_KEY = 'dmb_memories';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function persist(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  } catch {
    /* storage may be full or unavailable — ignore */
  }
}

export default createStore({
  state() {
    const stored = loadFromStorage();
    return {
      items: stored ? stored : [...initialItems],
    };
  },
  getters: {
    allItems: (state) => state.items,
    itemBySlug: (state) => (slug) =>
      state.items.find((item) => item.slug === slug),
    itemById: (state) => (id) =>
      state.items.find((item) => item.id === id),
    highlightItems: (state) => {
      const pickOrder = ['First Times', 'Milestones', 'Travel'];
      const seen = new Set();
      const result = [];
      for (const cat of pickOrder) {
        const found = state.items.find(
          (i) => i.category === cat && !seen.has(i.id)
        );
        if (found) {
          seen.add(found.id);
          result.push(found);
        }
      }
      if (result.length < 3) {
        for (const item of state.items) {
          if (!seen.has(item.id)) {
            seen.add(item.id);
            result.push(item);
            if (result.length >= 3) break;
          }
        }
      }
      return result.slice(0, 3);
    },
  },
  mutations: {
    ADD_MEMORY(state, memory) {
      state.items.unshift(memory);
      persist(state);
    },
    RESET_MEMORIES(state) {
      state.items = [...initialItems];
      persist(state);
    },
  },
  actions: {
    addMemory({ commit }, memory) {
      commit('ADD_MEMORY', memory);
    },
    resetMemories({ commit }) {
      commit('RESET_MEMORIES');
    },
  },
});
