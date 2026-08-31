import { reactive, watch } from 'vue'

export { requirementsForLevel, HAMEL_INTRO } from './levelRequirements.js'

const STORAGE_KEY = 'indicium-data'

const DEFAULT_CRITERIA_LABELS = [
  'Annual assessment',
  'Blended efficiency (->87)',
  'SCR',
  'Salary',
  'Career level (previous)',
  'Agentic ready',
  'Figures it out without instructions',
  'Can do good work in difficult environment',
  'Can change environment to succeed',
  'Value',
  'Width',
  'Mode',
  'Tools',
  'CV that works when you sleep',
  'Remote',
  'Access to learning culture in last 5 years',
  'Reuse',
  'Wants',
  'Assignment',
  'Assignment contact',
  'Assignment end date',
]

export const ANONYMIZED_CRITERIA_LABELS = ['SCR', 'ANNUAL ASSESSMENT', 'SALARY']

export function isCriterionHidden(label, anonymize) {
  return anonymize && ANONYMIZED_CRITERIA_LABELS.includes(label.trim().toUpperCase())
}

const MIGRATED_CRITERIA_LABELS = [
  'Annual assessment',
  'Salary',
  'Assignment',
  'Assignment contact',
  'Assignment end date',
]

function uid() {
  return crypto.randomUUID()
}

function findCriterionIndex(criteria, label) {
  return criteria.findIndex((c) => c.label.trim().toUpperCase() === label.toUpperCase())
}

function moveCriterionToStart(criteria, label) {
  const idx = findCriterionIndex(criteria, label)
  if (idx > 0) criteria.unshift(criteria.splice(idx, 1)[0])
}

function moveCriterionAfter(criteria, label, afterLabel) {
  const targetIdx = findCriterionIndex(criteria, label)
  const afterIdx = findCriterionIndex(criteria, afterLabel)
  if (targetIdx === -1 || afterIdx === -1) return
  const desiredIdx = afterIdx + 1
  if (targetIdx === desiredIdx) return
  const [entry] = criteria.splice(targetIdx, 1)
  criteria.splice(targetIdx < desiredIdx ? desiredIdx - 1 : desiredIdx, 0, entry)
}

function defaultCriteria() {
  return DEFAULT_CRITERIA_LABELS.map((label) => ({ id: uid(), label }))
}

function defaultLevels() {
  return Array.from({ length: 14 }, (_, i) => ({ level: i + 1, minSalary: '' }))
}

function migrate(parsed) {
  if (!Array.isArray(parsed.levels)) parsed.levels = defaultLevels()
  if (typeof parsed.anonymize !== 'boolean') parsed.anonymize = true

  MIGRATED_CRITERIA_LABELS.forEach((label) => {
    const exists = parsed.criteria.some(
      (c) => c.label.trim().toUpperCase() === label.toUpperCase()
    )
    if (!exists) parsed.criteria.push({ id: uid(), label })
  })
  moveCriterionToStart(parsed.criteria, 'Annual assessment')
  moveCriterionAfter(parsed.criteria, 'Blended efficiency (->87)', 'Annual assessment')
  moveCriterionAfter(parsed.criteria, 'Salary', 'SCR')
  moveCriterionAfter(parsed.criteria, 'Width', 'Value')

  const salaryCriterionId = parsed.criteria.find(
    (c) => c.label.trim().toUpperCase() === 'SALARY'
  )?.id
  if (salaryCriterionId) {
    parsed.people.forEach((p) => {
      if (p.salary && !p.values[salaryCriterionId]) {
        p.values[salaryCriterionId] = p.salary
      }
      delete p.salary
    })
  }

  return parsed
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.criteria) && Array.isArray(parsed.people)) {
        return migrate(parsed)
      }
    } catch (e) {
      console.warn('Failed to parse stored Indicium data, starting fresh.', e)
    }
  }
  return {
    criteria: defaultCriteria(),
    people: [],
    activePersonId: null,
    levels: defaultLevels(),
    anonymize: true,
  }
}

export const store = reactive(load())

watch(
  store,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

export function addPerson(name = 'New person') {
  const person = { id: uid(), name, title: '', level: '', values: {} }
  store.people.push(person)
  store.activePersonId = person.id
  return person
}

export function removePerson(id) {
  const idx = store.people.findIndex((p) => p.id === id)
  if (idx === -1) return
  store.people.splice(idx, 1)
  if (store.activePersonId === id) {
    store.activePersonId = store.people[0]?.id ?? null
  }
}

export function addCriterion(label = 'New criterion') {
  store.criteria.push({ id: uid(), label })
}

export function renameCriterion(id, label) {
  const criterion = store.criteria.find((c) => c.id === id)
  if (criterion) criterion.label = label
}

export function removeCriterion(id) {
  const idx = store.criteria.findIndex((c) => c.id === id)
  if (idx === -1) return
  store.criteria.splice(idx, 1)
  store.people.forEach((p) => delete p.values[id])
}

export function setLevelSalary(level, minSalary) {
  const entry = store.levels.find((l) => l.level === level)
  if (entry) entry.minSalary = minSalary
}

export function minSalaryForLevel(level) {
  const lvl = Number(level)
  if (!lvl) return null
  return store.levels.find((l) => l.level === lvl)?.minSalary || null
}

export function exportData() {
  return JSON.stringify(store, null, 2)
}

export function importData(json) {
  const parsed = JSON.parse(json)
  if (!parsed || !Array.isArray(parsed.criteria) || !Array.isArray(parsed.people)) {
    throw new Error('That file does not look like an Indicium export.')
  }
  migrate(parsed)
  store.criteria = parsed.criteria
  store.people = parsed.people
  store.levels = parsed.levels
  store.anonymize = parsed.anonymize
  store.activePersonId = parsed.activePersonId ?? parsed.people[0]?.id ?? null
}
