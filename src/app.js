//Main app
const path = require('path')
const express = require('express')
const axios = require('axios')
const ejs = require('ejs')
const { response } = require('express')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../views')

app.set('view engine', 'ejs')
app.set('views', viewsDir)

app.use(express.static(publicDir))

app.get('', (req, res)=>{
    console.log('main')
    res.redirect('/0')

})

app.get('/:num', (req,res)=>{
    console.log('num', req.params.num)
    var comicNum = req.params.num
    console.log(comicNum)
    if(!Number.isInteger(Number(comicNum))){
        return res.send('error')
    }

    if(comicNum === '0') {
        comicNum = ''
        
    }
    console.log('new', 'https://xkcd.com/'+comicNum+'/info.0.json')
    axios.get('https://xkcd.com/'+comicNum+'/info.0.json').then((response) => {
        if(response.error){
            return response.error
        }
        return response.data
    }).then(({num, safe_title, day, month, year, img, alt, transcript}) => {
        res.status(200).render(viewsDir +'/index', {
            title: safe_title,
            day,
            month,
            year,
            img,
            alt,
            transcript: transcript.replace(/\n/g,'<br><br>')
        })
    });
    
    
})

app.get('/*', (req, res)=>{
    return res.send(404)
})



app.listen(port, ()=>{
    console.log('Server up on 3000!')
})