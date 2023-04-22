/* eslint-disable  */
import * as addTaskFormElements from './addTaskFormElements'
import { addTaskToProjectData, removeTaskFromProject, updateTaskStatus, checkProjectCompletion, deleteProjectFromData } from './storeProject'
import { addTaskButton, deleteProjectButton, taskFinishedButton, deleteTaskButton } from './projectButtons'

function buildEmptyProject (project) {
  const projectContainer = createElementWithClass('div', 'project')
  projectContainer.setAttribute('data-id', project.id)

  const projectHeading = buildHeading(project.name)
  const projectItemsList = buildItemsList()
  const projectAddTask = buildProjectButton(addTaskButton, createNewTask)
  const projetDeleteProject = buildProjectButton(deleteProjectButton, deleteProject)

  projectContainer.append(projectHeading)
  projectContainer.append(projectItemsList)
  projectContainer.append(projectAddTask)
  projectContainer.append(projetDeleteProject)

  return projectContainer
}

function addProjectToPage (project) {
  const projectsContainer = document.querySelector('.projects-list')
  projectsContainer.append(buildEmptyProject(project))
  return projectsContainer
}

function buildHeading (name) {
  const projectHeading = createElementWithClass('div', 'project-heading')

  const projectTitle = createElementWithClass('h2', 'project-title')
  projectTitle.innerText = name

  const projectDivider = createElementWithClass('div', 'divider')

  projectHeading.append(projectTitle)
  projectHeading.append(projectDivider)

  return projectHeading
}

function buildProjectButton (buttonObject, buttonEvent) {
  const buttonContainer = createElementWithClass('div', buttonObject.divClass)

  const button = createElementWithClass('div', buttonObject.buttonClass)
  button.innerText = buttonObject.buttonText
  button.addEventListener('click', () => {
    buttonEvent(button.closest('.project'))
  })

  buttonContainer.append(button)

  return buttonContainer
}

function deleteProject (project) {
  if (confirm('Really delete?')) {
    const projectsContainer = document.querySelector('.projects-list')
    projectsContainer.removeChild(project)
    deleteProjectFromData(project)
  }
}

function buildTaskButton (buttonObject, varButtonEvent) {
  const button = createElementWithClass('li', buttonObject.divClass)
  button.classList.add('button')
  button.innerText = buttonObject.buttonText
  varButtonEvent(button)

  return button
}

function buildItemsList () {
  return createElementWithClass('ul', 'project-items')
}

function buildItemsTask (data) {
  const task = createElementWithClass('li', 'project-task')
  task.setAttribute('data-id', data.id)
  task.innerText = data.name

  const taskDescriptions = buildTasksDescription(data)
  task.append(taskDescriptions)
  subMenuListener(task)

  if (data.completed === true) {
    task.classList.add('checkedoff')
  }

  return task
}

function buildTasksDescription (data) {
  const taskDescriptions = createElementWithClass('ul', 'project-task-details')
  taskDescriptions.classList.add('hidden')

  const finishedButton = buildTaskButton(taskFinishedButton, markCompleteListener)
  const deleteButton = buildTaskButton(deleteTaskButton, deleteTaskListener)

  taskDescriptions.append(finishedButton)
  taskDescriptions.append(deleteButton)

  const excludedData = ['name', 'id', 'completed']

  for (const info in data) {
    if (!excludedData.includes(info)) {
      const infoLi = createElementWithClass('li', 'details')
      const infoCapitalized = info[0].toUpperCase().concat(info.slice(1))
      if (info === 'due') {
        const dash = data[info].slice(4, 5)
        const year = dash + data[info].slice(0, 4)
        const date = data[info].slice(6)
        infoLi.innerText = `${infoCapitalized}: ${date}${year}`
      } else {
        infoLi.innerText = `${infoCapitalized}: ${data[info]}`
      }
      taskDescriptions.append(infoLi)
    }
  }

  return taskDescriptions
}

function subMenuListener (button) {
  button.addEventListener('click', function (e) {
    e.stopPropagation()
    openSubMenu(e.target)
  }), true
}

