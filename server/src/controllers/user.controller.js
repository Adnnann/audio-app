import User from '../models/user.model'
import _, { indexOf } from 'lodash'
import errorHandler from '../controllers/helpers/dbErrorHandlers'


  const create = (req, res, next) => {

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
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    res.status(200).json(req.profile)
}

const update = (req, res, next) => {
    let user = req.profile

   user = _.extend(user, req.body);
    user.updated = Date.now()
    user.favorites.push({favorite:req.body.favorites})

    
    user.save(err=>{
        if(err){
            return res.send({error: errorHandler.getErrorMessage(err)})
        }
        res.send({message: 'Data updated'})
    })
}

const updateFavorite = (req, res, next) => {

    User.findById({_id:req.body.id}, (err, user)=>{

        console.log(req.body.favorites)
        if(user.favorites.includes(req.body.favorites)){
            console.log('yes')
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
            User.findOneAndUpdate(
                {_id: req.body.id},
                {$push: {favorites:req.body.favorites}}
            )
            .exec((err)=>{
                if(err){
                    return res.send({error:'error'})
                }else{
                    console.log(user.favorites)
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

export default {
    create,
    read, 
    update,
    remove,
    userByID,
    updateSessions,
    updateFavorite
}