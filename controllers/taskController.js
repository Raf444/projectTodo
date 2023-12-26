class taskController{
    async postTask(req,res){
        const {body} = req
        try {
            const newTask = await req.app.services.task.postTask(body)
            res.send(newTask)
        } catch (error) {
            res.status(500).json({err:error.message})
        }

    }

    async getAllTask(req,res){
        try {
            const allTask = await req.app.services.task.getAllTask()
            res.send(allTask)
        } catch (error) {
            res.status(500).json({err:error.message})
        }
    }

    async getTaskById(req,res){
        const {taskId} = req.params
        try {
            const task = await req.app.services.task.getTaskById(taskId)
            res.send(task)
        } catch (error) {
            res.status(500).json({err:error.message})

        }
    }

    async patchTaskById(req,res){
        const {taskId} = req.params
        const {body} = req
        try {
            const patchTask = await req.app.services.task.patchTaskById(taskId,body)
            res.send(patchTask)
        } catch (error) {
            res.status(500).json({err:error.message})

        }
    }

    async deleteTaskById(req,res){
        const {taskId} = req.params
        try {
            const deleteTask = await req.app.services.task.deleteTaskById(taskId)
            res.send(deleteTask)
        } catch (error) {
            res.status(500).json({err:error.message})
         
        }
    }
}

module.exports = taskController