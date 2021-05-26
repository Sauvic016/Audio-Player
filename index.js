const music = document.querySelector("audio");
const image = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const progress_div = document.getElementById("progress_div");
let progress = document.getElementById("progress");

let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");

const songs = [
	{
		name: "music-1",
		img: "img1",
		title: "You can be king again",
		artist: "Lauren Aquilina",
	},
	{
		name: "music-2",
		img: "img2",
		title: "Me and My broken Heart",
		artist: "Rixton",
	},
];

let isPlaying = false;

//  for play function

const playMusic = () => {
	isPlaying = true;
	music.play();
	play.classList.replace("fa-play", "fa-pause");
	image.classList.add("anime");
};

//  for pause function

const pauseMusic = () => {
	isPlaying = false;
	music.pause();
	play.classList.replace("fa-pause", "fa-play");
	image.classList.remove("anime");
};

// To check if the audio is playing or NOT

play.addEventListener("click", () => {
	// if (isPlaying) {
	// 	pauseMusic();
	// } else {
	// 	playMusic();
	// }
	isPlaying ? pauseMusic() : playMusic();
});

// changeing the music data
const loadSong = (songs) => {
	title.textContent = songs.title;
	artist.textContent = songs.artist;
	music.src = `music/${songs.name}.mp3`;
	image.src = `images/${songs.img}.jpg`;
};

songIndex = 0;

const nextSong = () => {
	songIndex = (songIndex + 1) % songs.length;
	loadSong(songs[songIndex]);
	playMusic();
};
const prevSong = () => {
	songIndex = (songIndex - 1 + songs.length) % songs.length;
	loadSong(songs[songIndex]);
	playMusic();
};

/////////////////////////////  progress js work  ///////////////////////////////////

music.addEventListener("timeupdate", (event) => {
	// console.log(event);

	const { currentTime, duration } = event.srcElement;
	// console.log(currentTime);
	// console.log(duration);

	let progress_time = (currentTime / duration) * 100;
	// console.log(progress_time);
	progress.style.width = `${progress_time}%`;

	/////////////////////// music duration update//////////////////////////////////

	// console.log(duration);
	let minute_duration = Math.floor(duration / 60);
	let sec_duration = Math.floor(duration % 60);

	let tot_duration = `${minute_duration}:${sec_duration}`;
	if (duration) {
		total_duration.textContent = `${tot_duration}`;
	}
	/////////////////////// current duration update//////////////////////////////////

	let minute_currentTime = Math.floor(currentTime / 60);
	let sec_currentTime = Math.floor(currentTime % 60);

	if (sec_currentTime < 10) {
		sec_currentTime = `0${sec_currentTime}`;
	}
	let tot_currentTime = `${minute_currentTime}:${sec_currentTime}`;
	current_time.textContent = `${tot_currentTime}`;
});

// progress onClick functionality

progress_div.addEventListener("click", (event) => {
	// console.log(event);
	const { duration } = music;

	let move_progress =
		(event.offsetX / event.srcElement.clientWidth) * duration;
	// console.log(duration);
	// console.log(move_progress);

	music.currentTime = move_progress;
});

// if music end callnect song function

music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
