<script setup>
import { computed, ref } from 'vue'
import { requirementsForLevel } from '../store.js'

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

.lri-panel__empty {
  margin: 0;
  color: var(--cgi-grey-dark);
  font-size: 0.9rem;
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
