const mongoose  = require('mongoose')

mongoose.connect('mongodb+srv://whereismyrickshawadmin:qK5A3T86xqXOMReI@cluster0.dndpthc.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:  // creating error in connection
}).then(() => 
{
    console.log('mongoose connection successful !');
}).catch((err) =>
{
    console.log(`mongoose connection failed because: ${err}`);
})