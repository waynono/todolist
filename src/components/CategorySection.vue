<template>
  <div class="category-bar">
    <span
      :class="['cat-chip', { active: modelValue === 'all' }]"
      @click="$emit('update:modelValue', 'all')"
    >全部 ({{ store.todos.length }})</span>
    <span
      v-for="cat in store.categories"
      :key="cat.id"
      :class="['cat-chip', { active: modelValue === cat.id }]"
      :style="modelValue === cat.id
        ? { backgroundColor: cat.color, borderColor: cat.color }
        : { borderColor: cat.color, color: cat.color }"
      @click="$emit('update:modelValue', cat.id)"
    >{{ cat.name }} ({{ categoryTotalCount(cat.id) }})</span>
    <el-button text size="small" class="cat-mgr-btn" @click="$emit('toggleManager')">
      <el-icon><Setting /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
import { useTodoStore } from '../composables/useTodoStore'

defineProps({
  modelValue: { type: String, default: 'all' },
  showManager: { type: Boolean, default: false },
})

defineEmits(['update:modelValue', 'toggleManager'])

const { store, categoryTotalCount } = useTodoStore()
</script>
