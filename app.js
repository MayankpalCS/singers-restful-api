express=require("express")
parser=require("body-parser")
ejs=require("ejs")
mongoose=require("mongoose")
_=require("lodash")
app=express()
app.use(parser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/apil')
const schema=mongoose.Schema({
  singer:{type:String},
  song:{type:String}
})

const modelp=mongoose.model('sop',schema)
app.route('/singers').get(async (req,res)=>{
  const response=await modelp.find({})
  res.send(response)
}).delete(
  async (req,res)=>{
    const respone=await modelp.deleteMany({})
    res.send(respone)
  }
).post(async(req,res)=>{
  singer=req.body.singer
  song=req.body.song
  const response=await modelp.create({
    singer:singer,
    song:song
  })
  res.send(response)
})
app.get('/singers/:singer', async (req,res)=>{
  singerobjarr=[]
  singer=req.params.singer
  const response=await modelp.find({})
  for(var i=0;i<response.length;i++){
    if(response[i].singer==singer){
      singerobjarr.push(response[i])

    }

    }
    res.send(singerobjarr)
  })
app.delete('/singers/:song',async (req,res)=>{
  song=req.params.song
  const response=await modelp.find({})
  for(var i=0;i<response.length;i++){
    if(_.lowerCase(song)==_.lowerCase(response[i].song)){
      const resp=await modelp.deleteOne({
        song:response[i].song
      })
      res.send(resp)
    }
  }
})
app.listen(3000,function(req,res){
  console.log('server started at port 3000')
})
