<template>
  <div class="app-container">
    <div class="app-header">
      <h1>待办事项</h1>
      <p class="app-subtitle">{{ remaining }} 项未完成 · 共 {{ store.todos.length }} 项</p>
    </div>

    <TodoInput @add="handleAdd" />

    <CategorySection
      v-model="categoryFilter"
      :show-manager="showCategoryForm"
      @toggle-manager="showCategoryForm = !showCategoryForm"
    />

    <div class="toolbar">
      <el-radio-group v-model="statusFilter" size="small">
        <el-radio-button value="all">全部</el-radio-button>
        <el-radio-button value="active">未完成</el-radio-button>
        <el-radio-button value="completed">已完成</el-radio-button>
      </el-radio-group>
    </div>

    <Transition name="fade">
      <CategoryPanel v-if="showCategoryForm" />
    </Transition>

    <TodoList :todos="filteredTodos" />

    <TodoFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from './composables/useTodoStore'
import TodoInput from './components/TodoInput.vue'
import CategorySection from './components/CategorySection.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

const { store, remaining, addTodo } = useTodoStore()

const statusFilter = ref('all')
const categoryFilter = ref('all')
const showCategoryForm = ref(false)

const filteredTodos = computed(() => {
  let list = store.todos
  if (categoryFilter.value !== 'all') {
    list = list.filter((t) => t.categoryId === categoryFilter.value)
  }
  if (statusFilter.value === 'active') {
    list = list.filter((t) => !t.completed)
  } else if (statusFilter.value === 'completed') {
    list = list.filter((t) => t.completed)
  }
  return list
})

function handleAdd({ title, categoryId, dueDate }) {
  addTodo(title, categoryId, dueDate)
}
</script>
