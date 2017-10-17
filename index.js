const express = require('express')
const multer = require('multer')
const ejs = require('ejs')
const path = require('path')

const storage = multer.diskStorage({
  destination :'./public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }

});

const upload = multer({
  storage:storage
}).single('myImage')

const app = express()

app.set('view engine' ,'ejs')
app.use(express.static('./public'))

app.get('/',(req,res)=>res.render('index'))
app.post('/upload',(req,res) =>{
  upload(req,res,(err) =>{
    if (err) {
      res.render('index',err)
    }
    else{
      console.log(req.file);
      res.render('index',{
        file:'uploads/${req.fil.filename}'
      })
    }
  } )
})

const port = 7777

app.listen(port,()=>{
console.log(`server started on ${port}`);
})
