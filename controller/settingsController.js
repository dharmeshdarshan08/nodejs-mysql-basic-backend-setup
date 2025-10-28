const db = require('../config/database');

exports.getSettings = async (req, res) => {
  let query = "SELECT * FROM settings";
  db.query(query, (err, settings_data) => {
    if (err) {
      console.error("Error retrieving settings:", err);
      return res.status(500).send({
        status: false,
        message: "Error retrieving settings"
      });
    } else {
      if (settings_data.length > 0) {
        return res.send({
          status: true,
          message: "Settings data retrieved successfully",
          data: settings_data,
        });
      } else {
        return res.send({
          status: false,
          message: "No settings records found",
          data: settings_data,
        });
      }
    }
  });
}; 
exports.test = async (req, res) => {
 return res.send({status: true,message: "Testing for cicd Successful " });
}; 