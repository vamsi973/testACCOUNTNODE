// const tokenService = require('../utilities/password_hash');
const mongo = require('mongodb');
const jwt = require('jsonwebtoken');
const autharizations = {

    getToken: function (headers) {
        if (headers && headers.token) {
            console.log(headers.token)
            var parted = headers.token.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    },

    decodeToken: function (headers) {
        return new Promise(async (resolve, reject) => {
            try {
                let token = this.getToken(headers);
                // logger.info(headers);
                var decoded = jwt.decode(token, "vamsikrishna");
                // logger.info(decoded);
                resolve(decoded);
            } catch (error) {
                resolve(false);
            }
        });
    },


}
module.exports = { autharizations }