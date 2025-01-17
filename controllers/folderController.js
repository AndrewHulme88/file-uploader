const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createFolder: async (req, res) => {
    const { name } = req.body;
    try {
      const folder = await prisma.folder.create({
        data: {
          name,
          userId: req.user.id,
        },
      });
      res.status(201).json(folder);
    } catch (err) {
      res.status(500).json({ error: "Failed to create folder" });
    }
  }
};
