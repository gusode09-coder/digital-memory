<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary | secondary | ghost | outline | danger
  },
  size: {
    type: String,
    default: 'md', // sm | md | lg
  },
  as: {
    type: String,
    default: 'button',
  },
  to: { type: String, default: null },
  block: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
});

const tag = computed(() => (props.to ? 'router-link' : props.as));
const isLink = computed(() => Boolean(props.to));
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :type="!isLink ? type : undefined"
    :disabled="!isLink ? disabled : undefined"
    class="base-btn"
    :class="[`base-btn--${variant}`, `base-btn--${size}`, { 'base-btn--block': block }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-weight: var(--fw-semibold);
  line-height: 1;
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--dur) var(--ease);
  white-space: nowrap;
  user-select: none;
}

.base-btn--sm {
  font-size: var(--fs-sm);
  padding: var(--space-2) var(--space-4);
}
.base-btn--md {
  font-size: var(--fs-base);
  padding: var(--space-3) var(--space-6);
}
.base-btn--lg {
  font-size: var(--fs-lg);
  padding: var(--space-4) var(--space-8);
}

/* Primary */
.base-btn--primary {
  background: var(--brand);
  color: var(--brand-contrast);
  box-shadow: var(--shadow-sm);
}
.base-btn--primary:hover:not(:disabled) {
  background: var(--brand-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.base-btn--primary:active:not(:disabled) {
  transform: translateY(0);
}

/* Secondary */
.base-btn--secondary {
  background: var(--color-secondary-500);
  color: var(--color-neutral-0);
  box-shadow: var(--shadow-sm);
}
.base-btn--secondary:hover:not(:disabled) {
  background: var(--color-secondary-600);
  transform: translateY(-1px);
}

/* Outline */
.base-btn--outline {
  background: transparent;
  color: var(--brand);
  border-color: var(--border-strong);
}
.base-btn--outline:hover:not(:disabled) {
  border-color: var(--brand);
  background: var(--brand-soft);
}

/* Ghost */
.base-btn--ghost {
  background: transparent;
  color: var(--text);
}
.base-btn--ghost:hover:not(:disabled) {
  background: var(--bg-muted);
}

/* Danger */
.base-btn--danger {
  background: var(--color-error-500);
  color: var(--color-neutral-0);
}
.base-btn--danger:hover:not(:disabled) {
  background: var(--color-error-600);
}

.base-btn--block {
  width: 100%;
}

.base-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (max-width: 400px) {
  .base-btn--lg {
    font-size: var(--fs-base);
    padding: var(--space-3) var(--space-6);
  }
}
</style>
