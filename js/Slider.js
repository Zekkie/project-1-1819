class Slider{
	constructor() {
		this.slides = document.querySelector("[slider]").children;
		this.slider = document.querySelector("[slider]")
		this.firstElementEvent = this.slides[0].onclick;
		this.LastElementEvent = this.slides[this.slides.length-1].onclick;
		this.firstElement = this.slides[0].cloneNode(true);
		this.lastElement = this.slides[this.slides.length-1].cloneNode(true);
		this.slideArray = Array.from(this.slides);
		this.buttonState = false;

		setTimeout(() => {
			this.setStyles();
		},1000)

		this.firstElement.onclick = this.firstElementEvent;
		this.lastElement.onclick = this.lastElementEvent;
	}

	setStyles() {
		this.slideArray.forEach((e,i) => {

				
			e.style.setProperty("--transform",(-20*(i+1))+"px");
			e.style.setProperty("--opacity",0.7/(i+1))
			e.style.setProperty("--index", i*-1)

			e.dataset.index = i+1

			if(i == 0) {
				e.style.setProperty("--blur", 0);
			}else {
				e.style.setProperty("--blur", i*2.5+"px");
			}

		})
	} 

	prev() {

		if(this.buttonState == false) {
			this.buttonState = true
			this.slider.removeChild(this.slides[this.slides.length-1]);
			this.lastElement.classList.add("remove");
			this.slider.prepend(this.lastElement);

			let remove = document.querySelector(".item");
			setTimeout(() => {
				remove.classList.remove("remove");
				this.buttonState = false
			},500);
			
			
			this.lastElement = this.slides[this.slides.length-1].cloneNode(true);
			this.firstElement = this.slides[0].cloneNode(true);
			this.firstElement.onclick = this.firstElementEvent;
			this.lastElement.onclick = this.lastElementEvent;
			this.slideArray = Array.from(this.slides);
			
			this.setStyles();
		}
	}

	next() {
			
			if(this.buttonState == false) {
				this.buttonState = true;

				this.slides[0].classList.add("remove");

				setTimeout(() => {
					this.slider.removeChild(this.slides[0]);
					this.slider.appendChild(this.firstElement);
					this.lastElement = this.slides[this.slides.length-1].cloneNode(true);
					this.firstElement = this.slides[0].cloneNode(true);
					this.firstElement.onclick = this.firstElementEvent;
					this.lastElement.onclick = this.lastElementEvent;
					this.slideArray = Array.from(this.slides);
					this.setStyles();
					this.buttonState = false;
				},500)
			}
	}

};

export default Slider;