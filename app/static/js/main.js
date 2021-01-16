const artUrl = "https://www.pgm.gent/data/arnequinze/art.json";
(()=> {
    const app = {
        init(){
            this.cacheElements();
            this.scrollToTop();
            this.footerSubmit();
            this.fetchAtelierLocalData();
            this.fetchArtData();
            this.fetchPressLocalData();
            this.check();
            
            
            
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
            const url = new URLSearchParams(window.location.search);
            const categoryUrl = url.get('category');
            const yearUrl = url.get('year');
            let strCategory = `<li><a class="category__link" href="index.html${yearUrl ? `?year=${yearUrl}`: ""}">Show all</a></li>`;
            let strYear = `<li><a class="show-all" href="index.html${categoryUrl ? `?category=${categoryUrl}`: ""}">Show all</a></li>`;
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
                    strCategory += `<li><a class="category__link" href="index.html${yearUrl? `?category=${e}&year=${yearUrl}`: `?category=${e}`}">${e}</a></li>`;
                })
                this.categoryNavigation.innerHTML = strCategory;
                const categoryNavigationLink = document.querySelectorAll('.category__link');
                categoryNavigationLink.forEach((e) => {
                    console.log(e);
                    if(categoryUrl === e.innerText) {
                        e.classList.add('show-all');
                    }else if(categoryUrl === null && e.innerText === "Show all") {
                        e.classList.add('show-all');
                    }
                })
                years.forEach((e) => {
                    strYear += `<li><a href="index.html${categoryUrl ? `?category=${categoryUrl}&year=${e}`: `?year=${e}`}">${e}</a></li>`;
                });
                this.yearNavigation.innerHTML = strYear;
            }          
        },
        updateArtWorksExample(jsonData) {
            if(this.worksExample) {
                const url = new URLSearchParams(window.location.search);
                const categoryUrl = url.get('category');
                const yearUrl = url.get('year');
                const years = [];
                jsonData.forEach((e) => {
                    if(!years.includes(e.year)) {
                        years.push(e.year);
                    }
                });
                const year = years.filter(y => {
                    return yearUrl ? y === yearUrl : y;
                }).map(p => {
                    const dataElement = jsonData.filter((f) => {
                        return f && f.year && f.tags && f.year === p &&(!categoryUrl || f.tags.includes(categoryUrl))
                       
                    }).map((m) => {
                        let location = "";
                        if(m.location != null) {
                            location = `— ${m.location}`;
                        }else{
                            location = "";
                        }
                        const images = m.images.map((i) => {
                            return `<li><a href="in-dialogue-with-calatrava/index.html"><img src="../static/img/dataImg/${i}" loading="lazy"></a></li>`;
                        }).join('');
                        return `<li class="works__item"><div><h2>${m.title}</h2><h4>${m.subtitle}</h4><h3>${m.tags} ${location}</h3></div><ul class="works__images">${images}</ul> 
                        </li>`;
                    }).join('');
                    return `<div class="works__element"><h2 class="works__element-year" id="${p}">${p}</h2><ul>${dataElement}</ul></div>`
                

                }).join('');
                this.worksExample.innerHTML = year;
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
        footerSubmit() {
            const footerInput = document.getElementById('email');
            const footerBtn = document.getElementById('btn-submit');
            if(footerInput && footerBtn) {
                footerInput.addEventListener("focus", function() {
                    footerBtn.style.display = 'block';
                });
                footerInput.addEventListener("blur", function() {
                   footerBtn.style.display = 'none';
                })
            }
        },
        check(){
            const wid = document.documentElement.offsetWidth;
            [].forEach.call(
                document.querySelectorAll('*'),
                function(e){
                    if (e.offsetWidth > wid){
                        console.log(e);
                    }
                }
            );
        }
    };
    app.init();
})();

