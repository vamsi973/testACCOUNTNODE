const ObjectId = require('mongodb').ObjectID;
const userModel = require('../Models/user.model');
const commonModel = require('../Models/common.model');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const clientController = {
    clientInfoInsert: async (req, res) => {
        try {
            console.log('hello')
            const { name, email, phone } = req.body;
            let temp = '';
            let phoneTemp = phone.split('-');
            // phoneTemp.forEach((ele, i) => { if (i) { temp += ele; } });
            req.body = {
                ...req.body
            }
            let data = await commonModel.createUser(req.mongoConnection, req.body, 'client');
            res.send({ success: true, data: data })
        } catch (error) {
            console.log(error)
            res.send({ success: fa, se, msg: error })
        }
    },

    login: async (req, res) => {
        try {
            let userCheck, params;
            const secretKey = process.env.secret || "vamsikrishna";
            params = { email: req.body.user.toLowerCase() };
            userCheck = await commonModel.find(req.mongoConnection, params, "users");
            if (!userCheck) {
                return res.send({ success: false, msg: 'user record not available' });
            }
            if (userCheck && bcrypt.compareSync(req.body.password, userCheck[0]['password'])) {
                const token = jwt.sign({
                    userId: userCheck[0]['_id'],
                    isAdmin: false
                }, secretKey, { expiresIn: '1d' })
                return res.send({ success: true, data: userCheck, token: token })
            }

            const token = jwt.sign({
                userId: userCheck[0]['_id'],
                isAdmin: false
            }, secretKey, { expiresIn: '1d' })
            return res.send({ success: true, data: userCheck, token: token })

        } catch (error) {
            console.log(error)
            res.send({ success: true, msg: error })
        }
    },
    register: async (req, res) => {
        try {
            let userCheck, params, user;
            const secretKey = process.env.secret;
            console.log(secretKey, 900);
            params = { email: req.body.emailId.toLowerCase() };
            userCheck = await commonModel.find(req.mongoConnection, params, "users");
            if (userCheck.length) {
                console.log("user checks available")
                return res.send({ success: false, msg: 'user already existed' })
            }
            user = await commonModel.insert(req.mongoConnection, {
                name: req.body.Name,
                gender: req.body.Gender,
                email: req.body.emailId,
                phone: req.body.MobileNumber,
                password: bcrypt.hashSync(req.body.password, 10),
                designation: req.body.Designation
            }, 'users');
            console.log(user, 60)
            // const token = jwt.sign({
            //     userId: user.ops[0]['_id'],
            //     isAdmin: false
            // }, secretKey, { expiresIn: '1d' })
            // token: token
            res.send({ success: true, data: user })

        } catch (error) {
            console.log(error)
            res.send({ success: true, msg: error })
        }
    },

    users: async (req, res) => {
        try {
            let userCheck, params, user;
            let param = {};
            if (req.designation == 'manager') {
                param['designation'] = 'staff';
            }
            console.log(req.designation)
            if (req.designation == 'staff') {
                return res.send({ success: true, data: [] })
            }
            user = await commonModel.find(req.mongoConnection, param, 'users');


            res.send({ success: true, data: user })

        } catch (error) {
            console.log(error)
            res.send({ success: true, msg: error })
        }
    },

    deleteUser: async (req, res) => {
        try {
            user = await commonModel.delete(req.mongoConnection, { _id: ObjectId(req.body.id) }, 'users');
            res.send({ success: true, data: user })

        } catch (error) {
            console.log(error)
            res.send({ success: true, msg: error })
        }
    },
};

module.exports = clientController;