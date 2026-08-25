<script setup>
import { store, addPerson, removePerson } from '../store.js'

function selectPerson(id) {
  store.activePersonId = id
}

function confirmRemove(person) {
  if (confirm(`Remove ${person.name || 'this profile'}? This can't be undone.`)) {
    removePerson(person.id)
  }
}

function handleAdd() {
  addPerson()
}
</script>

<template>
  <div class="tabs">
    <div class="tabs__scroller">
      <button
        v-for="person in store.people"
        :key="person.id"
        class="tab"
        :class="{ 'tab--active': person.id === store.activePersonId }"
        @click="selectPerson(person.id)"
      >
        <span class="tab__name">{{ person.name || 'Unnamed' }}</span>
        <span class="tab__close" title="Remove profile" @click.stop="confirmRemove(person)">&times;</span>
      </button>
    </div>
    <button class="tab tab--add" @click="handleAdd">+ Add person</button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid var(--cgi-grey-light);
  padding: 0 1.5rem;
  overflow: hidden;
}

.tabs__scroller {
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  flex: 1;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  border: none;
  background: transparent;
  color: var(--cgi-grey-dark);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.tab:hover {
  color: var(--cgi-black);
  background: var(--cgi-grey-pale);
}

.tab--active {
  color: var(--cgi-red);
  border-bottom-color: var(--cgi-red);
}

.tab__close {
  color: var(--cgi-grey);
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0 0.15rem;
  border-radius: 3px;
}

.tab__close:hover {
  color: var(--cgi-white);
  background: var(--cgi-red);
}

.tab--add {
  color: var(--cgi-purple);
  border: none;
  flex-shrink: 0;
}

.tab--add:hover {
  color: var(--cgi-white);
  background: var(--cgi-purple);
}
</style>
