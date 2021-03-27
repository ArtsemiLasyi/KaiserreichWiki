const mySql = require("../database/mysqlconnection");

const REQUEST_INSERT_PHOTO = "INSERT INTO photo (pho_name, pho_path) VALUES (?,?)";
const REQUEST_SELECT_ALL_PHOTO = "SELECT * FROM photo";
const REQUEST_DELETE_PHOTO = "DELETE FROM photo WHERE pho_id = ?";
const REQUEST_UPDATE_PHOTO = "UPDATE photo SET acc_login = ? WHERE acc_id = ?";

async function createNewPhoto(name, path) {
    try {
        return (await mySql.ConnectionPool.execute(REQUEST_INSERT_PHOTO, [name, path]))[0].insertId
    } catch (ex) {
        console.log("Error");
        throw new Error(ex);
    }
}

async function getPhotos() {
    try {
        
        let sqlResult = await mySql.ConnectionPool.execute(REQUEST_SELECT_ALL_PHOTO)
        return sqlResult;

    } catch (ex) {
        console.log('Error!');
        throw new Error(ex);
    }
}

module.exports.isAccountAlreadyExist = isAccountAlreadyExist
module.exports.createNewAccount = createNewAccount
module.exports.getAccountByEmail = getAccountByEmail
module.exports.updateAccount = updateAccount
module.exports.deleteAccount = deleteAccount