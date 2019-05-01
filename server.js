require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const Company = require('./models/company.js')
const Car = require('./models/car.js')
const Driver = require('./models/driver.js')

const methodOverride = require('method-override');
const ejs = require('ejs');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/companies', { useNewUrlParser: true })
    .then(() => console.log("Mongodb"))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//CAR INDEX
app.get('/cars', (req, res) => {
    Car.find().populate({ path: 'companies', select: 'name' })
        .sort('-createdAt')
        .then(cars => {
            res.render('cars/index', { cars })
        })
})


//CAR NEW 
app.get('/cars/new', (req, res) => {
    Company.find()
        .then(companies => {
            res.render('cars/new', { companies })
        })
});

//CAR POST
app.post('/cars', (req, res) => {
    let car = new Car(req.body)
    let companies = req.body.arrayOfCompanies

    if (Array.isArray(companies)) {
        companies.forEach(companyId => {
            car.companies.push(companyId)
        })
    } else {
        car.companies.push(companies)
    }

    car.save()
        .then(car => {
            console.log(car)
            res.redirect('/cars')
        })
})


//CARS SHOW
app.get('/cars/:indexOfCarsArray', (req, res) => {
    Car.findById(req.params.indexOfCarsArray)
        .then((car) => {
            res.render('cars/show', {
                car
            })
        });
});

//CARS EDIT
app.get('/cars/:index/edit', (req, res) => {
    let companies = []
    Company.find()
        .then(f => {
            companies = f
        })
    Car.findById(req.params.index)
        .then(car => {
            res.render('cars/edit', { car, companies }) //Company.find()
        })
})


//CARS DELETE
app.delete('/cars/:indexOfCarsArray', (req, res) => {
    Car.findByIdAndDelete(req.params.indexOfCarsArray)
        .then(() => {
            res.redirect('/cars');
        })
})

//CARS PUT
app.put('/cars/:indexOfCarsArray', (req, res) => {
    let updatedCar = req.body
    Car.findByIdAndUpdate(req.params.indexOfCarsArray, updatedCar)
        .then(car => {
            res.redirect(`/cars/${car._id}`);
        })
})

//DRIVER INDEX
app.get('/drivers', (req, res) => {
    Driver.find().populate({ path: 'companies', select: 'name' })
        .sort('-createdAt')
        .then(drivers => {
            res.render('drivers/index', { drivers })
        })
})

//DRIVER NEW 
app.get('/drivers/new', (req, res) => {
    Company.find()
        .then(companies => {
            res.render('drivers/new', { companies })
        })
});


//DRIVER POST
app.post('/drivers', (req, res) => {
    let driver = new Driver(req.body)
    let companies = req.body.arrayOfCompanies

    if (Array.isArray(companies)) {
        companies.forEach(companyId => {
            driver.companies.push(companyId)
        })
    } else {
        driver.companies.push(companies)
    }

    driver.save()
        .then(driver => {
            console.log(driver)
            res.redirect('/drivers')
        })
})


//DRIVERS SHOW
app.get('/drivers/:indexOfDriversArray', (req, res) => {
    Driver.findById(req.params.indexOfDriversArray)
        .then((driver) => {
            res.render('drivers/show', {
                driver
            })
        });
});

//DRIVERS EDIT
app.get('/drivers/:index/edit', (req, res) => {
    let companies = []
    Company.find()
        .then(f => {
            companies = f
        })
    Driver.findById(req.params.index)
        .then(driver => {
            res.render('drivers/edit', { driver, companies }) //Company.find()
        })
})


//DRIVERS DELETE
app.delete('/drivers/:indexOfDriversArray', (req, res) => {
    Driver.findByIdAndDelete(req.params.indexOfDriversArray)
        .then(() => {
            res.redirect('/drivers');
        })
})


//DRIVERS PUT
app.put('/drivers/:indexOfDriversArray', (req, res) => {
    let updatedDriver = req.body
    Driver.findByIdAndUpdate(req.params.indexOfDriversArray, updatedDriver)
        .then(driver => {
            res.redirect(`/drivers/${driver._id}`);
        })
})

//INDEX
app.get('/companies', (req, res) => {
    Company.find()
        .then((companies) => {
            console.log(companies)
            res.render('index', { companies });

        }).catch(err => console.log(err))
});

//NEW
app.get('/companies/new', (req, res) => {
    res.render('new');
});

app.post('/companies', (req, res) => {
    console.log(req.body)
    let driver = new Driver({
        name: req.body.driverName,
        age: ,
        image:

    })
    let company = new Company(req.body)

    company.drivers.push(driver)
    company.cars.push(car)
    company.save()
        .then(company => {
            console.log(company)
            res.redirect('/companies')
        })

})




app.listen(port, () => {
    console.log(`I am listening on port", ${port}`)
});


/////////////////////////

// //POST
// app.post('/fruits', (req, res) => {
//     let data = new Fruit({
//         name: req.body.name,
//         color: req.body.color,
//     })

//     if (req.body.readyToEat === 'on') {
//         data.readyToEat = true
//     } else {
//         data.readyToEat = false
//     }

//     let fruit = new Fruit(data)

//     console.log(req.body)
//     fruit.save()
//         .then(() => {
//             res.redirect('/fruits');
//         }).catch(err => console.log(err))
// });


// //SHOW
// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//     Fruit.findById(req.params.indexOfFruitsArray)
//         .then((fruit) => {
//             res.render('show', {
//                 fruit: fruit
//             })
//         });
// });

// // create
// app.post('/fruits', (req, res) => {
//     console.log(req.body)

//     fruits.push(req.body)
//     res.redirect('/fruits')
// })




// //EDIT
// app.get('/fruits/:indexOfFruitsArray/edit', (req, res) => {
//     res.render(
//         'edit.ejs', //render views/edit.ejs
//         { //pass in an object that contains
//             fruit: fruits[req.params.indexOfFruitsArray], //the fruit object
//             index: req.params.indexOfFruitsArray //... and its index in the array
//         }
//     )
// })

// //DELETE 
// app.delete('/fruits/:indexOfFruitsArray', (req, res) => {
//     fruits.splice(req.params.index, 1); //remove the item from the array
//     res.redirect('/fruits');  //redirect back to index route
// });



// app.put('/fruits/:index', (req, res) => { // :index is the index of our fruits array that we want to change
//     if (req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false
//     }
//     fruits[req.params.index] = req.body //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
//     res.redirect('/fruits'); //redirect to the index page
// })