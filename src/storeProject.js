/* eslint-disable*/
import { projectsList, projectId } from './projectClass.js'

function addProjectToData (project) {
  projectsList.push(project)
  localStorage.setItem('projectsListLocal', JSON.stringify(projectsList))
  localStorage.setItem('projectIdLocal', projectId)
}

function addTaskToProjectData (project, task) {
  const projectInList = findProjectInProjectsList(project)
  projectInList.addTask(task)
  localStorage.setItem('projectsListLocal', JSON.stringify(projectsList))

  return projectInList.tasks.slice(-1)[0]
}

function removeTaskFromProject (task) {
  const project = findProjectFromTask(task)
  const projectInList = findProjectInProjectsList(project)
  const taskId = findTaskIDInDom(task)

  projectInList.removeTask(taskId)
  localStorage.setItem('projectsListLocal', JSON.stringify(projectsList))
}

function updateTaskStatus (task, status) {
  const projectInList = findProjectInProjectsList(findProjectFromTask(task))
  const taskId = findTaskIDInDom(task)

  projectInList.updateTaskStatus(taskId, status)
  localStorage.setItem('projectsListLocal', JSON.stringify(projectsList))
}

function checkProjectCompletion (task) {
  const project = findProjectFromTask(task)
  const projectInList = findProjectInProjectsList(project)

  const incompleteTask = projectInList.tasks.find(task => task.completed === false)
  if (!incompleteTask) {
    return project
  }
}

function deleteProjectFromData (project) {
  const projectInList = findProjectInProjectsList(project)
  const projectIndex = projectsList.indexOf(projectInList)
  projectsList.splice(projectIndex, 1)
  localStorage.setItem('projectsListLocal', JSON.stringify(projectsList))
}

function findProjectInProjectsList (project) {
  return projectsList.find(proj => proj.id == project.getAttribute('data-id'))
}

function findProjectFromTask (task) {
  return task.closest('.project')
}

function findTaskIDInDom (task) {
  return task.getAttribute('data-id')
}

export {
  addProjectToData,
  addTaskToProjectData,
  removeTaskFromProject,
  updateTaskStatus,
  checkProjectCompletion,
  deleteProjectFromData
}
