<script setup>
import { computed, ref } from 'vue'
import { requirementsForLevel, HAMEL_INTRO } from '../store.js'

const props = defineProps({
  level: { type: [Number, String], default: '' },
})

const open = ref(false)

const hasLevel = computed(
  () => props.level !== '' && props.level !== null && props.level !== undefined
)
const req = computed(() => requirementsForLevel(props.level))

function isSub(item) {
  return item && typeof item === 'object'
}
</script>

<template>
  <span v-if="hasLevel" class="lri">
    <button
      type="button"
      class="lri__btn"
      :aria-label="`Show career level ${level} requirement`"
      :title="`Career level ${level} requirement`"
      @click="open = true"
    >
      i
    </button>

    <div v-if="open" class="lri-overlay" @click.self="open = false">
      <div class="lri-panel" role="dialog" aria-modal="true">
        <div class="lri-panel__header">
          <div>
            <h2 class="lri-panel__title">
              Career level {{ level }}<template v-if="req"> — {{ req.jobCode }}</template>
            </h2>
            <p v-if="req && req.jobCodeNote" class="lri-panel__note">{{ req.jobCodeNote }}</p>
          </div>
          <button class="lri-panel__close" title="Close" @click="open = false">&times;</button>
        </div>

        <p v-if="req && req.summary" class="lri-panel__summary">{{ req.summary }}</p>

        <section v-if="req && req.hamel" class="lri-hamel">
          <h3 class="lri-dim__name">Hamel's hierarchy of contribution</h3>
          <p class="lri-hamel__intro">{{ HAMEL_INTRO }}</p>
          <p class="lri-hamel__band">
            <span class="lri-hamel__band-label">Where this level is won</span>
            {{ req.hamel.band }}
          </p>
          <p class="lri-hamel__gist">{{ req.hamel.gist }}</p>
          <p class="lri-hamel__examples-label">Behaviours that show it</p>
          <ul class="lri-dim__list">
            <li v-for="(ex, i) in req.hamel.examples" :key="i">{{ ex }}</li>
          </ul>
        </section>

        <template v-if="req">
          <section v-for="dim in req.dimensions" :key="dim.name" class="lri-dim">
            <h3 class="lri-dim__name">{{ dim.name }}</h3>
            <ul class="lri-dim__list">
              <template v-for="(item, i) in dim.items" :key="i">
                <li v-if="!isSub(item)">{{ item }}</li>
                <li v-else class="lri-dim__sub">
                  <span class="lri-dim__sub-head">{{ item.sub }}</span>
                  <ul class="lri-dim__list">
                    <li v-for="(sub, j) in item.items" :key="j">{{ sub }}</li>
                  </ul>
                </li>
              </template>
            </ul>
          </section>
        </template>
        <p v-else class="lri-panel__empty">
          No detailed career-level requirement has been captured for level {{ level }}.
          The matrix covers levels 4–11.
        </p>
      </div>
    </div>
  </span>
</template>

<style scoped>
.lri {
  display: inline-flex;
  align-items: center;
}

.lri__btn {
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  border: 1px solid var(--cgi-purple);
  background: transparent;
  color: var(--cgi-purple);
  font-size: 0.72rem;
  font-weight: 700;
  font-style: italic;
  font-family: Georgia, 'Times New Roman', serif;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.lri__btn:hover {
  background: var(--cgi-purple);
  color: var(--cgi-white);
}

.lri-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 4rem 1rem;
  z-index: 60;
}

.lri-panel {
  background: var(--cgi-white);
  border-radius: 10px;
  width: min(640px, 100%);
  max-height: 80vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.lri-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--cgi-grey-light);
  padding-bottom: 0.75rem;
}

.lri-panel__title {
  margin: 0;
  font-size: 1.15rem;
  color: var(--cgi-black);
}

.lri-panel__note {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--cgi-grey);
}

.lri-panel__close {
  border: none;
  background: transparent;
  color: var(--cgi-grey);
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.2rem 0.45rem;
  border-radius: 5px;
  flex-shrink: 0;
}

.lri-panel__close:hover {
  color: var(--cgi-white);
  background: var(--cgi-red);
}

.lri-panel__summary {
  margin: 0 0 1.25rem;
  padding: 0.75rem 0.9rem;
  border-left: 3px solid var(--cgi-purple);
  background: color-mix(in srgb, var(--cgi-purple) 8%, var(--cgi-white));
  border-radius: 0 6px 6px 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--cgi-purple-dark);
}

.lri-panel__empty {
  margin: 0;
  color: var(--cgi-grey-dark);
  font-size: 0.9rem;
}

.lri-hamel {
  margin-bottom: 1.25rem;
  padding: 0.9rem 1rem;
  border: 1px solid var(--cgi-grey-light);
  border-radius: 8px;
  background: var(--cgi-grey-pale);
}

.lri-hamel__intro {
  margin: 0 0 0.6rem;
  font-size: 0.82rem;
  font-style: italic;
  color: var(--cgi-grey);
  line-height: 1.45;
}

.lri-hamel__band {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--cgi-black);
}

.lri-hamel__band-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--cgi-purple);
  margin-bottom: 0.1rem;
}

.lri-hamel__gist {
  margin: 0 0 0.6rem;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--cgi-black);
}

.lri-hamel__examples-label {
  margin: 0 0 0.35rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--cgi-purple);
}

.lri-dim {
  margin-bottom: 1.1rem;
}

.lri-dim:last-child {
  margin-bottom: 0;
}

.lri-dim__name {
  margin: 0 0 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--cgi-purple);
}

.lri-dim__list {
  margin: 0;
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.88rem;
  color: var(--cgi-black);
}

.lri-dim__sub {
  list-style: none;
  margin-left: -1.1rem;
}

.lri-dim__sub-head {
  display: block;
  font-weight: 700;
  font-style: italic;
  color: var(--cgi-grey-dark);
  margin: 0.2rem 0 0.3rem;
}

.lri-dim__sub .lri-dim__list {
  margin-top: 0.3rem;
}
</style>
