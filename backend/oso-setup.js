const { Oso } = require("oso-cloud");

const oso = new Oso("https://cloud.osohq.com", process.env.OSO_API_KEY);
module.exports = oso;
