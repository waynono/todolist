<template>
  <div class="todo-main" :class="{ completed: todo.completed, overdue: isOverdue }">
    <el-checkbox
      :model-value="todo.completed"
      @change="$emit('toggle', todo.id)"
      class="todo-checkbox"
    />

    <div v-if="!isEditing" class="todo-body" @dblclick="startEdit">
      <span class="todo-title">{{ todo.title }}</span>
      <div class="todo-meta">
        <span
          v-if="category"
          class="todo-cat-tag"
          :style="{ backgroundColor: category.color }"
        >{{ category.name }}</span>
        <span v-if="todo.dueDate" class="todo-date">
          {{ formatDate(todo.dueDate) }}
        </span>
      </div>
    </div>

    <div v-else class="todo-edit" @click.stop>
      <el-input
        v-model="editTitle"
        size="small"
        ref="editInputRef"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
      />
    </div>

    <el-button text type="danger" size="small" class="delete-btn" @click="$emit('delete', todo.id)">
      <el-icon><Close /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useTodoStore } from '../composables/useTodoStore'

const props = defineProps({
  todo: { type: Object, required: true },
})

defineEmits(['toggle', 'delete', 'update'])

const { getCategory } = useTodoStore()

const isEditing = ref(false)
const editTitle = ref('')
const editInputRef = ref(null)

const category = computed(() => getCategory(props.todo.categoryId))

const isOverdue = computed(() => {
  if (!props.todo.dueDate || props.todo.completed) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(props.todo.dueDate) < today
})

function formatDate(dueDate) {
  if (!dueDate) return ''
  const d = new Date(dueDate)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function startEdit() {
  isEditing.value = true
  editTitle.value = props.todo.title
  nextTick(() => {
    editInputRef.value?.focus()
  })
}

function saveEdit() {
  if (editTitle.value.trim() && editTitle.value.trim() !== props.todo.title) {
    const { updateTodo } = useTodoStore()
    updateTodo(props.todo.id, { title: editTitle.value.trim() })
  }
  isEditing.value = false
  editTitle.value = ''
}
</script>
