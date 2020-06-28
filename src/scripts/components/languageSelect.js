const handleSelectMouseEnter = function(event) {
	this.classList.add('language-select_opened');
};
const handleSelectMouseLeave = function(event) {
	this.classList.remove('language-select_opened');
};

document.querySelectorAll('.language-select').forEach(select => {
	select.addEventListener('mouseenter', handleSelectMouseEnter);
	select.addEventListener('mouseleave', handleSelectMouseLeave);
});

document.querySelectorAll('.language').forEach(language => {
	language.addEventListener('click', function(event) {
		if (language.closest('.language-list')) {
			const appendTarget = language.parentNode;
			const select = language.closest('.language-select');
			const oldLanguage = select.querySelector(
				'.language-select__current .language',
			);
			oldLanguage.parentNode.appendChild(language);
			appendTarget.appendChild(oldLanguage);
			select.classList.remove('language-select_opened');
			select.removeEventListener('mouseenter', handleSelectMouseEnter);
			setTimeout(() => {
				select.addEventListener('mouseenter', handleSelectMouseEnter);
			}, 200);
		}
	});
});
