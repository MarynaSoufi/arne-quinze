const artUrl = "https://www.pgm.gent/data/arnequinze/art.json";
(()=> {
    const app = {
        init(){
            this.scrollToTop();
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
            this.categoryNavigation = document.querySelector('.category-js');
            this.yearNavigation = document.querySelector('.year-js');
            this.worksExample = document.querySelector('.works');
            this.worksYear = document.querySelector('.works__year');
            this.worksAbout = document.querySelectorAll('.works__about');

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
                this.updateArtNavigation(jsonData);
                this.updateArtWorksExample(jsonData);
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
            
        },
        updateArtNavigation(jsonData){
            const years = [];
            let allTags = [];
            let tags = [];
            const categories = []
            let strCategory = `<li><a class="show-all" href="index.html">Show all</a></li>`;
            let strYear = `<li><a class="show-all" href="index.html">Show all</a></li>`;
            let strYearForWorksExample = "";
            if(this.categoryNavigation || this.yearNavigation) {
                jsonData.forEach((e) => {
                    if(!years.includes(e.year)) {
                        years.push(e.year);
                    }
                    allTags.push(e.tags);
                });
                tags = allTags.flat();
                tags.forEach((e) => {
                    if(!categories.includes(e) && e!== "" && e!== "Atelier, Sint-Martens-Latem, Belgium" && e!== "Kunsthal Rotterdam, the Netherlands") {
                        categories.push(e);
                    }
                });
                categories.sort();
                categories.forEach((e) => {
                    strCategory += `<li><a href="index.html?category=${e}">${e}</a></li>`;
                })
                console.log(categories);
                this.categoryNavigation.innerHTML = strCategory;
                
                years.forEach((e) => {
                    strYear += `<li><a href="#${e}">${e}</a></li>`;
                    // strYearForWorksExample += `<div><h2 class="works__year">${e}</h2></div><div class="works__about" id="${e}"></div>`;
                });
                this.yearNavigation.innerHTML = strYear;
                // this.worksExample.innerHTML = strYearForWorksExample;
            }          
        },
        updateArtWorksExample(jsonData) {
            if(this.worksExample) {
                const url = new URLSearchParams(window.location.search);
                const categoryUrl = url.get('category');
                const years = [];
            jsonData.forEach((e) => {
                if(!years.includes(e.year)) {
                    years.push(e.year);
                }
            });
            if(categoryUrl === null) {
                const year = years.map((y) => {
                    const dataElement = jsonData.map((d) => {
                        let location = "";
                        if(d.tags && d.images && d.title && d.year === y) {
                            if(d.location != null) {
                                location = `— ${d.location}`;
                            }else{
                                location = "";
                            }
                            const tags = d.tags.map((t) => {
                                const newTags = (t.replace(",", "||"));
                                return `${newTags}`;
                            }).join('');
                            const images = d.images.map((i) => {
                                return `<li><a href="in-dialogue-with-calatrava/index.html"><img src="../static/img/dataImg/${i}" loading="lazy"></a></li>`;
                            }).join('');
                            return `<li class="works__item"><div><h2>${d.title}</h2><h4>${d.subtitle}</h4><h3>${tags} ${location}</h3></div><ul class="works__images">${images}</ul> 
                            </li>`
                        }
                    }).join('');
                    return `<div class="works__element"><h2 class="works__element-year" id="${y}">${y}</h2><ul>${dataElement}</ul></div>`
                }).join('');
                this.worksExample.innerHTML = year;
            }else if(categoryUrl) {
                const year = years.map((y) => {
                    const dataElement = jsonData.map((d) => {
                        let location = "";
                        if(d.tags && d.images && d.title && d.year === y && categoryUrl.includes(d.tags) || categoryUrl === d.tags) {
                            if(d.location != null) {
                                location = `— ${d.location}`;
                            }else{
                                location = "";
                            }
                            const tags = d.tags.map((t) => {
                                const newTags = (t.replace(",", "||"));
                                return `${newTags}`;
                            }).join('');
                            const images = d.images.map((i) => {
                                return `<li><a href="in-dialogue-with-calatrava/index.html"><img src="../static/img/dataImg/${i}" loading="lazy"></a></li>`;
                            }).join('');
                            return `<li class="works__item"><div><h2>${d.title}</h2><h4>${d.subtitle}</h4><h3>${tags} ${location}</h3></div><ul class="works__images">${images}</ul> 
                            </li>`
                        }
                    }).join('');
                    return `<div class="works__element"><h2 class="works__element-year" id="${y}">${y}</h2><ul>${dataElement}</ul></div>`
                }).join('');
                this.worksExample.innerHTML = year;
            }
            }   
        },
        scrollToTop() {
            const scrollToTopBtn = document.querySelector(".toTop__wrapper");
            var rootElement = document.documentElement;
              window.addEventListener('scroll', function() {
                if(pageYOffset >20){
                    scrollToTopBtn.style.visibility = 'visible';
                    scrollToTopBtn.addEventListener('click', function() {
                        rootElement.scrollTo({
                            top: 0,
                            behavior: "smooth"
                          });
                    });
                }else if(pageYOffset < document.documentElement.clientHeight) {
                    scrollToTopBtn.style.visibility = 'hidden';
                }
              });
        },
    };
    app.init();
})();

