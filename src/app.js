const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const bcrypt = require('bcryptjs')

require('./db/conn')
const { Driver, Rider, RideRequest } = require('./models/registers')

const port = process.env.PORT || 3000

const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(static_path))

app.set('view engine', 'hbs')
app.set('views', template_path)
hbs.registerPartials(partials_path)

//backup if template engine dont work
app.get('/', (req, res) => {
    res.render("index")
})
app.get('/index', (req, res) => {
    res.render("index")
})

// set routes of app
app.get('/register', (req, res) => {
    res.render("register")
})

app.get('/safety', (req, res) => {
    res.render("safety")
})

app.get('/queries', (req, res) => {
    res.render("queries")
})

app.get('/contact', (req, res) => {
    res.render("contact")
})

app.get('/register', (req, res) => {
    res.render("register")
})


app.get('/choice', (req, res) => {
    res.render("choice")
})

app.get('/driverRegistration', (req, res) => {
    res.render("driverRegistration")
})

app.get('/riderRegistration', (req, res) => {
    res.render("riderRegistration")
})

app.get('/loginchoice', (req, res) => {
    res.render("loginchoice")
})

app.get('/driver-login', (req, res) => {
    res.render("driver-login")
})

app.get('/rider-login', (req, res) => {
    res.render("rider-login")
})

app.get('/rider-booking-dashboard', (req, res) => {
    res.render("rider-booking-dashboard")
})

app.get('/riderequestlist', (req, res) => {
    res.render("riderequestlist")
})

app.get('/bookingstatus', (req, res) => {
    res.render("bookingstatus")
})


// Handle post requests !
app.post('/bookingstatus', async (req, res) => {
    try {
        const { ridername, currentLocation, destination, passengerCount } = req.body;

        const rideRequest = new RideRequest({
            ridername,
            currentLocation,
            destination,
            passengerCount,
            //   timestamp,
            //   status
        });

        // Save the ride request in the database
        await rideRequest.save();
        // Fetch all ride requests from the database
        const allRideRequests = await RideRequest.find();

        // Pass the ride requests data to the template
        res.status(200).render('bookingstatus', { rideRequests: allRideRequests });
    } catch (error) {
        res.status(500).send('Error updating booking status.' + error);
    }
});

// all ride requests for driver 
app.post('/all-ride-requests', async (req, res) => {
    try {
      // Fetch all ride requests from the database
      const allRideRequests = await RideRequest.find();
  
      // Return the ride requests as a JSON response
      res.status(200).render('bookingstatus', { rideRequests: allRideRequests });
    } catch (error) {
      res.status(500).send('Error retrieving ride requests.' + error);
    }
  });
  

//create a driver user in db
app.post('/driverRegistration', async (req, res) => {
    try {

        const driverRegisterUser = new Driver({
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            licensePlate: req.body.licensePlate,
            aadharCard: req.body.aadharCard,
            password: req.body.password
        })

        const registered = driverRegisterUser.save()
        res.status(201).render('bookingstatus')
    } catch (error) {
        res.status(400).send(error)
    }
})

//create a rider user in db
app.post('/rider-booking-dashboard', async (req, res) => {
    try {

        const riderRegisterUser = new Rider({
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password
        })

        const registered = riderRegisterUser.save()
        res.status(201).render('rider-booking-dashboard')
    } catch (error) {
        res.status(400).send(error)
    }
})



//login check in db
app.post('/driver-login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userMail = await Driver.findOne({ email: email })

        //match login details in db
        const isdriverMatch = await bcrypt.compare(password, userMail.password)

        if (isdriverMatch) {
            res.status(201).render('welcomedriver')
        } else {
            res.send('invalid username or password')
        }
    } catch (error) {
        res.status(400).send('invalid username or password')
    }
})

app.post('/rider-login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userMail = await Rider.findOne({ email: email })

        //match login details in db
        const isriderMatch = await bcrypt.compare(password, userMail.password)

        if (isriderMatch) {
            res.status(201).render('rider-booking-dashboard')
        } else {
            res.send('invalid username or password')
        }
    } catch (error) {
        res.status(400).send('invalid username or password')
    }
})


app.listen(port, () => {
    console.log(`server started and running at port no http://localhost:${port}/`);
})