import mongoose from 'mongoose'
import crypto from 'crypto'
import validate from 'mongoose-validator'

const emailValidate = [
    validate({
        validator:'isEmail',
        message:'Please enter valid email address'
    })
]

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:'Username is required',
        trim: true,
    },
    created: {
        type: Date,
        default: Date.now
    },
    email:{
        type:String,
        validate: emailValidate

    },
    updated: Date,
    hashed_password:{
        type:String,
        required: 'Password is required'
    },
    favorites:{
        type:Array
    },
    sessions:{
        type:Array,
    },
    mindfulMinutes:{
        type:Number,
        default:0
    },
    dayStreak:{
        type:Array
    },
    longestStreak:{
        type:Number,
        default:0
    },
    facebookId:{
        type:String
    },
    loggedWithFacebook:{
        type:Boolean
    },
    salt:String
})

UserSchema.virtual('password')
.set(function(password){
    this._password = password,
    this.salt = this.makeSalt(),
    this.hashed_password = this.encryptPassword(password)
})

UserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
            
        }catch(err){
            return err
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 8){
        this.invalidate('password', 'Password must be at least 8 characters')
    }
}, null)

export default mongoose.model('User', UserSchema)
