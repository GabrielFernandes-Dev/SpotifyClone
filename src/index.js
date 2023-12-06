import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import UserModel from "./models/user_model.js";
import cors from "cors";

const app = express();
const port = 3000;
const user_collection = "mongodb://localhost:27017/mydb";
app.use(cors());

await mongoose
  .connect(user_collection, {})
  .then(console.log("Connected to database!"))
  .catch((err) => console.log(err));

app.use(json());
app.use(urlencoded({ extended: true }));

const playlists = [
  {
    id: 1,
    nome: "Lush Lofi",
    capa: "../images/sunset_lofi.jpg",
    musicas: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    nome: "Chill Lofi Beats",
    capa: "../images/lazy_lofi.jpg",
    musicas: [6, 7, 8, 9, 10],
  },
  {
    id: 3,
    nome: "Lofi Beats",
    capa: "../images/aesthetic_lofi.png",
    musicas: [1, 2, 3, 7, 9],
  },
  {
    id: 4,
    nome: "Lofi",
    capa: "../images/new_york.jpg",
    musicas: [3, 2, 1, 9, 6],
  },
  {
    id: 5,
    nome: "Chill Lofi Study",
    capa: "../images/lofi_girl.jpg",
    musicas: [4, 5, 1, 8, 3],
  },
  {
    id: 6,
    nome: "Study Lofi",
    capa: "../images/study_lofi.jpg",
    musicas: [10, 1, 2, 6, 9],
  },
  {
    id: 7,
    nome: "Lofi Rain",
    capa: "../images/R.jpeg",
    musicas: [10, 9, 8, 7, 6],
  },
  {
    id: 8,
    nome: "Relaxing Music",
    capa: "../images/capa-lofi.jpeg",
    musicas: [1, 5, 3, 7, 10],
  },
];

const users = [
  {
    id: 1,
    email: "email@mail.com",
    password: "123456",
    firstName: "Jose",
    terms: true,
    birthday: {
      day: 12,
      month: 4,
      year: 2000,
    },
    registerdate: "27/10/2023",
    playlists: [2, 3],
  },
];

const musicas = [
  {
    idMusica: 1,
    nomeMusica: "Lofi Study",
    localMusica: "src/songs/lofi-study-112191.mp3",
    dataCriacao: "27/12/2023",
    duracao: "2:27",
  },
  {
    idMusica: 2,
    nomeMusica: "Good Night",
    localMusica: "src/songs/good-night-160166.mp3",
    dataCriacao: "22/05/2023",
    duracao: "2:27",
  },
  {
    idMusica: 3,
    nomeMusica: "Coffee Chill Out",
    localMusica: "src/songs/coffee-chill-out-15283.mp3",
    dataCriacao: "02/07/2023",
    duracao: "1:16",
  },
  {
    idMusica: 4,
    nomeMusica: "Lofi Chill",
    localMusica: "src/songs/lofi-chill-medium-version-159456.mp3",
    dataCriacao: "18/10/2023",
    duracao: "1:07",
  },
  {
    idMusica: 5,
    nomeMusica: "Ambient Lofi",
    localMusica: "src/songs/lost-ambient-lofi-60s-10821.mp3",
    dataCriacao: "06/01/2023",
    duracao: "0:58",
  },
  {
    idMusica: 6,
    nomeMusica: "Rain and Nostalgia",
    localMusica: "src/songs/rain-and-nostalgia-version-60s-10820.mp3",
    dataCriacao: "14/04/2023",
    duracao: "1:10",
  },
  {
    idMusica: 7,
    nomeMusica: "Science Documentary",
    localMusica: "src/songs/science-documentary-169621.mp3",
    dataCriacao: "16/06/2023",
    duracao: "2:07",
  },
  {
    idMusica: 8,
    nomeMusica: "Spirit Blossom",
    localMusica: "src/songs/spirit-blossom-15285.mp3",
    dataCriacao: "24/11/2023",
    duracao: "1:48",
  },
  {
    idMusica: 9,
    nomeMusica: "Empty Mind",
    localMusica: "src/songs/empty-mind-118973.mp3",
    dataCriacao: "20/02/2023",
    duracao: "2:55",
  },
  {
    idMusica: 10,
    nomeMusica: "The Weekend",
    localMusica: "src/songs/the-weekend-117427.mp3",
    dataCriacao: "30/08/2023",
    duracao: "2:25",
  },
];

//listar todas as playlists, os usuários e as músicas

app.get("/playlists", (req, res) => {
  res.json(playlists);
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/musicas", (req, res) => {
  res.json(musicas);
});

//listar uma playlist, um usuário ou uma música
app.get("/playlists/:index", (req, res) => {
  const { index } = req.params;
  res.json(playlists[index]);
});

app.get("/users/:index", (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
});

app.get("/musicas/:index", (req, res) => {
  const { index } = req.params;
  res.json(musicas[index]);
});

//buscar email
app.get("/users", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  const user = users.find(
    (user) => user.email == email && user.password == password
  );
  return res.json(user);
});

//buscar nome musica
app.get("/musicas2", (req, res) => {
  const musicapesq = req.query.nomeMusica;
  const song = musicas.find((musica) =>
    musica.nomeMusica.toLowerCase().includes(musicapesq)
  );
  return res.json(song);
});

//criar playlists, usuários e músicas
app.post("/playlists", (req, res) => {
  const newplaylist = req.body;
  playlists.push(newplaylist);
  return res.json(playlists);
});

let nextUserId = 0;

app.post("/users", async (req, res) => {
  const {
    firstName,
    email,
    password,
    birthday,
    playlists,
    registerDate,
    terms,
  } = req.body;

  const id = nextUserId++;

  const User = {
    id,
    firstName,
    email,
    password,
    birthday,
    playlists,
    registerDate,
    terms,
  };

  try {
    await UserModel.create(User);
    return res.status(201).json({ message: "User created!" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

app.post("/musicas", (req, res) => {
  const newmusica = req.body;
  musicas.push(newmusica);
  return res.json(musicas);
});

//editar playlists, usuários e músicas
app.put("/playlists/:id", (req, res) => {
  const index = req.params["id"];
  const playlist = req.body;
  playlists[index] = playlist;
  res.json(playlists);
});

app.put("/users/:id", (req, res) => {
  const index = req.params["id"];
  const user = req.body;
  users[index] = user;
  res.json(users);
});

app.put("/musicas/:id", (req, res) => {
  const index = req.params["id"];
  const musica = req.body;
  musicas[index] = musica;
  res.json(musicas);
});

//apagar playlists, usuários e músicas
app.delete("/playlists/:id", (req, res) => {
  const index = req.params["id"];
  playlists.splice(index, 1);
  res.json(playlists);
});

app.delete("/users/:id", (req, res) => {
  const index = req.params["id"];
  users.splice(index, 1);
  res.json(users);
});

app.delete("/musicas/:id", (req, res) => {
  const index = req.params["id"];
  musicas.splice(index, 1);
  res.json(musicas);
});

app.listen(port, () => {
  console.log(`Ouvindo porta ${port}`);
});
