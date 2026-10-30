const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Настройка работы со статическими файлами фронтенда и JSON
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Подключение к публичной бесплатной тестовой базе MongoDB Atlas (для демонстрации)
// В будущем вы сможете заменить этот URL на свою собственную строку подключения
const mongoURI = 'mongodb+srv://public_user:public_pass123@cluster0.v9fjk.mongodb.net/animeDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => console.log('Успешное подключение к MongoDB Atlas'))
  .catch(err => console.error('Ошибка подключения к базе данных:', err));

// Создание схемы данных для Аниме
const animeSchema = new mongoose.Schema({
  title: String,
  rating: String,
  episodes: String,
  image: String,
  videoUrl: String
});
const Anime = mongoose.model('Anime', animeSchema);

// API Эндпоинт: Получить список всех аниме из базы данных
app.get('/api/anime', async (req, res) => {
  try {
    const animeList = await Anime.find();
    
    // Если база данных пуста, вернем временные тестовые данные, чтобы сайт сразу работал
    if (animeList.length === 0) {
      return res.json([
        { title: "Наруто", rating: "8.7", episodes: "Все серии", image: "https://unsplash.com", videoUrl: "https://w3schools.com" },
        { title: "Клинок, рассекающий демонов", rating: "8.9", episodes: "5 серия 4 сезона", image: "https://unsplash.com", videoUrl: "https://w3schools.com" },
        { title: "Магическая битва", rating: "8.5", episodes: "Вышел полностью", image: "https://unsplash.com", videoUrl: "https://w3schools.com" }
      ]);
    }
    
    res.json(animeList);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запуск веб-сервера
app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT}`);
});
