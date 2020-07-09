class Helpers {
	/*
	A vanilla alternative to $(document).ready(fn)

	Example: 
	ready(() => { code here });
	*/
	static ready(fn) {
		if (document.readyState != "loading") {
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	/*
	Add Class

	Adds class cl to element el.
	
	Example: 
	addClass(document.querySelector('.class-to-find'), 'class-to-add');

	*/
	static addClass(el, cl) {
		if (el.classList) {
			el.classList.add(cl);
		} else {
			el.className += " " + cl;
		}
	}

	/*
	Remove Class

	Removes class cl from element el.
	
	Example: 
	removeClass(document.querySelector('.class-to-find'), 'class-to-remove');

	*/
	static removeClass(el, cl) {
		if (el.classList) {
			el.classList.remove(cl);
		} else {
			el.className = el.className.replace(
				new RegExp("(^|\\b)" + cl.split(" ").join("|") + "(\\b|$)", "gi"),
				" "
			);
		}
	}

	/*
	Has Class

	Returns a bool of whether or not element el has class cl
	
	Example: 
	hasClass(el, "class-to-test")
	*/
	static hasClass(el, cl) {
		if (el.classList) {
			return el.classList.contains(cl);
		} else {
			return new RegExp("(\\s|^)" + cl + "(\\s|$)").test(el.cl);
		}
	}

	/*
	Toggle Class

	Adds class cl to element el if el doesn't already have it. Otherwise removes it.
	
	Example:
	toggleClass(el, 'class-to-toggle');
	*/
	static toggleClass(el, cl) {
		if (Helpers.hasClass(el, cl)) {
			Helpers.removeClass(el, cl);
		} else {
			Helpers.addClass(el, cl);
		}
	}

	/*
	Get One

	Returns the first element that matches the selector.
	Takes an optional parent element for scope.

	Example:
	const x = getOne(".js_test")
	const y = getOne(".js_test", el)
	*/
	static getOne(selector, parent = document) {
		return parent.querySelector(selector);
	}

	/*
	Get All

	Returns all of the elements that matches the selector.
	Takes an optional parent element for scope.

	Example:
	const x = getAll(".js_test")
	const y = getAll(".js_test", el)
	*/
	static getAll(selector, parent = document) {
		return parent.querySelectorAll(selector);
	}

	/*
	Get Data

	Returns the value of a data attribute on element el

	Example:
	const x = getData(el, "test") would return the data-test attribute on el
	*/
	static getData(el, key) {
		if (el.dataset) {
			return el.dataset[key];
		} else {
			return el.getAttribute(`data-${key}`);
		}
	}

	/*
	Set Data

	Sets the value of a data attribute on element el

	Example:
	setData(el, "test", "100") would set the data-test attribute on el to "100"
	*/
	static setData(el, key, value) {
		if (el.dataset) {
			el.dataset[key] = value;
		} else {
			return el.setAttribute(`data-${key}`, value);
		}
	}
}

export { Helpers };
