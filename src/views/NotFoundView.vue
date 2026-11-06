<script setup>
import BaseButton from '../components/base/BaseButton.vue';
</script>

<template>
  <div class="not-found">
    <div class="container not-found__inner">
      <span class="not-found__code">404</span>
      <h1 class="not-found__title">Halaman ini belum tertulis</h1>
      <p class="not-found__message">
        Mungkin momen ini belum terjadi, atau mungkin alamatnya salah ketik.
        Yuk balik ke kotak kenangan.
      </p>
      <div class="not-found__actions">
        <BaseButton to="/" variant="primary" size="md">Ke Beranda</BaseButton>
        <BaseButton to="/explore" variant="outline" size="md">Ke Jelajah</BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - var(--header-h) - 200px);
  display: grid;
  place-items: center;
  padding-block: var(--space-20);
}

.not-found__inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  animation: fade-up var(--dur-slow) var(--ease-out) both;
}

.not-found__code {
  font-family: var(--font-display);
  font-size: clamp(4rem, 18vw, 8rem);
  font-weight: var(--fw-bold);
  line-height: 1;
  color: var(--brand);
  letter-spacing: -0.02em;
  text-shadow: 0 8px 24px var(--brand-soft);
}

.not-found__title {
  font-size: var(--fs-3xl);
  margin: 0;
}

.not-found__message {
  color: var(--text-muted);
  max-width: 44ch;
  margin: 0;
  font-size: var(--fs-lg);
}

.not-found__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
  margin-top: var(--space-4);
}

@media (max-width: 400px) {
  .not-found {
    padding-block: var(--space-12);
  }
  .not-found__title {
    font-size: var(--fs-xl);
  }
  .not-found__message {
    font-size: var(--fs-base);
  }
}
</style>
