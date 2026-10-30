const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// === НАСТРОЙКИ SUPABASE (ВАШИ КЛЮЧИ НАСТРОЕНЫ) ===
const SUPABASE_URL = 'https://supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvanF1dmlicnZyY2ZkbWhudG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzNDY4NTgsImV4cCI6MjEwODkyMjg1OH0.bERVJNQwQT3zxjTwwWG1NdyvL7ndlaWziEDxqpA6lss'; 

// API Эндпоинт: Получает список аниме напрямую из вашей базы Supabase
app.get('/api/anime', async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/anime?select=*`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Ошибка Supabase: ${response.statusText}`);
    }

    const animeList = await response.json();
    
    // Если вы еще не успели добавить аниме в таблицу через панель Supabase,
    // этот блок выдаст временные карточки, чтобы сайт не выглядел пустым
    if (animeList.length === 0) {
      return res.json([
        { title: "Наруто (База данных пуста)", rating: "8.7", episodes: "Все серии", image: "https://unsplash.com", videoUrl: "https://w3schools.com" },
        { title: "Клинок, рассекающий демонов", rating: "8.9", episodes: "1 серия", image: "https://unsplash.com", videoUrl: "https://w3schools.com" }
      ]);
    }

    res.json(animeList);
  } catch (error) {
    console.error('Ошибка при запросе к базе данных:', error);
    // Резервный список на случай сбоя сети
    res.json([
      { title: "Отредактируйте таблицу в Supabase", rating: "0.0", episodes: "Инструкция на экране", image: "https://unsplash.com", videoUrl: "https://w3schools.com" }
    ]);
  }
});

// Маршрут для отдачи главной страницы (намертво решает проблему Cannot GET /)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер успешно запущен на порту ${PORT} с базой Supabase`);
});
   
