import {API} from "./scripts/api.js"
import {ele, renderCards, renderLoder, renderPlayingInfo} from "./scripts/ui.js";
renderCards
// class'ın br örneğini oluşturma
const api = new API();


document.addEventListener('DOMContentLoaded', async () => {
    renderLoder();
    await api.getPopular();
    renderCards(api.songs);
});


// müzik listesindeki tıklanma olayını izler

ele.list.addEventListener('click', (e) => {
    if(e.target.id === 'play-btn'){
        // oynat butonuna en yakın olan .card class'ına sahip elemanı alma
        const parent = e.target.closest(".card");

        // müziğin bilgilerini ekrana basma
        renderPlayingInfo(parent.dataset);
    }

});

// arama formu gönderildiğinde
ele.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // aratılan terime erişme
    const query = e.target[0].value;

    // form boşsa fonksiyon durdurma
    if (!query) return;

    // ekrana loading basma
    renderLoder();


    // arama sonrasu başlığı güncelleme
    ele.title.innerHTML = `${query} İçin Sonuçlar`;

    // Api'den şarkıları alma
    api.searchMusic(query);
})