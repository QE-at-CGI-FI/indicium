<script setup>
import { computed } from 'vue'
import { store, isCriterionHidden, minSalaryForLevel } from '../store.js'

const visibleCriteria = computed(() =>
  store.criteria.filter((c) => !isCriterionHidden(c.label, store.anonymize))
)

const rows = computed(() => {
  const metaRows = [
    { label: 'Role', get: (p) => p.title },
    { label: 'Level', get: (p) => p.level },
    { label: 'Min. salary', get: (p) => minSalaryForLevel(p.level) },
  ]
  const criterionRows = visibleCriteria.value.map((c) => ({
    label: c.label,
    get: (p) => p.values[c.id],
  }))
  return [...metaRows, ...criterionRows].filter((row) =>
    store.people.some((p) => row.get(p))
  )
})

function shorten(label, max = 24) {
  return label.length > max ? `${label.slice(0, max - 1).trimEnd()}…` : label
}
</script>

<template>
  <div class="print-report">
    <header class="print-report__header">
      <h1>Indicium — career level report</h1>
      <p>{{ new Date().toLocaleDateString() }}</p>
    </header>

    <p v-if="!store.people.length">No profiles yet.</p>

    <table v-else class="print-table">
      <thead>
        <tr>
          <th class="print-table__corner">Criterion</th>
          <th v-for="person in store.people" :key="person.id">
            {{ person.name || 'Unnamed' }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.label">
          <th :title="row.label">{{ shorten(row.label) }}</th>
          <td v-for="person in store.people" :key="person.id">{{ row.get(person) || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.print-report {
  color: #000;
  background: #fff;
}

.print-report__header {
  margin-bottom: 1rem;
  border-bottom: 2px solid #000;
  padding-bottom: 0.5rem;
}

.print-report__header h1 {
  margin: 0;
  font-size: 1.3rem;
}

.print-report__header p {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: #444;
}

.print-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
  table-layout: fixed;
}

.print-table th,
.print-table td {
  text-align: left;
  vertical-align: top;
  padding: 0.3rem 0.5rem;
  border: 1px solid #ccc;
  overflow-wrap: break-word;
}

.print-table thead th {
  background: #f0f0f0;
  font-weight: 700;
  border-bottom: 2px solid #000;
}

.print-table tbody th {
  width: 12%;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #fafafa;
}

.print-table tbody tr {
  break-inside: avoid;
}
</style>
