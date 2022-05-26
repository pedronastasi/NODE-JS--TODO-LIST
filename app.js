const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname + "/date.js")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems = []

app.get("/", (req, res) => {


    



    res.render('list', { listTitle: date.getDate(), newListItems: items })

})

app.post('/', (req, res) => {

    // if (req.body.botton === "WorkList"){
    //     var item = req.body.newItem
    //     console.log(item)
    //     workItems.push(item)
    //     // res.render('list', { newListItem: req.body.newItem})
    //     res.redirect('/work')

    // }else{
    const item = req.body.newItem
    console.log(item)
    items.push(item)
    // res.render('list', { newListItem: req.body.newItem})
    res.redirect('/')
    // }



})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "WorkList", newListItems: workItems })
})

app.post("/work", (req, res) => {
    const item = req.body.newItem
    workItems.push(item)
    res.redirect('/work')
})

app.get("/about", (req, res) => {
    res.render("about")
})


app.listen(3000, () => console.log("server started on port 3000"))