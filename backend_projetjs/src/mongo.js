const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://salima:Salima2000@cluster0.vg8aqz1.mongodb.net/?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
.then(() => {
   console.log('mongoose connected');
})
.catch((e) => {
   console.error('MongoDB connection error:', e);
});

module.exports = mongoose;