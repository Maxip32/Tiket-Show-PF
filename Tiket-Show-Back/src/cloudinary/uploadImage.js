const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME ,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};

const uploadImage = (image) =>{ //image = >base64
        return new Promise ((resolve, reject)=>{
            cloudinary.uploader.upload(image, opts, (error, result)=>{
                if (result && result.secure_url){
                    console.log(result.secure_url);
                    return resolve(result.secure_url)
                }
                console.log(error.message);

            })
        })
}

module.exports = {uploadImage}