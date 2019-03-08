import data from "./sampledata.js";
import ObaApi from './obaApi.js';
import Slider from "./Slider.js";

const nextBtn = document.querySelector("[next]");
const prevBtn = document.querySelector("[prev]");
const RESULT_TARGET = document.querySelector("[results]");
const createElement = (e) => {
	return document.createElement(e)
} 

const createTextNode = (t) => {
	return document.createTextNode(t)
}

const createAttribute = (a) => {
	return document.createAttribute(a)
}

const getter = new ObaApi();


const createResult = (d) => {
	console.log(d)
	const item = d.result[0];
	

	const partial = `
		<div>
			<h1>${item.titles["short-title"]}</h1>
			<p>${item.authors["main-author"]}</p>
			<p>${item.description["physical-description"]}</p>
			<a href="${item["detail-page"]}">Rerveer nu</a>
		</div>
	`;



	RESULT_TARGET.innerHTML = partial;

}

const createSongs = (data) => {
	const _TIME = 300;
	const _TARGET = document.querySelector("[songs]");
	const songs = JSON.parse(data);
	const _HANDLER = (d,i) => {
		const __WRAPPER = createElement("div");
		const __CLASS = createAttribute("class");
		const __PARAGRAPH_TITLE = createElement("p");
		const __PARAGRAPH_ARTIST = createElement("p");
		const __TEXT_TITLE = createTextNode(d.title);
		const __TEXT_ARTIST = createTextNode(d.artist);

		const __LOADER = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;

		__WRAPPER.addEventListener("click", function(e){
			RESULT_TARGET.innerHTML = __LOADER;
			getter.find(this.artist).then(res => {
				
				createResult(res);
			})
		},true)
		__PARAGRAPH_TITLE.appendChild(__TEXT_TITLE);
		__PARAGRAPH_ARTIST.appendChild(__TEXT_ARTIST);
		__WRAPPER.appendChild(__PARAGRAPH_TITLE);
		__WRAPPER.appendChild(__PARAGRAPH_ARTIST);
		__CLASS.value = "song-item";
		__WRAPPER.artist = d.artist;
		__WRAPPER.style.setProperty( "--top",40*i+"px");
		__WRAPPER.setAttributeNode(__CLASS);

		

		_TARGET.appendChild(__WRAPPER);
	}

	const garbage = Array.from(_TARGET.children);

	if(_TARGET.children.length > 0) {
		console.log(_TARGET.children);
		garbage.forEach((d,i) => {
			_TARGET.removeChild(d)
		})
		songs.forEach(_HANDLER)
	}else {
		songs.forEach(_HANDLER)
	}
}


const createSlides = (data) => {
	const _TARGET = document.querySelector("[slider]");


	const _HANDLER = (d,i) => {
		const __WRAPPER = createElement("div");
		const __PARAGRAPH = createElement("p");
		const __HEADING = createElement("h1");	
		const __HEADING_TEXT_NODE = createTextNode(d.title);
		const __PARAGRAPH_TEXT_NODE = createTextNode(d.songs.length);
		const __CLASS = createAttribute("class");
		const __INDEX = createAttribute("data-index");
		const __DATA = createAttribute("data-songs");
		const __DATA_STRING = JSON.stringify(d.songs);
		__HEADING.appendChild(__HEADING_TEXT_NODE);
		__PARAGRAPH.appendChild(__PARAGRAPH_TEXT_NODE);
		

		__DATA.value = __DATA_STRING;
		__CLASS.value = "item";
		__INDEX.value = i+1;
		__WRAPPER.setAttributeNode(__CLASS);
		__WRAPPER.setAttributeNode(__INDEX);
		__WRAPPER.setAttributeNode(__DATA);
		__WRAPPER.data = d.songs;
		__WRAPPER.appendChild(__HEADING);
		__WRAPPER.appendChild(__PARAGRAPH);
		__WRAPPER.onclick = function(e) {
			createSongs(this.dataset.songs)
		}
		_TARGET.appendChild(__WRAPPER);
	}
	data.forEach(_HANDLER);
}






createSlides(data);

const slider = new Slider();

nextBtn.addEventListener("click",slider.prev.bind(slider),true)
prevBtn.addEventListener("click",slider.next.bind(slider),true)