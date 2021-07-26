// const tokenService = require('../utilities/password_hash');
const mongo = require('mongodb');
const jwt = require('jsonwebtoken');
const { autharizations } = require('./autharizations');
const commonModel = require('../models/common.model');
const tokenValidator = {
    decodeToken: async (req, res, next) => {
        console.log('abc');
        const decodedInfo = await autharizations.decodeToken(req.headers);
        
        if (!decodedInfo) {
            res.send({ success: false, msg: "Invalid Authorization!" });
        } else {
            
            let user = await commonModel.find(req.mongoConnection, { "_id": mongo.ObjectId(decodedInfo.userId) }, 'users');
            if(user.length == 0){
               return res.send({ success: false, msg: "Invalid Authorization!" });
            }

           req['designation'] = user[0]['designation']
           req['name'] = user[0]['name']
           next()
        }
    },
}
module.exports = { tokenValidator }