import express from 'express'
import userCtrl from '../controllers/user.controller'
import passport from 'passport'
require('../middleware/passport')

const router = express.Router()

router.route('/api/users/')
.post(userCtrl.create)

router.route('/api/users/:userId')
.get(userCtrl.read)
.delete(userCtrl.remove)

router.route('/api/users/facebookProfile/:userId')
.get(userCtrl.read)

router.route('/api/users/updateFavorite/:userId')
.put(userCtrl.updateFavorite)

router.route('/api/users/updateSessions/:userId')
.put(userCtrl.updateSessions)

router.route('/api/users/updateMindfulMinutes/:userId')
.put(userCtrl.updateMindfulMinutes)

router.route('/api/users/updateStreak/:userId')
.put(userCtrl.updateLongestDayStreak)

router.route('/api/users/updateUserPassword/:userId')
.put(userCtrl.updateUserPassword)

router.route('/api/users/updateUserProfile/:userId')
.put(userCtrl.updateUserProfile)



router.param('userId', userCtrl.userByID)

export default router