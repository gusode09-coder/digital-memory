<script setup>
defineProps({
  imageUrl: { type: String, required: true },
  title: { type: String, default: '' },
  caption: { type: String, default: '' },
  frameStyle: { type: String, default: 'classic' }, // classic | polaroid | wood
});
</script>

<template>
  <figure
    class="photo-frame"
    :class="`photo-frame--${frameStyle}`"
  >
    <div class="photo-frame__inner">
      <img
        :src="imageUrl"
        :alt="title || 'Kenangan'"
        class="photo-frame__img"
        loading="lazy"
      />
      <div class="photo-frame__glare" aria-hidden="true"></div>
    </div>
    <figcaption v-if="title || caption" class="photo-frame__caption">
      <span v-if="title" class="photo-frame__title">{{ title }}</span>
      <span v-if="caption" class="photo-frame__text">{{ caption }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.photo-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.photo-frame__inner {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: transform var(--dur-slow) var(--ease);
}

.photo-frame__inner:hover {
  transform: rotate(-1deg) scale(1.01);
}

.photo-frame__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-frame__glare {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 30%,
    rgba(255, 255, 255, 0.18) 45%,
    transparent 60%
  );
  pointer-events: none;
}

/* ---- Classic: thin gold border ---- */
.photo-frame--classic .photo-frame__inner {
  padding: 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
}
.photo-frame--classic .photo-frame__img {
  border: 2px solid var(--color-accent-300);
}

/* ---- Polaroid: white margin bottom ---- */
.photo-frame--polaroid {
  background: var(--color-neutral-0);
  padding: var(--space-4) var(--space-4) var(--space-8);
  box-shadow: var(--shadow-lg);
  transform: rotate(-1.5deg);
}
.photo-frame--polaroid .photo-frame__inner {
  max-width: none;
  box-shadow: none;
}
.photo-frame--polaroid .photo-frame__caption {
  position: static;
  text-align: center;
  margin-top: var(--space-3);
}
.photo-frame--polaroid:hover {
  transform: rotate(0deg) scale(1.01);
}

/* ---- Wood: warm dark frame ---- */
.photo-frame--wood .photo-frame__inner {
  padding: 18px;
  background: linear-gradient(135deg, #6b4a2b, #4a3018);
  border: 3px solid #2e1d0f;
}
.photo-frame--wood .photo-frame__img {
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.photo-frame__caption {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  margin-top: var(--space-4);
  text-align: center;
}

.photo-frame__title {
  font-family: var(--font-display);
  font-size: var(--fs-lg);
  font-weight: var(--fw-semibold);
  color: var(--text);
}

.photo-frame__text {
  font-family: var(--font-body);
  font-size: var(--fs-sm);
  color: var(--text-muted);
  font-style: italic;
  max-width: 36ch;
}

@media (max-width: 400px) {
  .photo-frame__inner {
    max-width: 100%;
  }
  .photo-frame--polaroid {
    padding: var(--space-3) var(--space-3) var(--space-6);
  }
}
</style>
