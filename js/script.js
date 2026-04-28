// Функция для получения данных от NOAA
async function checkTornadoAlerts() {
    const ticker = document.getElementById('ticker-content');
    const bar = document.getElementById('ticker-bar');

    try {
        // Делаем запрос к API метеослужбы США (фильтруем только Tornado Warning)
        const response = await fetch('https://api.weather.gov/alerts/active?event=Tornado%20Warning');
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            // Если торнадо есть — берем заголовки всех предупреждений и соединяем их
            const alerts = data.features.map(f => f.properties.headline).join(' | ');
            
            bar.classList.remove('status-safe');
            bar.classList.add('status-danger');
            ticker.innerHTML = `⚠️ ВНИМАНИЕ: ${alerts} | ПРОВЕРЬТЕ УКРЫТИЯ!`;
        } else {
            // Если торнадо нет
            bar.classList.remove('status-danger');
            bar.classList.add('status-safe');
            ticker.innerHTML = "✅ Активных предупреждений о торнадо в США на данный момент не зафиксировано. Ситуация стабильна.";
        }
    } catch (error) {
        // Если интернет отвалился или API не отвечает
        console.error("Ошибка API:", error);
        ticker.innerHTML = "📡 Ожидание связи со спутниками NOAA...";
    }
}

// Запускаем проверку при загрузке страницы
checkTornadoAlerts();

// Обновляем данные каждые 5 минут (300 000 миллисекунд), чтобы инфа была свежей
setInterval(checkTornadoAlerts, 300000);

// БУРГЕР-МЕНЮ (Адаптация)

const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

// Проверяем, есть ли на странице эти элементы (чтобы не было ошибок)
if (hamburger && navMenu) {
    // При клике на бургер добавляем/убираем класс 'active'
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Когда кликаем по любой ссылке в меню — закрываем его
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}