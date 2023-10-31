import { url, options } from "./constants.js";
import { renderCards, renderLoder } from "./ui.js";



// api işlemleri

export class API{
    constructor() {
        this.songs = [];
    }

    // popüler müzikler için istek atma

    async getPopular() {
    try{
        //api isteği atar
        const res = await fetch (url, options);
        const data = await res.json();
        // class'ta tuttuğumuz bilgileri günceller
        this.songs = data.tracks;
    }catch(err){
      console.log("Popülerverileri alırken hata oluştu")  
    }

    

    }

    // aratılan içeriğe ulaşma
    async searchMusic(query) {
        const res = await fetch (`https://shazam.p.rapidapi.com/search?term=${query}&locale=TR&offset=0&limit=5`,
        options);
    
        const data = await res.json();
        // Bize gelen diziyi işleyeceğiz
        // objelerin içerisindeki trac katmanını aradan kaldıracağız
        console.log('eski hali', data.tracks.hits);
        const newData = data.tracks.hits.map((song) => ({
            ...song.track,

        }))

        // müzikleri ekrana basma
         renderCards(newData);
       
       

    }
}