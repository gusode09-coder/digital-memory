<script setup>
const props = defineProps({
  as: { type: String, default: 'div' },
  hover: { type: Boolean, default: true },
  padding: { type: String, default: 'md' }, // none | sm | md | lg
});

const paddingClass = `base-card--pad-${props.padding}`;
</script>

<template>
  <component
    :is="as"
    class="base-card"
    :class="[paddingClass, { 'base-card--hover': hover }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease),
    border-color var(--dur) var(--ease);
}

.base-card--pad-none { padding: 0; }
.base-card--pad-sm { padding: var(--space-4); }
.base-card--pad-md { padding: var(--space-6); }
.base-card--pad-lg { padding: var(--space-8); }

.base-card--hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-strong);
}
</style>
