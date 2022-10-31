const { Router } = require("express")

const router = Router()
const customers = []
const mensajes = []
router.get('/',(req,res)=> {
    res.render('form', {customers})
})

router.get('/chat',(req,res)=>{
    res.render('chat',{mensajes})
}) 

module.exports = router, mensajes, customers;