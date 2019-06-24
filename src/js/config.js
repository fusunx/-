let config = {
	pause: false,
	isMobile: isMobile()
};

function isMobile() {
	return document.body.clientWidth > 750 ? false : true;
}

export default config;