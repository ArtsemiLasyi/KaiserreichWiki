const mySql = require("../../database/mysqlconnection");

const REQUEST_INSERT_PHOTO = "INSERT INTO photo (pho_name, pho_path, pho_datetime_upload) VALUES (?,?,?)";
const REQUEST_SELECT_ALL_PHOTO = "SELECT * FROM photo";
const REQUEST_DELETE_PHOTO = "DELETE FROM photo WHERE pho_id = ?";
const REQUEST_UPDATE_PHOTO = "UPDATE photo SET pho_name = ? WHERE pho_id = ?";

async function createPhoto(name, path, datetime) {
    try {
        return (await mySql.ConnectionPool.execute(REQUEST_INSERT_PHOTO, [name, path, datetime]))[0].insertId
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


async function deletePhoto(name, id) {
    try {
        sqlResult = await mySql.ConnectionPool.execute(REQUEST_DELETE_PHOTO, [name], [id])
    } catch (ex) {
        console.log('Error');
        throw new Error(ex);
    }
}

async function updatePhoto(id) {
    try {
        sqlResult = await mySql.ConnectionPool.execute(REQUEST_DELETE_PHOTO, [id])
    } catch (ex) {
        console.log('Error');
        throw new Error(ex);
    }
}

module.exports.createPhoto = createPhoto;
module.exports.deletePhoto = deletePhoto;
module.exports.updatePhoto = updatePhoto;
module.exports.getPhotos = getPhotos;
