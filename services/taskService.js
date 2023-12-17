

 class taskService{
    constructor(models){
        this.models = models
    }

    async postTask(body){
        const newTask = new this.models.task(body)
        await newTask.save()
        return newTask
    }

    async getAllTask(){
        const allTask = await this.models.task.find()
        return allTask
    }

    async getTaskById(taskId){
        const task = await this.models.task.find({_id:taskId})
        return task
    }

    async patchTaskById(taskId,body){
        const patchTask = await this.models.task.updateOne({_id:taskId},{$set:body})
        return patchTask
    }

    async deleteTaskById(taskId){
        const deleteTask = await this.models.task.deleteOne({_id:taskId})
        return deleteTask
    }
 }

 module.exports = taskService