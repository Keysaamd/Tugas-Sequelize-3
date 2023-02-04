const md5 = require("md5")
const adminModel = require(`../models/index`).admin
const Op = require(`sequelize`).Op

/** create function for read all data */
exports.getAllAdmin = async (request, response) => {
    let admin = await adminModel.findAll()
    return response.json({
        success: true,
        data: admin,
        message: `Admin have been loaded`
    })
}

/** create function for filter */
exports.findAdmin = async (request, response) => {
    let keyword = request.body.keyword
    let admin = await adminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword } },
                { contact: { [Op.substring]: keyword } },
                { address: { [Op.substring]: keyword } },
                { username: { [Op.substring]: keyword } },
                { password: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: admin,
        message: `All Admin have been loaded`
    })
}

/** create function for add new admin */
exports.addAdmin = (request, response) => {
    let newAdmin = {
        name: request.body.name,
        address: request.body.address,
        contact: request.body.contact,
        username: request.body.username,  
        password: md5(request.body.password)
    }
     adminModel.create(newAdmin)
        .then(result => {

            return response.json({
                success: true,
                data: result,
                message: `New admin has been inserted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for update admin */
exports.updateAdmin = (request, response) => {
    let dataAdmin = {
        name: request.body.name,
        address: request.body.address,
        contact: request.body.contact,
        username: request.body.username,  
        password: request.body.password
    }
    let idAdmin = request.params.id
    adminModel.update(dataAdmin, { where: { id: idAdmin } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}

/** create function for delete data */
exports.deleteAdmin = (request, response) => {
    let idAdmin = request.params.id
    adminModel.destroy({ where: { id: idAdmin } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been updated`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}
