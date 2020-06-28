window.matchMedia('(max-width: 767px)') &&
	document.querySelector('.ready-product') &&
	(document.querySelector('.ready-product').innerText = 'Готовые продукты');

const mediaQuery = window.matchMedia('(max-width: 767px)');

document.querySelector('.ready-product') &&
	mediaQuery.addListener(e => {
		document.querySelector('.ready-product').innerText = e.matches
			? 'Готовые продукты'
			: 'Посмотреть готовые продукты';
	});
