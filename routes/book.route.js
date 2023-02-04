const express = require(`express`)
const app = express()
app.use(express.json())

app.get("/", bookController.getAllBooks)
app.post("/find", bookController.findBook)
app.post("/", [upload.single(`cover`)], bookController.addBook)
app.put("/:id", bookController.updateBook)
app.delete("/:id", bookController.deleteBook)

module.exports = app