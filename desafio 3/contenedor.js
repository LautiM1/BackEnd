
const fs = require("fs");

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    save = async(product)=>{
        try {
            if(fs.existsSync(this.nombreArchivo)){
                const contenido = await fs.promises.readFile(this.nombreArchivo,"utf8");
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const lastIdAdded = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                    const nuevoProducto={
                        id: lastIdAdded+1,
                        ...product
                    }
                    productos.push(nuevoProducto);
                    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2))
                } else{
                    const nuevoProducto={
                        id:1,
                        ...product
                    }
                    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([nuevoProducto], null, 2));
                }
            } else{
                const nuevoProducto={
                    id:1,
                    ...product
                }
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([nuevoProducto], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async(id)=>{
        try{
            if(fs.existsSync(this.nombreArchivo)){
                const contenido = await fs.promises.readFile(this.nombreArchivo)
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.id===id);
                    return producto
                } else{
                    return "Archivo vacio"
                }
            }
        } catch (error){
            console.log(error)
        }
    }

    getAll = async()=>{
        try{
            const contenido =await fs.promises.readFile(this.nombreArchivo)
            const productos = JSON.parse(contenido);
            return productos
        } catch (error){
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try {
            const contenido = await fs.promises.readFile(this.nombreArchivo,"utf8");
            const productos = JSON.parse(contenido);
            const nuevoProducto = productos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(nuevoProducto, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async()=>{
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }


    
}

const lista = new Contenedor("productos.txt")
const remera1 = {
    title:"camisa",
    price:300,
    thumbnail:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.com.ar%2FRemera-Anime-Hunter-%25C3%2597-Hunter-i.634697977.12773557119%3Fsp_atk%3Dc78535a5-9328-4a1c-bbbe-ca6e714f194a%26xptdk%3Dc78535a5-9328-4a1c-bbbe-ca6e714f194a&psig=AOvVaw3Ds-lrX0ySIqt2DT3QEbO1&ust=1664022658180000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJiTys_1qvoCFQAAAAAdAAAAABAD"
}
const remerRepetida = {
    title:"camisa",
    price:300,
    thumbnail:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fshopee.com.ar%2FRemera-Anime-Hunter-%25C3%2597-Hunter-i.634697977.12773557119%3Fsp_atk%3Dc78535a5-9328-4a1c-bbbe-ca6e714f194a%26xptdk%3Dc78535a5-9328-4a1c-bbbe-ca6e714f194a&psig=AOvVaw3Ds-lrX0ySIqt2DT3QEbO1&ust=1664022658180000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJiTys_1qvoCFQAAAAAdAAAAABAD"
}
const remera2 = {
    title:"camisa",
    price:100,
    thumbnail:"https://www.google.com/url?sa=i&url=https%3A%2F%2Flistado.mercadolibre.com.ar%2Fremera-anime-aesthetic&psig=AOvVaw2bOILHx7jzsCIYgOeY0JFK&ust=1664022692220000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIiPrt71qvoCFQAAAAAdAAAAABAD"
}

const remera3 = {
    title:"camisa",
    price:200,
    thumbnail:"https://www.google.com/url?sa=i&url=http%3A%2F%2Frecibos.escuelafatima.com.ar%2Fkeyo.aspx%3Fcname%3Dremera%2Blevi%2Backerman%26cid%3D114&psig=AOvVaw2bOILHx7jzsCIYgOeY0JFK&ust=1664022692220000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIiPrt71qvoCFQAAAAAdAAAAABAI"
}

const crearProducto = async()=>{
    await lista.save(remera1);
    await lista.save(remera2);
    await lista.save(remera3);
    const resultadoId = await lista.getById(1);
    console.log(resultadoId)
    const productos = await lista.getAll();
    console.log(productos)
    await lista.deleteById(2);
    await lista.save(remera2);
}

crearProducto();