var express = require('express');
var router = express.Router();
const taskController = require('../controllers/taskController')
const controller = new taskController()
/* GET task listing. */

router.post('/',controller.postTask)
router.get('/',controller.getAllTask)
router.get('/:taskId',controller.getTaskById)
router.put('/:taskId',controller.patchTaskById)
router.delete('/:taskId',controller.deleteTaskById)

module.exports = router;
