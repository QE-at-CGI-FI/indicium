<script setup>
import { computed, ref } from 'vue'
import { store, addPerson, exportData, importData } from './store.js'
import PersonTabs from './components/PersonTabs.vue'
import PersonProfile from './components/PersonProfile.vue'
import CriteriaManager from './components/CriteriaManager.vue'
import LevelsManager from './components/LevelsManager.vue'
import PrintReport from './components/PrintReport.vue'

const showCriteriaManager = ref(false)
const showLevelsManager = ref(false)
const fileInput = ref(null)

const activePerson = computed(() =>
  store.people.find((p) => p.id === store.activePersonId) || null
)

function handleExport() {
  const blob = new Blob([exportData()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  a.href = url
  a.download = `indicium-export-${date}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function printReport() {
  window.print()
}

function triggerImport() {
  fileInput.value?.click()
}

function handleImportFile(event) {
  const file = event.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      importData(reader.result)
    } catch (err) {
      alert(err.message || 'Could not import that file.')
    }
  }
  reader.readAsText(file)
  event.target.value = ''
}
</script>

<template>
  <div class="app">
    <div class="screen-only">
      <header class="app__header">
        <div class="app__brand">
          <img src="/logo.svg" alt="CGI" class="app__logo" />
          <div>
            <h1>Indicium</h1>
            <p class="app__tagline">
              Your career level is determined by evidence, not opinions.
            </p>
          </div>
        </div>
        <div class="app__actions">
          <label class="anonymize-toggle">
            <input type="checkbox" v-model="store.anonymize" />
            Anonymize
          </label>
          <button class="btn btn--ghost" @click="showCriteriaManager = true">Manage criteria</button>
          <button class="btn btn--ghost" @click="showLevelsManager = true">Manage levels</button>
          <button class="btn btn--ghost" @click="handleExport"><span class="btn__icon">↓</span> Export</button>
          <button class="btn btn--ghost" @click="triggerImport"><span class="btn__icon">↑</span> Import</button>
          <button class="btn btn--purple" @click="printReport">Print report</button>
          <input
            ref="fileInput"
            type="file"
            accept="application/json"
            class="visually-hidden"
            @change="handleImportFile"
          />
        </div>
      </header>

      <PersonTabs />

      <main class="app__main">
        <PersonProfile v-if="activePerson" :person="activePerson" :key="activePerson.id" />
        <div v-else class="empty-state">
          <h2>No profiles yet</h2>
          <p>Add a person to start collecting evidence against their career criteria.</p>
          <button class="btn btn--red" @click="addPerson()">+ Add person</button>
        </div>
      </main>

      <CriteriaManager v-if="showCriteriaManager" @close="showCriteriaManager = false" />
      <LevelsManager v-if="showLevelsManager" @close="showLevelsManager = false" />
    </div>

    <PrintReport class="print-only" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.print-only {
  display: none;
}

@media print {
  .screen-only {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  @page {
    size: landscape;
  }
}

.app__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
}

.app__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app__logo {
  height: 28px;
  width: auto;
}

.app__brand h1 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--cgi-black);
  letter-spacing: -0.01em;
}

.app__tagline {
  margin: 0.1rem 0 0;
  font-size: 0.8rem;
  color: var(--cgi-grey);
}

.app__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.anonymize-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--cgi-grey-dark);
  margin-right: 0.5rem;
  cursor: pointer;
}

.anonymize-toggle input {
  accent-color: var(--cgi-red);
  cursor: pointer;
}

.app__main {
  flex: 1;
}

.empty-state {
  padding: 4rem 1.5rem;
  text-align: center;
  color: var(--cgi-grey-dark);
}

.empty-state h2 {
  margin: 0 0 0.5rem;
  color: var(--cgi-black);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
