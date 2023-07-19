module.exports = async (req, res, next)=>{
   const {id} = req.params;
    if (!id) {
       alert('Este id no se encuentra asignado a ningún Artista'); 
   } else {
        next();
   }
}