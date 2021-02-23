/**
 * 加载 script 文件
 * @param src
 */
function loadScript(src) {
	let addSign = true;
	let scripts = document.getElementsByTagName("script")
	for (let i = 0; i < scripts.length; i++) {
		if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) != -1) {
			addSign = false
		}
	}
	if (addSign) {
		let $script = document.createElement('script')
		$script.setAttribute("type", "text/javascript")
		$script.setAttribute("src", src)
		document.getElementsByTagName("head").item(0).appendChild($script)
	}
}

/**
 * 加载 link 文件
 * @param href
 */
function loadCss(href) {
	let addSign = true
	let links = document.getElementsByTagName("link")
	for (let i = 0; i < links.length; i++) {
		if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
			addSign = false
		}
	}
	if (addSign) {
		let $link = document.createElement("link")
		$link.setAttribute("rel", "stylesheet")
		$link.setAttribute("type", "text/css")
		$link.setAttribute("href", href)
		document.getElementsByTagName("head").item(0).appendChild($link)
	}
}

/**
 * 删除 script 文件
 * @param src
 */
function removeScript(src) {
	let scripts = document.getElementsByTagName("script")
	for (let i = 0; i < scripts.length; i++) {
		if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) != -1) {
			scripts[i].parentNode.removeChild(scripts[i])
		}
	}
}

/**
 * 删除 link 文件
 * @param href
 */
function removeCss(href) {
	let links = document.getElementsByTagName("link")
	for (let i = 0; i < links.length; i++) {
		let _href = links[i].href
		if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
			links[i].parentNode.removeChild(links[i])
		}
	}
}


export {
	loadScript,
	loadCss,
	removeScript,
	removeCss
}
