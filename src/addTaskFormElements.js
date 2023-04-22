const taskNameAttributes = {
  type: 'text',
  name: 'name',
  class: 'task-form-input task-name',
  placeholder: 'Task Name'
}

const taskDueDateAttributes = {
  type: 'text',
  onfocus: "(this.type='date')",
  onmousedown: "(this.type='date')", // works if you tap twice
  onblur: "(this.type='text')",
  name: 'due',
  class: 'task-form-input task-due',
  placeholder: 'Due Date'
}

const taskDescriptionAttributes = {
  type: 'text',
  name: 'description',
  class: 'task-form-input task-description',
  placeholder: 'Task Description'
}

const taskPriorityAttributes = {
  name: 'priority',
  class: 'task-form-input task-priority',
  selected: 'Task Priority',
  options: ['High', 'Medium', 'Low']
}

const taskNameSubmitAttributes = {
  type: 'submit',
  class: 'task-form-submit button',
  value: 'Create Task'
}

const taskCancelAttributes = {
  type: 'button',
  class: 'task-form-cancel button',
  value: 'Cancel'
}

export {
  taskNameAttributes,
  taskDueDateAttributes,
  taskDescriptionAttributes,
  taskPriorityAttributes,
  taskNameSubmitAttributes,
  taskCancelAttributes
}
