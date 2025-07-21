// source/js/weather.js
document.addEventListener('DOMContentLoaded', function() {
    const weatherWidget = document.createElement('div');
    weatherWidget.id = 'weather-widget';
    weatherWidget.innerHTML = '⏳ 获取天气中...'; // 加载中提示
    document.body.appendChild(weatherWidget);

    // 替换成你的心知天气 API Key
    const apiKey = 'SX2suGCLyZZbp86Pv';

    // 1. 尝试获取用户地理位置
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error('定位失败:', error);
                fetchWeatherByCity('auto:ip'); // 失败时回退到 IP 定位
            }
        );
    } else {
        fetchWeatherByCity('auto:ip'); // 浏览器不支持定位时使用 IP 定位
    }

    // 2. 根据经纬度获取天气
    function fetchWeatherByCoords(lat, lon) {
        const apiUrl = `https://api.seniverse.com/v3/weather/now.json?key=${apiKey}&location=${lat}:${lon}&language=zh-Hans&unit=c`;
        fetchWeather(apiUrl);
    }

    // 3. 根据城市名/IP获取天气
    function fetchWeatherByCity(city) {
        const apiUrl = `https://api.seniverse.com/v3/weather/now.json?key=${apiKey}&location=${city}&language=zh-Hans&unit=c`;
        fetchWeather(apiUrl);
    }

    // 4. 调用心知天气 API
    function fetchWeather(apiUrl) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results[0]) {
                    const weather = data.results[0].now;
                    const location = data.results[0].location.name;

                    // 天气图标映射
                    const iconMap = {
                        '晴': '☀️',
                        '多云': '⛅',
                        '阴': '☁️',
                        '雨': '🌧️',
                        '雪': '❄️',
                    };
                    const weatherIcon = iconMap[weather.text] || '🌤️';

                    weatherWidget.innerHTML = `${weatherIcon} ${weather.temperature}°C | ${weather.text} | ${location}`;
                } else {
                    weatherWidget.innerHTML = '😢 天气数据无效';
                }
            })
            .catch(error => {
                console.error('天气获取失败:', error);
                weatherWidget.innerHTML = '🌐 网络错误，请刷新';
            });
    }
});