import { Router } from "express";
import {Customers} from '../components/Customers.js'
const router = Router()
const customers = new Customers()
router.get('/',(req,res)=> {
    res.render('home')
})

router.post('/api/customers',(req,res)=>{
    customers.addId(req.body)
    console.log(customers.getAll())
    res.sendStatus(200)
})

export { router }