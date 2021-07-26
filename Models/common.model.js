module.exports = {
    insert: (connection, params, db) => {
        return new Promise(async (resolve, reject) => {
            console.log(params, db)
            try {
                let insertData = await connection.collection(db).insert(params);
                resolve(insertData);
            } catch (error) {
                reject(error);
            }
        });
    },
    updateUser: async (data, params, query) => {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    },

    find: async (mongoConnection, params, dbName) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await mongoConnection.collection(dbName).find(params).toArray();
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },

    delete: async (mongoConnection, params, dbName) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await mongoConnection.collection(dbName).remove(params);
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    },


}