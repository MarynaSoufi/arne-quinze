const artUrl = "https://www.pgm.gent/data/arnequinze/art.json";
(()=> {
    const app = {
        init(){
            this.cacheElements();
            this.fetchAtelierLocalData();
            this.fetchArtData();
            this.fetchPressLocalData();
            
        },
        cacheElements(){
            this.atelierList = document.querySelector('.atelier-js');
            this.atelierPage = document.querySelector('.atelier_page-js');
            this.artList = document.querySelector('.art-js');
            this.pressRelizeList = document.querySelector('.release-js');
            this.thePressList = document.querySelector('.the-press-js');

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
        async fetchPressLocalData() {
            try {
                const response = await fetch("../../app/data/press.json");
                const jsonData = await response.json();
                console.log(jsonData);
                this.updatePressLists(jsonData);
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
                    str += `<li><a href="atelier-studio/visiting-mons-again/index.html"><img src="static/img/${e.img}" loading="lazy"></a><h3>${e.subtitle}</h3><h2>${e.title}</h2><p>${e.description}</p><a class="more" href="atelier-studio/visiting-mons-again/index.html">Learn More</a></li>`;
                });
                this.atelierList.innerHTML = str;
            }
        },
        updateAtelierPage(jsonData) {
            const data = jsonData.atelier;
            let str = "";
            if(this.atelierPage) {
                data.forEach((e) => {
                    str += `<li><a href="visiting-mons-again/index.html"><img src="../static/img/${e.img}" loading="lazy"></a><h3>${e.subtitle}</h3><h2>${e.title}</h2><p>${e.description}</p><a class="more" href="visiting-mons-again/index.html">Learn More</a></li>`;
                });
                this.atelierPage.innerHTML = str;
            }

        },
        updateArtList(jsonData) {
            const arr = [];
            let str = "";
            if(this.artList) {
                jsonData.forEach((e) => {
                    if(!arr.includes(e) && arr.length < 3 && e.highlight == true) {
                        arr.push(e);
                    }
                    
                });
                arr.forEach((e) => {
                    str += `<li><a href="art-and-exhibitions/in-dialogue-with-calatrava/index.html"><img src="static/img/dataImg/${e.cover}" loading="lazy"></a><h3>${e.subtitle}</h3><h2>${e.title}</h2><p>${e.description}</p><a class="more" href="art-and-exhibitions/in-dialogue-with-calatrava/index.html">Learn More</a></li>`;
                });
                this.artList.innerHTML = str;
            }
        },
        updatePressLists(jsonData) {
            data = jsonData.press;
            console.log(data);
            let strRelize = "";
            let str = "";
            const arrRelize = [];
            const arr = [];
            if(this.pressRelizeList || this.thePressList) {
                data.forEach((e) => {
                    if(e.isRelize == true) {
                        arrRelize.push(e);
                    }else {
                        arr.push(e);
                    }
                });
                arrRelize.forEach((e) => {
                    strRelize += `<li><a href="my-secret-garden-valencia/index.html"><img src="../static/img/${e.img}" loading="lazy"></a><h3>${e.subtitle}</h3><h2>${e.title}</h2><p>${e.description}</p><a class="more__press" href="my-secret-garden-valencia/index.html">${e.link}</a></li>`;
                });
                this.pressRelizeList.innerHTML = strRelize;
                arr.forEach((e) => {
                    str += `<li><a href="my-secret-garden-valencia/index.html"><img src="../static/img/${e.img}" loading="lazy"></a><h3>${e.subtitle}</h3><h2>${e.title}</h2><p>${e.description}</p><a class="more__press" href="my-secret-garden-valencia/index.html">${e.link}</a></li>`;
                });
                this.thePressList.innerHTML = str;

            }    
            
        }
      
       
    };
    app.init();
})();

