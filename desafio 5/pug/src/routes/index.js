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
    try {
        const { name, age, picture } = req.body;
    
        const addId = {
          name: name,
          age: age,
          picture: picture,
        };
    
        addId(addIds);
        
        return res.redirect("/");
      } catch (error) {
        res.send(error);
      }
    });

export { router }