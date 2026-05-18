<template>
  <div v-if="store.todos.length > 0" class="app-footer">
    <span class="footer-remaining">{{ remaining }} 项未完成</span>
    <el-button
      v-if="hasCompleted"
      text
      type="danger"
      size="small"
      @click="clearCompleted"
    >
      <el-icon><Delete /></el-icon>
      清除已完成 ({{ completed }})
    </el-button>
  </div>
</template>

<script setup>
import { useTodoStore } from '../composables/useTodoStore'

const { store, remaining, completed, hasCompleted, clearCompleted } = useTodoStore()
</script>
