document.addEventListener('scroll', () => {
	if (document.querySelector('.header:not([data-disabled])')) {
		window.pageYOffset > 1
			? document
					.querySelector('.header:not([data-disabled])')
					.classList.add('header_scrolled')
			: document
					.querySelector('.header:not([data-disabled])')
					.classList.remove('header_scrolled');
	}
});
