const ObjectId = require('mongodb').ObjectID;
const clientModel = require('./../Models/client.model');
const commonModel = require('./../Models/common.model');

const clientController = {
    clientInfoInsert: async (req, res) => {
        try {
            const { name, email, phone } = req.body;
            let temp = '';
            let phoneTemp = phone.split('-');
            phoneTemp.forEach((ele, i) => { if (i) { temp += ele; } });
            req.body = {
                ...req.body, countryCode: phoneTemp[0],
                phone: temp
            }
            let data = await commonModel.createUser(req.mongoConnection, req.body, 'client');
            res.send({ success: true, data: data })
        } catch (error) {
            res.send({ success: true, msg: error })
        }
    }
};

module.exports = clientController;