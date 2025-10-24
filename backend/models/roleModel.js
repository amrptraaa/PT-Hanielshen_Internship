import { db } from "../db/index.js";

export const RoleModel = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM roles");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM roles WHERE id = ?", [id]);
    return rows[0];
  },

  create: async (role_name) => {
    const [result] = await db.query("INSERT INTO roles (role_name) VALUES (?)", [role_name]);
    return { id: result.insertId, role_name };
  },

  update: async (id, role_name) => {
    await db.query("UPDATE roles SET role_name = ? WHERE id = ?", [role_name, id]);
    return { id, role_name };
  },

  delete: async (id) => {
    await db.query("DELETE FROM roles WHERE id = ?", [id]);
    return { message: "Role deleted successfully" };
  },
};
