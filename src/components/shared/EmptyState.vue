<script setup>
defineProps({
  title: { type: String, default: 'Belum ada kenangan' },
  message: {
    type: String,
    default: 'Belum ada kenangan yang cocok dengan pencarianmu.',
  },
  icon: { type: String, default: 'empty' }, // empty | search | star
});
</script>

<template>
  <div class="empty-state">
    <div class="empty-state__icon" aria-hidden="true">
      <svg v-if="icon === 'search'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.5" y2="16.5" stroke-linecap="round" />
      </svg>
      <svg v-else-if="icon === 'star'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 2l3 6.5 7 .9-5 4.9 1.2 7L12 18l-6.2 3.3L7 14.3 2 9.4l7-.9z" stroke-linejoin="round" />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M9 3h6v3H9z" />
      </svg>
    </div>
    <h3 class="empty-state__title">{{ title }}</h3>
    <p class="empty-state__message">{{ message }}</p>
    <slot />
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-16) var(--space-6);
  gap: var(--space-3);
}

.empty-state__icon {
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-full);
  background: var(--brand-soft);
  color: var(--brand);
  margin-bottom: var(--space-2);
}

.empty-state__icon svg {
  width: 36px;
  height: 36px;
}

.empty-state__title {
  font-size: var(--fs-xl);
  margin: 0;
}

.empty-state__message {
  color: var(--text-muted);
  max-width: 42ch;
  margin: 0;
}

@media (max-width: 400px) {
  .empty-state {
    padding: var(--space-10) var(--space-4);
  }
  .empty-state__icon {
    width: 60px;
    height: 60px;
  }
  .empty-state__icon svg {
    width: 30px;
    height: 30px;
  }
}
</style>
