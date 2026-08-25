<script setup>
import { store, setLevelSalary } from '../store.js'

const emit = defineEmits(['close'])
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="panel">
      <div class="panel__header">
        <h2>Career levels &amp; minimum salaries</h2>
        <button class="icon-btn" title="Close" @click="emit('close')">&times;</button>
      </div>
      <p class="panel__hint">
        Set a minimum salary for each level. A person's profile shows the figure for
        their current level.
      </p>
      <ul class="levels-list">
        <li v-for="entry in store.levels" :key="entry.level">
          <span class="levels-list__level">{{ entry.level }}</span>
          <input
            class="levels-list__input"
            type="text"
            placeholder="Minimum salary"
            :value="entry.minSalary"
            @change="setLevelSalary(entry.level, $event.target.value)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 4rem 1rem;
  z-index: 50;
}

.panel {
  background: var(--cgi-white);
  border-radius: 10px;
  width: min(420px, 100%);
  max-height: 80vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.panel__header h2 {
  margin: 0;
  font-size: 1.15rem;
  color: var(--cgi-black);
}

.panel__hint {
  color: var(--cgi-grey);
  font-size: 0.85rem;
  margin: 0 0 1rem;
}

.levels-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.levels-list li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.levels-list__level {
  flex: 0 0 1.75rem;
  text-align: center;
  font-weight: 700;
  color: var(--cgi-purple);
}

.levels-list__input {
  flex: 1;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--cgi-grey-light);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--cgi-white);
  color: var(--cgi-black);
}

.levels-list__input:focus {
  outline: 2px solid var(--cgi-purple);
  outline-offset: 1px;
}

.icon-btn {
  border: none;
  background: transparent;
  color: var(--cgi-grey);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
}

.icon-btn:hover {
  color: var(--cgi-white);
  background: var(--cgi-red);
}
</style>
