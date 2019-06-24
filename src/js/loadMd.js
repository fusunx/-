import config from './config'
import marked from 'marked' // 那么文字将以innerHTML的形式传入#content的div中。

export function loadMd(options = {
	nodeName: '',
	content: '',
}) {
	return new Promise((resolve, reject) => {
		let node = document.querySelector(options.nodeName);
		let mdStr = options.content;
		let num = 0;
		let sum = mdStr.length;

		const start = function () {
			setTimeout(() => {
				num += 1;
				let strNow = mdStr.substring(num - 1, num);
				node.scrollTop = 100000;

				if (num < sum) {
					if (strNow === '\n') {
						node.innerHTML = marked(mdStr.substring(0, num));
					} else {
						node.innerHTML = node.innerHTML + strNow;
					}
					if (config.pause) {
						return reject()
					} else {
						start()
					}
				} else {
					node.scrollTop = 0;
					return resolve(1)
				}
			}, 50)
		};
		start();
	})
}
export function skipMd(options = {
	nodeName: '',
	content: ''
}) {
	let node = document.querySelector(options.nodeName);
	node.innerHTML = marked(options.content);
}
