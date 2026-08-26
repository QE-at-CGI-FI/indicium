<script setup>
import { computed, ref } from 'vue'
import { store, addPerson, removePerson } from '../store.js'

const UNASSIGNED = '__unassigned__'

const levelFilter = ref('')
const assignmentFilter = ref('')

const assignmentCriterion = computed(() =>
  store.criteria.find((c) => c.label.trim().toUpperCase() === 'ASSIGNMENT')
)

function assignmentValue(person) {
  const criterion = assignmentCriterion.value
  return (criterion ? person.values[criterion.id] : '') || ''
}

const levelOptions = computed(() => {
  const levels = new Set(
    store.people.map((p) => p.level).filter((v) => v !== '' && v !== null && v !== undefined)
  )
  return Array.from(levels).sort((a, b) => Number(a) - Number(b))
})

const assignmentOptions = computed(() => {
  const values = new Set(
    store.people.map((p) => assignmentValue(p).trim()).filter((v) => v !== '')
  )
  return Array.from(values).sort((a, b) => a.localeCompare(b))
})

const hasActiveFilters = computed(() => levelFilter.value !== '' || assignmentFilter.value !== '')

const filteredPeople = computed(() =>
  store.people.filter((person) => {
    if (levelFilter.value !== '' && String(person.level) !== levelFilter.value) return false
    if (assignmentFilter.value !== '') {
      const value = assignmentValue(person).trim()
      if (assignmentFilter.value === UNASSIGNED) {
        if (value !== '') return false
      } else if (value !== assignmentFilter.value) {
        return false
      }
    }
    return true
  })
)

function clearFilters() {
  levelFilter.value = ''
  assignmentFilter.value = ''
}

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
    <div class="tabs__filters">
      <select v-model="levelFilter" class="tabs__filter" aria-label="Filter by level">
        <option value="">All levels</option>
        <option v-for="level in levelOptions" :key="level" :value="String(level)">
          Level {{ level }}
        </option>
      </select>
      <select v-model="assignmentFilter" class="tabs__filter" aria-label="Filter by assignment">
        <option value="">All assignments</option>
        <option :value="UNASSIGNED">Unassigned</option>
        <option v-for="assignment in assignmentOptions" :key="assignment" :value="assignment">
          {{ assignment }}
        </option>
      </select>
      <button v-if="hasActiveFilters" class="tabs__clear" @click="clearFilters">Clear filters</button>
    </div>
    <div class="tabs__scroller">
      <button
        v-for="person in filteredPeople"
        :key="person.id"
        class="tab"
        :class="{ 'tab--active': person.id === store.activePersonId }"
        @click="selectPerson(person.id)"
      >
        <span class="tab__name">{{ person.name || 'Unnamed' }}</span>
        <span class="tab__close" title="Remove profile" @click.stop="confirmRemove(person)">&times;</span>
      </button>
      <p v-if="!filteredPeople.length" class="tabs__empty">No profiles match the current filters.</p>
    </div>
    <button class="tab tab--add" @click="handleAdd">+ Add person</button>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 2px solid var(--cgi-grey-light);
  padding: 0 1.5rem;
  overflow: hidden;
  flex-wrap: wrap;
}

.tabs__filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  flex-shrink: 0;
}

.tabs__filter {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--cgi-grey-dark);
  border: 1px solid var(--cgi-grey-light);
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  background: var(--cgi-white);
  cursor: pointer;
}

.tabs__clear {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--cgi-purple);
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0.2rem 0.3rem;
  text-decoration: underline;
}

.tabs__empty {
  font-size: 0.85rem;
  color: var(--cgi-grey);
  padding: 0.65rem 0;
  margin: 0;
}

.tabs__scroller {
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  flex: 1;
  align-items: center;
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
