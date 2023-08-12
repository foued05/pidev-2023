const Enchere = require("./enchere.model");

// List enchères
exports.getAllEncheres = async (req, res, next) => {
  try {
    const encheres = await Enchere.find();
    res.json(encheres);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve encheres" });
  }
};

// Get enchère by ID
exports.getEnchereById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enchere = await Enchere.findById(id);
    if (!enchere) {
      return res.status(404).json({ error: "Enchere not found" });
    }
    res.json(enchere);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve enchere" });
  }
};

// Create enchère
// Create enchère
exports.createEnchere = async (req, res, next) => {
  try {
    const { enchereName, enchereDescription, createdBy, startTime, stopTime } = req.body;

    const enchere = new Enchere({
      enchereName,
      enchereDescription,
      createdBy,
      startTime,
      stopTime
    });

    await enchere.save();
    res.json(enchere);
  } catch (error) {
    res.status(500).json({ error: "Failed to create enchere" });
  }
};



// Update enchère
exports.updateEnchere = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { enchereName, enchereDescription, startTime, stopTime } = req.body;

    const enchere = await Enchere.findById(id);
    if (!enchere) {
      return res.status(404).json({ error: "Enchere not found" });
    }

    enchere.enchereName = enchereName;
    enchere.enchereDescription = enchereDescription;
    enchere.startTime = startTime;
    enchere.stopTime = stopTime;

    await enchere.save();
    res.json(enchere);
  } catch (error) {
    res.status(500).json({ error: "Failed to update enchere" });
  }
};

// Delete enchère
exports.deleteEnchere = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Delete Enchere with ID:", id);

    const enchere = await Enchere.findById(id);
    if (!enchere) {
      return res.status(404).json({ error: "Enchere not found" });
    }

    await Enchere.findByIdAndDelete(id);
    res.json({ message: "Enchere deleted successfully" });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};
