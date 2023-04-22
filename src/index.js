/* eslint-disable */
import './style.scss'
import { addProjectToPage, addNewTask, addTaskToProject } from './buildProject'
import { addProjectToData } from './storeProject'
import { Project, projectsList, projectId } from './projectClass'
// Uncomment to enable masonry layout
// FlexMasonry.init('.projects-list');

const createProjectForm = document.getElementById('create-project-form')

createProjectForm.addEventListener('submit', event => {
  event.preventDefault()
  const projectName = Object.fromEntries(new FormData(event.target).entries())
  if (projectName.name) {
    createNewProject(projectName.name)
  } else {
    createNewProject('Unnamed Project')
  }
  event.target.reset()
})

function createNewProject (project) {
  const newProject = new Project(project.name || project, project.tasks, project.id)
  addProjectToPage(newProject)
  addProjectToData(newProject)

  return newProject
}

  const projectsDivs = document.querySelectorAll('.project')

  projectsList.forEach(project => {
    const projectDiv = Array.from(projectsDivs).find(rightDiv => rightDiv.getAttribute('data-id') == project.id)
    const projectTaskList = projectDiv.querySelector('.project-items')
    project.tasks.forEach(task => addTaskToProject(projectTaskList, task))
  })

