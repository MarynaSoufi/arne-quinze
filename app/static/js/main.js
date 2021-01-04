const artUrl = "https://www.pgm.gent/data/arnequinze/art.json";
(()=> {
    const app = {
        init(){
            this.cacheElements();
            this.fetchAtelierLocalData();
            this.fetchArtData();
            
        },
        cacheElements(){
            this.atelierList = document.querySelector('.atelier-js');
            this.atelierPage = document.querySelector('.atelier_page-js');

        },
        async fetchAtelierLocalData() {
            try {
                const response = await fetch("../../app/data/atelier.json");
                const jsonData = await response.json();
                console.log(jsonData);
                this.updateAtelierList(jsonData);
                this.updateAtelierPage(jsonData);
            }catch(error) {
                console.error(error);
            } 
        },
        async fetchArtData() {
            try {
                const response = await fetch(artUrl);
                const jsonData = await response.json();
                console.log(jsonData);
                this.updateArtList(jsonData);
            }catch(error) {
                console.error(error);
            } 
        },
        updateAtelierList(jsonData) {
            const data = jsonData.atelier;
            const arr = [];
            let str = "";
            if(this.atelierList) {
                data.forEach((e) => {
                    if(!arr.includes(e) && arr.length < 3) {
                        arr.push(e);
                    }
                });
                arr.forEach((e) => {
                    str += `<li><a href="#"><img src="static/img/${e.img}" loading="lazy"></a><h3>${e.subtitle}</h3><h2>${e.title}</h2><p>${e.description}</p><a class="more" href="atelier-studio/visiting-mons-again/index.html">Learn More</a></li>`;
                });
                this.atelierList.innerHTML = str;
            }
        },
        updateAtelierPage(jsonData) {
            const data = jsonData.atelier;
            let str = "";
            if(this.atelierPage) {
                data.forEach((e) => {
                    str += `<li><a href="#"><img src="../static/img/${e.img}" loading="lazy"></a><h3>${e.subtitle}</h3><h2>${e.title}</h2><p>${e.description}</p><a class="more" href="visiting-mons-again/index.html">Learn More</a></li>`;
                });
                this.atelierPage.innerHTML = str;
            }

        },
        updateArtList(jsonData) {
            jsonData.forEach((e) => {
                console.log(e);
            });

        }
       
    };
    app.init();
})();

