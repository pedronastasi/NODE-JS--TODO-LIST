const express = require('express')
const bodyParser = require('body-parser')
const mondoDBconnection = require('./database/db')
const { modelNote } = require('./model/Notes')
const date = require('./date')
const list = require('./model/list')
const _ = require('lodash')




const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// const items = ["Buy Food", "Cook Food", "Eat Food"]
// const workItems = []



app.get("/:customListName", async (req, res) => {

    const customListName = _.capitalize(req.params.customListName)


    try {

        const lista = await list.findOne({ name: customListName })
        // console.log(lista)

        res.render('list', {
            listTitle: lista.name, newListItems: lista.items
        })




    } catch (error) {

        // console.log('error')
        res.render('list', {
            listTitle: customListName, newListItems: null
        })
    }

})

app.post('/:customListName', async (req, res) => {
    const customListName = _.capitalize(req.params.customListName)

    const item = req.body.newItem

    const lista = await list.findOne({ name: customListName })
    // console.log(lista)

    if (!lista) {
        try {
            const note = await list.create({ name: customListName, items: [{ name: item }] })
            res.redirect('/' + customListName)
        } catch (error) {
            console.log(error)
        }

    } else {
        try {
            const note = await list.findOneAndUpdate(
                { name: customListName },
                { $push: { items: { name: item } } })

            // console.log(note)

            // res.status(200).json({
            //     note
            // })
            res.redirect('/' + customListName)
        } catch (error) {
            res.status(404).json({ error })
        }
    }

})


app.get("/", async (req, res) => {



    try {

        const note = await modelNote.find()
        // console.log(note)
        res.render('list', {
            listTitle: date.getDate(), newListItems: note
        })
    } catch (error) {
        // res.status(500).json({ "error msg": error })
        // console.log('error')
        res.render('list', {
            listTitle: date.getDate(), newListItems: null
        })
    }


})

app.post('/', async (req, res) => {

    // if (req.body.botton === "WorkList"){
    //     var item = req.body.newItem
    //     console.log(item)
    //     workItems.push(item)
    //     // res.render('list', { newListItem: req.body.newItem})
    //     res.redirect('/work')

    // }else{
    const name = req.body.newItem
    console.log(name)
    try {
        const note = await modelNote.create({ name })
        // res.status(200).json({
        //     note
        // })
    } catch (error) {
        res.status(404).json({ error })
    }


    // res.render('list', { newListItem: req.body.newItem})
    res.redirect('/')
    // }



})


app.get('/delete/:id', async (req, res) => {

    console.log(req.params.id)
    console.log(req.query.list)
    const customListName = req.query.list

    const _id = req.params.id


    if (req.query.list == date.getDate()) {
        modelNote.findOneAndDelete(req.params.id, (err) => {
            if (!err) {
                console.log("succesfully deleted checked item")
            }
        })
        res.redirect('/')
    } else {

        try {
            await list.findOneAndUpdate(
                { name: customListName },
                { $pull: { items: { _id } } })

            res.redirect('/' + customListName)
        } catch (error) {
            res.json(error)
            throw error

        }



    }


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


app.listen(3000, () => {
    console.log("server started on port 3000")
    mondoDBconnection()
})