class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }


getFullName(){
    console.log(`Nombre completo ${this.nombre} ${this.apellido}`)
};
 

addMascota(nombre){
    const nuevaMascota = {nombre:nombre}
    console.log(nuevaMascota);
    this.mascotas.push(nuevaMascota);
};

countMascota(){
    const count = this.mascotas.length
    console.log(count)
};
addLibro(nombre){
    const nuevoLibro = {nombre:nombre, autor: autor}
    console.log(nuevoLibro);
    this.libros.push(nuevoLibro);
}; 

getBooksName(){
    let coleccion = this.libros
    let nombre = [];
    coleccion.map(libro=>{
        nombre.push(libro.nombre)
        
    })
    
    console.log(nombre)


};
}
const Usuario1 = new Usuario("Roberto", "Gonzales",[{nombre:"El Señor De Los Anillos", autor:"J. R. R. Tolkien"}],["Kuro","Batman"]);


console.log(Usuario1)
Usuario1.addLibro("Game Of Thrones", "George R. R. Martin")
Usuario1.addMascota("Vampi")
Usuario1.countMascota()
Usuario1.getFullName()
Usuario1.getBooksName()