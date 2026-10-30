const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// СПИСОК АНИМЕ (Просто пишите их сюда текстом, базы данных больше не нужны!)
const myAnimeList = [
  { 
    title: "Наруто", 
    rating: "8.7", 
    episodes: "220 серий", 
    image: "https://pibig.info", 
    videoUrl: "https://w3schools.com" // Здесь будет ваше видео
  },
  { 
    title: "Клинок, рассекающий демонов", 
    rating: "8.9", 
    episodes: "Все сезоны", 
    image: "https://forfun.com", 
    videoUrl: "https://w3schools.com"
  },
  { 
    title: "Атака титанов", 
    rating: "8.7", 
    episodes: "Финал", 
    image: "https://goodfon.ru", 
    videoUrl: "https://w3schools.com"
  }
];

// Отдаем этот список фронтенду
app.get('/api/anime', (req, res) => {
  res.json(myAnimeList);
});

// Открываем главную страницу
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
