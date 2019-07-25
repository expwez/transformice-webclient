document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("runBtn").addEventListener("click", run);
	main();
});

function selectItemByValue(elmnt, value) {
	for (let i = 0; i < elmnt.options.length; i++) {
		if (elmnt.options[i].value === value) {
			elmnt.selectedIndex = i;
			break;
		}
	}
}

function setCookie(cname, cvalue, exdays) {
	let d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function setElementAttributes(element, atts) {
	for (let attname in atts) {
		element.setAttribute(attname, atts[attname]);
	}
}

function loadSettings() {
	let setts = defaultSettings;
	for(const key in setts) {
		if(setts[key] != null) {
			setts[key] = setts[key].toLowerCase();
		}
	}
	return setts;
}

function readPointerSettings() {
	let pointer = document.getElementById("pointerInput").value;
	setCookie('pointer', pointer, 365);

	let pointerSize = document.getElementById("pointerSizeInput").value;
	setCookie('pointerSize', pointerSize, 365);

	let pointerOpacity = document.getElementById("pointerOpacityInput").value;
	setCookie('pointerOpacity', pointerOpacity, 365);

	let pointerHotkey = document.getElementById("pointerHotkeyInput").value;
	setCookie('pointerHotkey', pointerHotkey, 365);

	
	if(pointer == "off") {
		return;
	}

	dot.style.width = dot.style.height = pointerSize + "px";
	dot.style.opacity = pointerOpacity / 100;

	let dotVisible = true;
	dot.style.display = "block";

	document.addEventListener("keydown", function(e) {
		if(e.keyCode == pointerHotkey) {
			dotVisible = !dotVisible;
			dot.style.display = dotVisible ? "block" : "none";
		}
	})

	document.addEventListener('mousemove', function(e) {
		// dot.style.left = e.pageX + "px";
		// dot.style.top = e.pageY + "px";
		dot.style.left = (e.pageX - (pointerSize / 2)) + "px";
		dot.style.top = (e.pageY - (pointerSize / 2)) + "px";
	});
}

let dot = document.getElementById("dot");

function run() {

	let alignEl = document.getElementById("alignSelect");
	let align = alignEl.options[alignEl.selectedIndex].value;
	setCookie('align', align, 365);

	let qualityEl = document.getElementById("qualitySelect");
	let quality = qualityEl.options[qualityEl.selectedIndex].value;
	setCookie('quality', quality, 365);

	let scaleEl = document.getElementById("scaleSelect");
	let scale = scaleEl.options[scaleEl.selectedIndex].value;
	setCookie('scale', scale, 365);

	let wmodeEl = document.getElementById("wmodeSelect");
	let wmode = wmodeEl.options[wmodeEl.selectedIndex].value;
	setCookie('wmode', wmode, 365);

	let bgcolor = document.getElementById("bgcolortInput").value;
	setCookie('bgcolor', bgcolor, 365);

	readPointerSettings();


	let embed = document.createElement('embed');

	setElementAttributes(embed, {
		'src': 'http://transformice.com/TransformiceChargeur.swf',
		'type': 'application/x-shockwave-flash',
		'pluginspage': 'http://www.macromedia.com/go/getflashplayer',
		'width': '100%',
		'height': '100%',
		'salign': align,
		'quality': quality,
		'scale': scale,
		'wmode': wmode,
		'bgcolor': bgcolor,
		'class': 'super'
	})

	let cont = document.getElementById('container');
	cont.parentNode.replaceChild(embed, cont);
}

function main() {
	let settings = loadSettings();

	const cookiesSelects = {
		'align': 'alignSelect',
		'quality': 'qualitySelect',
		'scale': 'scaleSelect',
		'wmode': 'wmodeSelect'
	}

	for (const cookieName in cookiesSelects) {
		let value = getCookie(cookieName) || settings[cookieName];

		let cookieElement = document.getElementById(cookiesSelects[cookieName])
		selectItemByValue(cookieElement, value)
	}

	let bgcolor = getCookie('bgcolor') || settings.background
	if (bgcolor != '')
		document.getElementById('bgcolortInput').value = bgcolor;


	dot = document.getElementById("dot");

}