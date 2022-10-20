
class Customers{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;


    }
    addId(data) {
		const ids = data.map((item) => item.id);
		const maxId = Math.max(...ids);
		let addId = maxId === -Infinity ? 0 : maxId;
		addId++;
		return addId;
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
                    return producto;
                } else{
                    return "Archivo vacio"
                }
            }
        } catch (error){
            console.log(error)
        }
    }

    async getAll() {
		try {
			const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
			if (contenido) {
				const data = JSON.parse(contenido);
				return data;
			} else {
				throw new Error('No se encontró ningún producto mostrar');
			}
		} catch (error) {
			console.log(error);
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
    updateById = async(id, body)=>{
        try {
            const productos = await this.getAll();
            const productPos = productos.findIndex(elm=>elm.id === id);
            productos[productPos] = {
                id:id,
                ...body
            };
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2))
            return productos;
        } catch (error) {
            console.log(error)
        }
    }


    
}

export {Customers}