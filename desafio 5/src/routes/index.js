import { Router } from "express";
import {Customers} from '../components/Customers.js'
const router = Router()
const customers = new Customers()
router.get('/',(req,res)=> {
    res.render('home')
})

router.get('/customers', (req, res)=>{
    res.render('customers', {customers : customers.getAll()})
})

router.post('/api/customers',(req,res)=>{
    customers.addId(req.body)
    console.log(customers.getAll())
    res.redirect('/')
}) 

export { router }