<script setup>
import { ref } from 'vue'
import { store, addCriterion, renameCriterion, removeCriterion } from '../store.js'

const emit = defineEmits(['close'])
const newLabel = ref('')

function handleAdd() {
  const label = newLabel.value.trim()
  if (!label) return
  addCriterion(label)
  newLabel.value = ''
}

function handleRemove(criterion) {
  if (confirm(`Remove "${criterion.label}"? This removes it from every profile.`)) {
    removeCriterion(criterion.id)
  }
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="panel">
      <div class="panel__header">
        <h2>Manage criteria</h2>
        <button class="icon-btn" title="Close" @click="emit('close')">&times;</button>
      </div>
      <p class="panel__hint">
        These criteria apply to every profile. Renaming keeps existing evidence; removing a
        criterion deletes it everywhere.
      </p>
      <ul class="criteria-list">
        <li v-for="criterion in store.criteria" :key="criterion.id">
          <input
            class="criteria-list__input"
            type="text"
            :value="criterion.label"
            @change="renameCriterion(criterion.id, $event.target.value)"
          />
          <button class="icon-btn" title="Remove criterion" @click="handleRemove(criterion)">&times;</button>
        </li>
      </ul>
      <form class="add-row" @submit.prevent="handleAdd">
        <input
          v-model="newLabel"
          type="text"
          placeholder="New criterion name"
        />
        <button type="submit" class="btn btn--purple">Add</button>
      </form>
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
  width: min(520px, 100%);
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

.criteria-list {
  list-style: none;
  margin: 0 0 1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.criteria-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.criteria-list__input {
  flex: 1;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--cgi-grey-light);
  border-radius: 6px;
  font-size: 0.9rem;
}

.criteria-list__input:focus {
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

.add-row {
  display: flex;
  gap: 0.5rem;
}

.add-row input {
  flex: 1;
  padding: 0.55rem 0.6rem;
  border: 1px solid var(--cgi-grey-light);
  border-radius: 6px;
  font-size: 0.9rem;
}

.add-row input:focus {
  outline: 2px solid var(--cgi-purple);
  outline-offset: 1px;
}
</style>
