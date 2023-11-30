const cors = require('cors')
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 3000
const uri = "mongodb+srv://spotifyclone:qroiv2@cluster0.iugrhct.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  await client.connect();
}

connect()

//listar todas as playlists, os usuários e as músicas
app.get('/playlists', async (req, res) => {
  const id = req.query.id
  try {
    const db = client.db("spotifyclone")
    var playlists = ""
    if(id){
      playlists = await db.collection("playlists").find(new ObjectId(id)).toArray()
    }
    else{  
      playlists = await db.collection("playlists").find().toArray()
    }
    res.json(playlists)
  } catch (e) {
    console.log(e)
  } 
})

app.get('/users', async (req, res) => {
  const id = req.query.id
  try {
    const db = client.db("spotifyclone")
    var users = ""
    if(id){
      users = await db.collection("playlists").find(new ObjectId(id)).toArray()
    }
    else{  
      users = await db.collection("playlists").find().toArray()
    }
    res.json(users)
  } catch (e) {
    console.log(e)
  } 
})

app.get('/musicas', async (req, res) => {
  const nome = req.query.nome
  try {
    const db = client.db("spotifyclone")
    var musicas = ""
    if(nome){
      musicas = await db.collection("musicas").find({
        "nomeMusica": {
          "$regex": nome,
          "$options": "i"
        }
      }).toArray()
    }
    else{  
      musicas = await db.collection("musicas").find().toArray()
    }
    res.json(musicas)
  } catch (e) {
    console.log(e)
  } 
})



/*app.get('/musicas/:index', (req, res) => {
  const {index} = req.params
  res.json(musicas[index])
})*/

//buscar email
app.get('/users', async (req, res) => {
  const email = req.query.email
  try{
    const user = await client.db("spotifyclone").collection("users").find({_email:email})
  res.json(user)
  } catch (e) {
    console.log(e)
  }
})

//buscar nome musica
/*app.get('/musicas2', (req, res) => {
  const musicapesq = req.query.nomeMusica
  const song = musicas.filter(musica => musica.nomeMusica.toLowerCase().includes(musicapesq))
  return res.json(song)
})

//criar playlists, usuários e músicas
app.post('/playlists', (req,res) => {
  const newplaylist = req.body
  playlists.push(newplaylist)
  return res.json(playlists)
})

app.post('/users', (req,res) => {
  const newuser = req.body
  users.push(newuser)
  return res.json(users)
})

app.post('/musicas', (req,res) => {
  const newmusica = req.body
  musicas.push(newmusica)
  return res.json(musicas)
})

//editar playlists, usuários e músicas
app.put('/playlists/:id', (req,res) => {
  const index = req.params['id']
  const playlist = req.body
  playlists[index] = playlist
  res.json(playlists)
})

app.put('/users/:id', (req,res) => {
  const index = req.params['id']
  const user = req.body
  users[index] = user
  res.json(users)
})

app.put('/musicas/:id', (req,res) => {
  const index = req.params['id']
  const musica = req.body
  musicas[index] = musica
  res.json(musicas)
})

//apagar playlists, usuários e músicas
app.delete('/playlists/:id', (req,res) => {
  const index = req.params['id']
  playlists.splice(index, 1)
  res.json(playlists)
})

app.delete('/users/:id', (req,res) => {
  const index = req.params['id']
  users.splice(index, 1)
  res.json(users)
})

app.delete('/musicas/:id', (req,res) => {
  const index = req.params['id']
  musicas.splice(index, 1)
  res.json(musicas)
})*/

app.listen(port, () => {
  console.log(`Ouvindo porta ${port}`)
})