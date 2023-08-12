const donsmodel = require("./dons.model");

// list eventCategories
exports.listData = async (req, res, next) => {
  try {
    
    const list = await donsmodel.find()
    console.log(list)
    res.json(list)
    // if (list.length > 0) {
    //   res.status(200).json(list);
    // } else {
    //   res.status(404).json("No data Found");
    // }
  } catch (error) {
    res.json({
      user: error.user,
      error: error,
    });
  }
};
exports.addData = async (req, res, next) => {
    try {
      const { nom, association, soldout,url_image,quantité } = req.body;
          const dons = new donsmodel({
            nom: nom,
            association: association,
            soldout: soldout,
            url_image:url_image,
            quantity:quantité
          });
          dons.save();
          res.json(dons._id);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  };
  exports.getData = async (req, res, next) => {
    try {
      const { id } = req.params;
      const dons = await donsmodel.findOne({ _id: id });
      if (dons) {
        res.status(200).json(dons);
      } else {
        res.status(404).json("Role doesn't exist Found");
      }
    } catch (error) {
      res.json({
        dons: error.dons,
        error: error,
      });
    }
  };