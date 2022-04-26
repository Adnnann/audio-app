import User from '../models/user.model'
import errorHandler from '../controllers/helpers/dbErrorHandlers'
import _ from 'lodash'


  const create = async(req, res, next) => {

    let usernameToCheck = await User.findOne({'username':req.body.username})
    let emailToCheck = await User.findOne({'email':req.body.email})
    
    if(usernameToCheck){
        return res.send({error:"Username is already taken!"})
    }

    if(emailToCheck){
        return res.send({error:"Email is already taken!"})
    }

    const user = new User(req.body)
    user.save((err, result) => {
        if(err) {
            res.send({error: errorHandler.getErrorMessage(err)})
        }else{
            res.send({message: 'Successfuly created a new user.'})
        }
    })
}

const read = (req, res) => {
    res.status(200).json(req.profile)
}

const updateUserProfile = async(req, res, next) => {
    
    let usernameToCheck = await User.findOne({'username':req.body.username})
    let emailToCheck = await User.findOne({'email':req.body.email})
    
    if(usernameToCheck){
        return res.send({error:"Username is already taken!"})
    }

    if(emailToCheck){
        return res.send({error:"Email is already taken!"})
    }

    let user = req.profile

    user = _.extend(user, req.body);

    user.email = req.body.email ? req.body.email : user.email
    user.username = req.body.username ? req.body.username : user.username
                       
    user.updated = Date.now()
    user.save((err)=>{
        if(err){
            return res.send({error:errorHandler.getErrorMessage(err)})
        }else{
            return res.send({
                message:'Data updated',
                data:user})
        }
    })
}

const updateUserPassword = async(req, res, next) => {
    
    let user = req.profile

    user = _.extend(user, req.body);

    let userProfile = await User.findOne({'_id':req.profile._id})

    if(!userProfile.authenticate(req.body.password)){
        return res.send({error: 'Incorrect old password'})
    }else{
        user.hashed_password = null
        user.password = req.body.newPassword
    }
                       
    user.updated = Date.now()
    user.save((err)=>{
        if(err){
            return res.send({error:errorHandler.getErrorMessage(err)})
        }else{
            return res.send({
                message:'Data updated',
                data:user})
        }
    })
}

const updateFavorite = (req, res, next) => {
console.log(req.body)
    User.findById({_id:req.body.id}, (err, user)=>{

        if(user.favorites.includes(req.body.favorites)){
            let user = req.profile

            let index = user.favorites.indexOf(req.body.favorites)
            user.favorites[index] = null

            user.favorites = user.favorites.filter(Boolean)

            user.save((err)=>{
                if(err){
                    return res.send({error:'error'})
                }else{
                    console.log(user.favorites)
                    return res.send({
                        message:"Favorites updated",
                        data: user.favorites
                    })
                }
            })
        
        }else{
            console.log('here')
            User.findOneAndUpdate(
                {_id: req.body.id},
                {$push: {favorites:req.body.favorites}}
            )
            .exec((err)=>{
                if(err){
                    return res.send({error:'error'})
                }else{
                    return res.send({
                        message:'Favorites updated',
                        data: user.favorites
                        })
                }
            });
        }
    })

    

}
const updateSessions = (req, res, next) => {

    User.findOneAndUpdate(
        {_id: req.body.id},
        {$push: {sessions:req.body.session}}
    )
    .exec((err)=>{
        if(err){
            return res.send({error:'error'})
        }else{
      
            return res.send({
                message:'Sessions updated'})
        }
    });
}

const updateMindfulMinutes = (req, res, next) => {

    User.findById({_id: req.body.id},(err, user)=>{

        let minutes = (user.mindfulMinutes - req.body.mindfulMinutes[0]) + req.body.mindfulMinutes[1]
        
        User.findOneAndUpdate(
            {_id: req.body.id},
            {mindfulMinutes: minutes}
        )
        .exec((err)=>{
            if(err){
                return res.send({error:'Error'})
            }else{
                return res.send({
                    message:'Mindfull minutes updated'})
            }
        });
    })

    
}
    
const remove = (req, res, next) => {
    let user = req.profile
       user.remove((err)=>{
        if(err){
            return res.status(400).send({error: errorHandler.getErrorMessage(err)})
        }
        res.status(200).send({message:'Account closed'})
    })
}
            
const userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.json({error:'User not found!'})
        }
    req.profile = user;
    next()
    })
}

const updateLongestDayStreak = (req, res, next) => {
    User.findById({_id:req.body.id}, (err, user)=>{
    
        console.log(req.body.streak)
        user.dayStreak = req.body.streak
        user.longestStreak = req.body.longestStreak

        user.save((err)=>{
            if(err){
                return res.send({error:'error'})
            }else{
        
                return res.send({
                    message:"Favorites updated",
                })
            }
        })
    })
}
export default {
    create,
    read, 
    updateUserPassword,
    remove,
    userByID,
    updateSessions,
    updateMindfulMinutes,
    updateFavorite,
    updateUserProfile,
    updateLongestDayStreak
}