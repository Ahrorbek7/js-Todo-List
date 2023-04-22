/* eslint-disable eqeqeq */
class Task {
  constructor (task, taskId) {
    this.name = task.name
    this.due = task.due
    this.description = task.description
    this.priority = task.priority
    this.id = taskId
    this.completed = false
  }
}

class Project {
  constructor (name, tasks = [], id = Project.assignId()) {
    this.name = name
    this.tasks = tasks
    this.id = id
  }

  addTask (taskObject) {
    const taskId = this.tasks.length + 1
    const task = new Task(taskObject, taskId)
    this.tasks.push(task)
  }

  removeTask (taskId) {
    const taskToRemove = this.tasks.indexOf(this.findTaskInProject(taskId))
    this.tasks.splice(taskToRemove, 1)
  }

  updateTaskStatus (taskId, status) {
    const taskToUpdate = this.findTaskInProject(taskId)
    taskToUpdate.completed = status
  }

  findTaskInProject (taskId) {
    return this.tasks.find(task => task.id == taskId)
  }

  static assignId () {
    return projectId++
  }
}

const projectsList = []
let projectId = 1

export { Project, projectsList, projectId }
