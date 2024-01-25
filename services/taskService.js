

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
        const task = await this.models.task.findOne({_id:taskId})
        if(task){
            return task
        }else{
            throw new Error("task note found ")
        }
    }

    async patchTaskById(taskId,body){
        const patchTask = await this.models.task.updateOne({_id:taskId},{$set:body})//! {...body}
        return patchTask
    }

    async deleteTaskById(taskId){
        const deleteTask = await this.models.task.findOneAndDelete({_id:taskId})
        return deleteTask
    }

    async deleteTasksPatch(arrayTaskId){
        let succesCount = 0
        arrayTaskId.forEach(id => {
            await this.models.task.findOneAndDelete({_id:id})
            succesCount += 1
        })

        if(succesCount !== arrayTaskId){
            throw new Error
        }
    }
 }

 module.exports = taskService