function openSubMenu (project) {
  const sub = project.querySelector('.project-task-details')
  if (sub != null) {
    sub.classList.toggle('hidden')
  }
}

function markCompleteListener (button) {
  button.addEventListener('click', markAsComplete)
}

function markAsComplete () {
  const task = this.closest('.project-task')
  task.classList.toggle('checkedoff')

  if (task.classList.contains('checkedoff')) {
    this.innerText = 'Finished!'
    updateTaskStatus(task, true)

    const allTasksFinished = checkProjectCompletion(task)
    if (allTasksFinished && confirm('All tasks complete!  Remove project?')) {
      deleteProject(allTasksFinished)
    }
  } else {
    this.innerText = 'Mark as finished'
    updateTaskStatus(task, false)
  }
}

function deleteTaskListener (button) {
  button.addEventListener('click', deleteTask)
}

function deleteTask () {
  const task = this.closest('.project-task')
  const taskList = task.closest('.project-items')
  if (confirm('Delete this task?')) {
    removeTaskFromProject(task)
    taskList.removeChild(task)
  }
}

function createNewTask (project) {
  const projectTaskList = project.querySelector('.project-items')

  const taskForm = buildItemTaskForm()
  projectTaskList.append(taskForm)

  const taskCancelButton = taskForm.querySelector('.task-form-cancel')

  taskCancelButton.addEventListener('click', () => {
    projectTaskList.removeChild(taskForm)
  })

  taskForm.addEventListener('submit', event => {
    event.preventDefault()
    console.log(event)
    const taskData = Object.fromEntries(new FormData(event.target).entries())
    addNewTask(project, taskData)
    projectTaskList.removeChild(taskForm)
  })
}

function addNewTask (project, taskData) {
  const projectTaskList = project.querySelector('.project-items')
  const taskObject = addTaskToProjectData(project, taskData)
  addTaskToProject(projectTaskList, taskObject)
}

function addTaskToProject (taskList, newTask) {
  const task = buildItemsTask(newTask)
  taskList.append(task)
}

function buildItemTaskForm () {
  const taskForm = createElementWithClass('form', 'task-form')

  const taskNameInput = createInputElement(addTaskFormElements.taskNameAttributes)
  const taskDueDate = createInputElement(addTaskFormElements.taskDueDateAttributes)
  const taskDescription = createInputElement(addTaskFormElements.taskDescriptionAttributes)
  const taskPriority = createSelectElement(addTaskFormElements.taskPriorityAttributes)
  const taskNameSubmit = createInputElement(addTaskFormElements.taskNameSubmitAttributes)
  const taskCancel = createInputElement(addTaskFormElements.taskCancelAttributes)

  const formElements = [
    taskNameInput,
    taskDueDate,
    taskDescription,
    taskPriority,
    taskNameSubmit,
    taskCancel
  ]

  for (const element of formElements) {
    taskForm.append(element)
  }

  return taskForm
}

function createInputElement (attributes) {
  const inputElement = document.createElement('input')
  for (const pair in attributes) {
    inputElement.setAttribute(pair, attributes[pair])
  }

  return inputElement
}

function createSelectElement (attributes) {
  const selectElement = document.createElement('select')
  for (const pair in attributes) {
    if (pair === 'selected') {
      const selectedOption = document.createElement('option')
      selectedOption.setAttribute('selected', 'selected')
      selectedOption.setAttribute('value', ' ')
      selectedOption.innerText = attributes[pair]
      selectElement.append(selectedOption)
    } else if (pair !== 'options') {
      selectElement.setAttribute(pair, attributes[pair])
    } else {
      attributes[pair].forEach(option => {
        const optionElement = document.createElement('option')
        optionElement.setAttribute('name', option)
        optionElement.innerText = option
        selectElement.append(optionElement)
      })
    }
  }

  return selectElement
}

function createElementWithClass (elementType, className) {
  const newElement = document.createElement(elementType)
  newElement.classList.add(className)

  return newElement
}

export { addProjectToPage, addNewTask, addTaskToProject }
