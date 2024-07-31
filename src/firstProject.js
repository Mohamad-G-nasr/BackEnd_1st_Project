const geocode = require("./tools/geocode")
const forcast = require("./tools/forcast")
const express = require("express")

const app = express()

const port = process.env.PORT || 3000

const path = require("path")

const MyProject = path.join(__dirname, '../public')

app.use(express.static(MyProject))

app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('index')
})


app.get('/weather' , (req, res) => {
    if (!req.query.address) {
        return res.send({
            error : "YOU MUST PROVIDE AN ADDRESS"
        })
    } else {
        geocode(req.query.address, (error, datageo) => {

            if (error) {
                return res.send({error})
            } else {
                
                forcast(datageo.latitude, datageo.longtitude, (error, datacast) => {
                    if (error) {
                        return res.send({error})
                    } else {
                        res.send({
                            forcast : datacast,
                            location : req.query.address,
                            latit : datageo.latitude,
                            longtit : datageo.longtitude
                        })
                    }
                })
                }
        })
    }
}) 


app.get('*', (req, res) => {
    res.send('PAGE NOT FOUND')
}) 

app.listen(port, () => {
    console.log("app listening on port 3000")
})