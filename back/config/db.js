const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.IDMDB}@cluster0.ep4znvs.mongodb.net/groupomania`,{ useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée ! : " + err));
