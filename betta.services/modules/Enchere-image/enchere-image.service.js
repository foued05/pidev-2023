const EnchereImage = require("./enchere-image.model");
const Enchere = require("../enchere-enchere/enchere-enchere.model");
const path = require("path");

// Create enchere image
exports.createEnchereImage = async (req, res, next) => {
  try {
    const { enchereId, enchereImageName } = req.body;

    // Check if the corresponding EnchereModel exists
    const enchere = await Enchere.findById(enchereId);
    if (!enchere) {
      return res.status(404).json({ error: "Enchere not found" });
    }

    // Create enchere image
    const enchereImage = new EnchereImage({
      enchereId,
      enchereImageName,
    });

    await enchereImage.save();

    // Add the created enchere image to the Enchere's enchereImages array
    enchere.enchereImages.push(enchereImage._id);
    await enchere.save();

    res.json(enchereImage);
  } catch (error) {
    res.status(500).json({ error: "Failed to create enchere image" });
  }
};

// List enchere images
exports.listData = async (req, res, next) => {
  try {
    const list = await EnchereImage.find();
    if (list.length > 0) {
      res.status(200).json(list);
    } else {
      res.status(404).json("No data found");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve enchere images" });
  }
};

// Get enchere Image by _id
exports.getData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enchereImage = await EnchereImage.findOne({ _id: id });
    if (enchereImage) {
      res.status(200).json(enchereImage);
    } else {
      res.status(404).json("Enchere Image doesn't exist");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve enchere image" });
  }
};

// List enchere Image by enchere
exports.listDataByEnchere = async (req, res, next) => {
  try {
    const { enchere } = req.params;
    const enchereImageList = await EnchereImage.find({
      enchere: enchere,
    });
    if (enchereImageList) {
      res.status(200).json(enchereImageList);
    } else {
      res.status(404).json("Enchere Image doesn't exist for this enchere");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve enchere images" });
  }
};

// List enchere Image by Main
exports.listDataByMain = async (req, res, next) => {
  try {
    const enchereImageList = await EnchereImage.find({
      isMain: true,
    });
    if (enchereImageList) {
      res.status(200).json(enchereImageList);
    } else {
      res.status(404).json("No enchere images for this Main");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve enchere images" });
  }
};

// Add enchere Image
exports.addData = async (req, res, next) => {
  try {
    const { enchereId, enchereImageName, enchereImagePath, enchereImageAlt, isMain, createdBy } = req.body;

    const enchereImage = new EnchereImage({
      enchereId,
      enchereImageName,
      enchereImagePath,
      enchereImageAlt,
      isMain,
      createdBy,
    });

    await enchereImage.save();
    res.json(enchereImage);
  } catch (error) {
    res.status(500).json({ error: "Failed to add enchere image" });
  }
};

// Download enchere image
exports.downloadData = async (req, res) => {
  try {
    const filename = req.params.filename;
    const enchereImage = await EnchereImage.findOne({
      enchereImageName: filename,
    });

    if (!enchereImage) {
      return res.status(404).json({ message: "Enchere image not found" });
    }

    const filePath = path.join(
      __dirname,
      "../../public/images/enchere",
      filename
    );
    res.set("Content-Disposition", `attachment; filename="${filename}"`);
    res.set("Cache-Control", "no-store"); // Prevent caching
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update enchere Image
exports.updateData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const enchereImage = await EnchereImage.findById(id);
    if (!enchereImage) {
      return res.status(404).json({ error: "Enchere image not found" });
    }

    Object.assign(enchereImage, updatedData);
    await enchereImage.save();

    res.json(enchereImage);
  } catch (error) {
    res.status(500).json({ error: "Failed to update enchere image" });
  }
};

// Delete enchere Image
exports.deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enchereImage = await EnchereImage.findById(id);
    if (!enchereImage) {
      return res.status(404).json({ error: "Enchere image not found" });
    }

    await enchereImage.remove();
    res.json({ message: "Enchere image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete enchere image" });
  }
};

// Restore enchere Image
exports.restoreData = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enchereImage = await EnchereImage.findById(id);
    if (!enchereImage) {
      return res.status(404).json({ error: "Enchere image not found" });
    }

    enchereImage.isDeleted = false;
    await enchereImage.save();

    res.json({ message: "Enchere image restored successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to restore enchere image" });
  }
};
