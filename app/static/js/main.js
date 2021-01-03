(()=> {
    const app = {
        init(){
            this.cacheElements();
            this.fetchAtelierLocalData();
            
        },
        cacheElements(){
            this.atelierList = document.querySelector('.atelier-js');

        },
        async fetchAtelierLocalData() {
            try {
                const response = await fetch("../app/data/atelier.json");
                const jsonData = await response.json();
                console.log(jsonData);
                this.updateAtelierList(jsonData);
            }catch(error) {
                console.error(error);
            } 
        },
        updateAtelierList(jsonData) {
            const data = jsonData.atelier;
            console.log(data);
            const arr = [];
            let str = "";
            data.forEach((e) => {
                if(!arr.includes(e) && arr.length < 3) {
                    arr.push(e);
                }
            });
            arr.forEach((e) => {
                str += `<li><a href="#"><img src="static/img/${e.img}" loading="lazy"></a><h3>${e.subtitle}</h3><h2>${e.title}</h2><p>${e.description}</p><a class="more" href="#">Learn More</a></li>`;
            });
            this.atelierList.innerHTML = str;

        }
       
    };
    app.init();
})();

