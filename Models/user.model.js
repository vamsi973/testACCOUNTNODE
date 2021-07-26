module.exports = {
    insertClineInfo: (connection, data) => {
        // let abc = await connection.collection('clients').insert(data);
        return new Promise(async (resolve, reject) => {
            try {
                let abc = await connection.collection('clients').insert(data);
                resolve(abc);
            } catch (error) {
                reject(error)
            }
        })
    }
}