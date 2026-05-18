<template>
  <div class="todo-list">
    <template v-if="todos.length > 0">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :class="{ 'drag-over': dragOverId === todo.id && dragId !== todo.id }"
        draggable="true"
        @dragstart="onDragStart($event, todo.id)"
        @dragover="onDragOver($event, todo.id)"
        @drop="onDrop"
        @dragend="onDragEnd"
        @toggle="toggleTodo"
        @delete="removeTodo"
      />
    </template>
    <div v-else class="empty-state">
      <p class="empty-icon">📋</p>
      <p>暂无匹配的待办事项</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../composables/useTodoStore'
import TodoItem from './TodoItem.vue'

defineProps({
  todos: { type: Array, default: () => [] },
})

const { store, toggleTodo, removeTodo } = useTodoStore()

const dragId = ref(null)
const dragOverId = ref(null)

function onDragStart(e, id) {
  dragId.value = id
  e.dataTransfer.effectAllowed = 'move'
}

function onDragOver(e, id) {
  e.preventDefault()
  dragOverId.value = id
}

function onDrop() {
  const from = dragId.value
  const to = dragOverId.value
  if (from && to && from !== to) {
    const fromIdx = store.todos.findIndex((t) => t.id === from)
    if (fromIdx === -1) return
    const [item] = store.todos.splice(fromIdx, 1)
    const toIdx = store.todos.findIndex((t) => t.id === to)
    if (toIdx !== -1) {
      store.todos.splice(toIdx, 0, item)
    } else {
      store.todos.splice(fromIdx, 0, item)
    }
  }
  dragId.value = null
  dragOverId.value = null
}

function onDragEnd() {
  dragId.value = null
  dragOverId.value = null
}
</script>
