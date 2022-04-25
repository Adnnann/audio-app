import express from 'express'
import filesCtrl from '../controllers/files.controller'

const router = express.Router()

router.route('/api/files')
.get(filesCtrl.listFiles)

export default router;