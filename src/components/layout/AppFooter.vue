<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="container app-footer__inner">
      <div class="app-footer__brand">
        <span class="app-footer__logo" aria-hidden="true">♡</span>
        <span>Digital Memory Box</span>
      </div>
      <p class="app-footer__tagline">
        Kapsul waktu digital untuk menyimpan perjalanan hati kita.
      </p>
      <p class="app-footer__copy">
        &copy; {{ year }} · Dibuat dengan hati untuk pasangan &amp; diri sendiri.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  margin-top: var(--space-20);
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  padding-block: var(--space-12);
}

.app-footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-3);
}

.app-footer__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-weight: var(--fw-bold);
  font-size: var(--fs-lg);
  color: var(--text);
}

.app-footer__logo {
  color: var(--brand);
  font-size: var(--fs-xl);
}

.app-footer__tagline {
  color: var(--text-muted);
  font-size: var(--fs-sm);
  max-width: 48ch;
  margin: 0;
}

.app-footer__copy {
  color: var(--text-subtle);
  font-size: var(--fs-xs);
  margin: 0;
}

@media (max-width: 400px) {
  .app-footer {
    margin-top: var(--space-12);
    padding-block: var(--space-8);
  }
}
</style>
