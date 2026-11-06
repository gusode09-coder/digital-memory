<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Cari kenangan...' },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});

function clear() {
  emit('update:modelValue', '');
}
</script>

<template>
  <div class="search-bar">
    <span class="search-bar__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.5" y2="16.5" stroke-linecap="round" />
      </svg>
    </span>
    <input
      v-model="value"
      type="text"
      class="search-bar__input"
      :placeholder="placeholder"
      aria-label="Cari kenangan"
    />
    <button
      v-if="value"
      class="search-bar__clear"
      type="button"
      aria-label="Hapus pencarian"
      @click="clear"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="6" y1="6" x2="18" y2="18" stroke-linecap="round" />
        <line x1="6" y1="18" x2="18" y2="6" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 480px;
  margin-inline: auto;
}

.search-bar__icon {
  position: absolute;
  left: var(--space-4);
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  color: var(--text-subtle);
  pointer-events: none;
}

.search-bar__icon svg {
  width: 100%;
  height: 100%;
}

.search-bar__input {
  width: 100%;
  padding: var(--space-3) var(--space-12) var(--space-3) var(--space-12);
  font-family: var(--font-body);
  font-size: var(--fs-base);
  color: var(--text);
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-full);
  transition: border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
}

.search-bar__input::placeholder {
  color: var(--text-subtle);
}

.search-bar__input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: var(--shadow-glow);
}

.search-bar__clear {
  position: absolute;
  right: var(--space-3);
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  color: var(--text-subtle);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background var(--dur) var(--ease), color var(--dur) var(--ease);
}

.search-bar__clear:hover {
  background: var(--bg-muted);
  color: var(--text);
}

.search-bar__clear svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 400px) {
  .search-bar__input {
    font-size: var(--fs-sm);
    padding: var(--space-3) var(--space-10) var(--space-3) var(--space-10);
  }
}
</style>
