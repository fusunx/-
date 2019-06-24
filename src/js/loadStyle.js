import Prism from 'prismjs' // 语法高亮插件
import config from './config'

function createStyleNode() { // 返回最新的style标签
	let newStyleNode = document.createElement('style');
	let head = document.querySelector('head');
	head.appendChild(newStyleNode);
	let allStyleNode = document.querySelectorAll('style');
	return allStyleNode[allStyleNode.length - 1];
}
function setTimeOut(str, interval = 16) { // 根据字符串内容返回timeout时间
	if (/\D[\,]\s$/.test(str)) return interval * 20
	if (/[^\/]\n\n$/.test(str)) return interval * 40
	if (/[\.\?\!]\s$/.test(str)) return interval * 60
	return 0
}

export function loadStyle(
	options = {
		nodeName: '',
		content: '',
		rewrite: true
	}
) {
	let that = this;
	return new Promise((resolve, reject) => {
		let node = document.querySelector(options.nodeName); // 包含内容的标签
		let styleStr = options.content; // 字符串总内容
		let sum = styleStr.length; // 字符串总长度
		let num = 0; // 循环中间量
		let innerContent = ''; // 字符串内容
		let styleNode = createStyleNode(); // 页面style标签
		let interval = 16; // 16毫秒渲染一个字符
		if (!options.rewrite) {
			innerContent = node.innerHTML;
		}
		const start = function () {
			setTimeout(() => {
				num += 1;
				if (num < sum) {
					let contentStr = styleStr.substring(0, num);
					let timeOut = setTimeOut(contentStr, interval);
					let code = Prism.highlight(contentStr, Prism.languages.css); // 将contentStr以css语法规则在页面高亮显示
					node.scrollTop = 100000;
					node.innerHTML = innerContent + code; // 将code渲染到node中
					styleNode.innerText = contentStr; // 将字符串内容渲染到style标签中

					if (config.pause) {
						return reject()
					} else {
						setTimeout(() => {
							start();
						}, timeOut)
					}

				} else {
					return resolve()
				}
			}, interval)
		};
		start();
	})
}

export function skipStyle(options = {
	nodeName: '',
	content: '',
	rewrite: true
}) {
	let node = document.querySelector(options.nodeName); // 包含内容的标签
	let styleNode = createStyleNode(); // 页面style标签
	let styleStr = options.content; // 字符串总内容
	node.innerHTML = Prism.highlight(styleStr, Prism.languages.css); // 将contentStr以css语法规则在页面高亮显示
	styleNode.innerText = styleStr;
}