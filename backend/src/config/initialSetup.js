// Importa el modelo de datos 'Role'
const Role = require("../models/role.model.js");
const User = require("../models/user.model.js");

/**
 * @name createRoles
 * @description Crea los roles por defecto en la base de datos
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    // Busca todos los roles en la base de datos
    const count = await Role.estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "alumno" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "profesor" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * @name createUsers
 * @description Crea los usuarios por defecto en la base de datos
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    const admin = await Role.findOne({ name: "admin" });
    const alumno = await Role.findOne({ name: "alumno" });
    const profesor = await Role.findOne({ name: "profesor" });

    await Promise.all([
      new User({
        nombre: "alumno",
        apellido: "base",
        email: "alumno@email.com",
        rut: "11.111.111-1",
        telefono: "56911111111",
        roles: alumno._id,
      }).save(),
      new User({
        nombre: "admin",
        apellido: "base",
        email: "admin@email.com",
        rut: "00.000.000-0",
        telefono: "569000000",
        roles: admin._id,
      }).save(),
      new User({
        nombre: "profesor",
        apellido: "base",
        email: "profesor@email.com",
        rut: "22.222.222-2",
        telefono: "56922222222",
        roles: profesor._id,
      }).save(),
    ]);
    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createRoles,
  createUsers,
};
