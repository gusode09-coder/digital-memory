<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFavoritesStore } from '../../stores/useFavoritesStore';

const route = useRoute();
const favorites = useFavoritesStore();

const mobileOpen = ref(false);

function closeMobile() {
  mobileOpen.value = false;
}

const navLinks = [
  { name: 'home', to: '/', label: 'Beranda' },
  { name: 'explore', to: '/explore', label: 'Jelajah' },
  { name: 'about', to: '/about', label: 'Kisah Kita' },
];
</script>

<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <router-link to="/" class="app-header__brand" @click="closeMobile">
        <span class="app-header__logo" aria-hidden="true">♡</span>
        <span class="app-header__brand-text">Memory Box</span>
      </router-link>

      <nav class="app-header__nav" :class="{ 'app-header__nav--open': mobileOpen }">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          class="app-header__link"
          :class="{ 'app-header__link--active': route.name === link.name }"
          @click="closeMobile"
        >
          {{ link.label }}
        </router-link>

        <router-link
          to="/explore"
          class="app-header__fav"
          @click="closeMobile"
        >
          <span aria-hidden="true">★</span>
          <span>Favorit</span>
          <span class="app-header__fav-badge">{{ favorites.count }}</span>
        </router-link>
      </nav>

      <button
        class="app-header__toggle"
        :aria-expanded="mobileOpen"
        aria-label="Buka menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span :class="{ 'app-header__bar--open': mobileOpen }"></span>
        <span :class="{ 'app-header__bar--open': mobileOpen }"></span>
        <span :class="{ 'app-header__bar--open': mobileOpen }"></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: color-mix(in srgb, var(--bg-elevated) 92%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.app-header__inner {
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.app-header__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-weight: var(--fw-bold);
  font-size: var(--fs-xl);
  color: var(--text);
  text-decoration: none;
}

.app-header__logo {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--brand-soft);
  color: var(--brand);
  font-size: 1rem;
  transition: transform var(--dur) var(--ease);
}

.app-header__brand:hover .app-header__logo {
  transform: scale(1.1) rotate(-8deg);
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.app-header__link {
  font-family: var(--font-body);
  font-weight: var(--fw-medium);
  font-size: var(--fs-base);
  color: var(--text-muted);
  text-decoration: none;
  padding: var(--space-2) var(--space-1);
  position: relative;
  transition: color var(--dur) var(--ease);
}

.app-header__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--brand);
  border-radius: var(--radius-full);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease);
}

.app-header__link:hover,
.app-header__link--active {
  color: var(--brand);
}

.app-header__link--active::after,
.app-header__link:hover::after {
  transform: scaleX(1);
}

.app-header__fav {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background: var(--brand-soft);
  color: var(--brand);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-sm);
  text-decoration: none;
  transition: all var(--dur) var(--ease);
}

.app-header__fav:hover {
  background: var(--color-primary-100);
  transform: translateY(-1px);
}

.app-header__fav-badge {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: var(--radius-full);
  background: var(--brand);
  color: var(--brand-contrast);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.app-header__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: var(--space-2);
  background: transparent;
  border: none;
  cursor: pointer;
}

.app-header__toggle span {
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: var(--radius-full);
  transition: all var(--dur) var(--ease);
}

.app-header__bar--open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.app-header__bar--open:nth-child(2) {
  opacity: 0;
}
.app-header__bar--open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .app-header__nav {
    position: fixed;
    top: var(--header-h);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-1);
    padding: var(--space-4);
    background: var(--bg-elevated);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    transform: translateY(-120%);
    opacity: 0;
    pointer-events: none;
    transition: transform var(--dur) var(--ease), opacity var(--dur) var(--ease);
  }

  .app-header__nav--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .app-header__link {
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    font-size: var(--fs-lg);
  }

  .app-header__fav {
    justify-content: space-between;
    padding: var(--space-3) var(--space-4);
    margin-top: var(--space-2);
  }

  .app-header__toggle {
    display: flex;
  }
}

@media (max-width: 400px) {
  .app-header__brand-text {
    font-size: var(--fs-base);
  }
}
</style>
