//Main app

//Setup Dependencies
const path = require('path')
const express = require('express')
const axios = require('axios')
const ejs = require('ejs')

//Configure Express
const app = express()
const port = process.env.PORT || 3000

//Set Path for client views and assets
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../views')

app.set('view engine', 'ejs')
app.set('views', viewsDir)

app.use(express.static(publicDir))

//Main Comic page
app.get('', (req, res)=>{
    res.redirect('/0')

})

//Comic page with number parameter
app.get('/:num', (req,res)=>{
    var comicNum = req.params.num
    if(!Number.isInteger(Number(comicNum))){
        return res.send('error')
    }
    //Check to see if latest comic is required
    if(comicNum === '0') {
        comicNum = ''
        
    }
    //GET call from api
    axios.get('https://xkcd.com/'+comicNum+'/info.0.json').then((response) => {
        if(response.error){
            return response.error
        }
        return response.data
    }).then(({num, safe_title, day, month, year, img, alt, transcript}) => {
        //Send retrieved data to index view
        res.status(200).render(viewsDir +'/index', {
            title: safe_title,
            day,
            month,
            year,
            img,
            alt,
            transcript: transcript.replace(/\n/g,'<br><br>') //Replace \n with <br> tags
        })
    });
    
    
})

//404
app.get('/*', (req, res)=>{
    return res.send(404)
})



app.listen(port, ()=>{
    console.log('Server up on '+ port)
})