import { RoleModel } from "../models/roleModel.js";

export const RoleController = {
  getAll: async (req, res) => {
    try {
      const roles = await RoleModel.getAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const role = await RoleModel.getById(id);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { role_name } = req.body;
      const newRole = await RoleModel.create(role_name);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { role_name } = req.body;
      const updatedRole = await RoleModel.update(id, role_name);
      res.json(updatedRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await RoleModel.delete(id);
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
    