const mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://kiranarakkal16:kirana@cluster0.47et8bv.mongodb.net/Movies?retryWrites=true&w=majority")
.then(()=>{
    console.log("Movies DB Connected")
})
.catch(err=>console.log(err))

let Schema = mongoose.Schema;

const movieSchema = new Schema({
    movieName:String,
    actor:String,
    actress:String,
    director:String,
    releaseYear:Number,
    camera:String,
    producer:String,
    language:String
});
var movieModel = mongoose.model("movie" , movieSchema);

module.exports = movieModel;