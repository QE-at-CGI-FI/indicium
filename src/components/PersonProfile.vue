<script setup>
import { computed } from 'vue'
import { store, isCriterionHidden, minSalaryForLevel } from '../store.js'

const props = defineProps({
  person: { type: Object, required: true },
})

function updateValue(criterionId, text) {
  props.person.values[criterionId] = text
}

const minSalary = computed(() => minSalaryForLevel(props.person.level))

const visibleCriteria = computed(() =>
  store.criteria.filter((c) => !isCriterionHidden(c.label, store.anonymize))
)
</script>

<template>
  <div class="profile">
    <div class="profile__header">
      <input
        class="profile__name"
        type="text"
        v-model="person.name"
        placeholder="Person's name"
      />
      <input
        class="profile__title"
        type="text"
        v-model="person.title"
        placeholder="Role"
      />
      <div class="profile__level">
        <label :for="`${person.id}-level`" class="profile__level-label">Level</label>
        <input
          :id="`${person.id}-level`"
          class="profile__level-input"
          type="number"
          min="1"
          max="14"
          maxlength="2"
          v-model="person.level"
        />
      </div>
    </div>

    <div v-if="person.level" class="salary-chip">
      <template v-if="minSalary">
        Minimum salary for level {{ person.level }}: <strong>{{ minSalary }}</strong>
      </template>
      <template v-else>
        No minimum salary set for level {{ person.level }} yet — add one via "Manage levels".
      </template>
    </div>

    <div class="profile__grid">
      <div v-for="criterion in visibleCriteria" :key="criterion.id" class="criterion">
        <label :for="`${person.id}-${criterion.id}`" class="criterion__label">
          {{ criterion.label }}
        </label>
        <input
          :id="`${person.id}-${criterion.id}`"
          type="text"
          class="criterion__input"
          :value="person.values[criterion.id] || ''"
          @input="updateValue(criterion.id, $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  padding: 1.5rem;
  max-width: 900px;
}

.profile__header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.profile__name {
  font-size: 1.4rem;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid var(--cgi-grey-light);
  padding: 0.3rem 0.1rem;
  color: var(--cgi-black);
  flex: 1 1 240px;
  background: transparent;
}

.profile__title {
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid var(--cgi-grey-light);
  padding: 0.3rem 0.1rem;
  color: var(--cgi-grey-dark);
  flex: 1 1 240px;
  background: transparent;
}

.profile__level {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  flex: 0 0 auto;
}

.profile__level-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--cgi-purple);
}

.profile__level-input {
  width: 3rem;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  border: none;
  border-bottom: 2px solid var(--cgi-grey-light);
  padding: 0.3rem 0.1rem;
  color: var(--cgi-black);
  background: transparent;
  -moz-appearance: textfield;
}

.profile__level-input::-webkit-outer-spin-button,
.profile__level-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.profile__name:focus,
.profile__title:focus,
.profile__level-input:focus {
  outline: none;
  border-bottom-color: var(--cgi-purple);
}

.salary-chip {
  display: inline-block;
  background: color-mix(in srgb, var(--cgi-purple) 12%, var(--cgi-white));
  border: 1px solid var(--cgi-purple);
  color: var(--cgi-purple-dark);
  border-radius: 8px;
  padding: 0.5rem 0.85rem;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}

.profile__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
}

.criterion {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  background: var(--cgi-grey-pale);
  border: 1px solid var(--cgi-grey-light);
  border-radius: 8px;
  padding: 0.75rem;
}

.criterion__label {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--cgi-purple);
}

.criterion__input {
  border: 1px solid var(--cgi-grey-light);
  border-radius: 6px;
  padding: 0.5rem;
  font-family: inherit;
  font-size: 0.9rem;
  width: 100%;
  background: var(--cgi-white);
  color: var(--cgi-black);
}

.criterion__input:focus {
  outline: 2px solid var(--cgi-red);
  outline-offset: 1px;
}
</style>
