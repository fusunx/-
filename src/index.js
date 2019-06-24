import './css/index.scss'
import config from './js/config'
import {loadStyle, skipStyle} from "./js/loadStyle";
import {loadMd, skipMd} from "./js/loadMd";

import {resume} from './public/resume'
import {style1, style2} from "./public/style";

let skipBin = document.querySelector('#skip-btn');
skipBin.addEventListener('click', function () {
	config.pause = true;
});

loadStyle({
	nodeName: '#style-editor',
	content: style1,
}).then(() => loadMd({
		nodeName: '#resume-content',
		content: resume
	})).then(() => loadStyle({
		nodeName: '#style-editor',
		content: style2,
		rewrite: false
	})).catch(() => {
	skipBin.style.display = 'none';
	skipStyle({
		nodeName: '#style-editor',
		content: style1,
		rewrite: false
	});
	skipMd({
		nodeName: '#resume-content',
		content: resume
	});
	skipStyle({
		nodeName: '#style-editor',
		content: style2,
		rewrite: false
	});
});
