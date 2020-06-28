const initPoppers = function() {
	document.querySelectorAll('.icon-button').forEach(button => {
		if (
			button.nextElementSibling &&
			button.nextElementSibling.classList.contains('icon-button-menu') &&
			window.matchMedia('(min-width: 768px)').matches
		) {
			Popper.createPopper(button, button.nextElementSibling, {
				placement: 'bottom-end',
				strategy: 'fixed',
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [10, 18],
						},
					},
					{
						name: 'arrow',
					},
				],
			});
			button.addEventListener('click', function(event) {
				if (window.matchMedia('(min-width: 768px)').matches) {
					event.preventDefault();
					if (this.nextElementSibling.classList.contains('visibility_hidden')) {
						this.closest('.icon-buttons-list')
							.querySelectorAll('.icon-button-menu')
							.forEach(item => {
								item.classList.add('visibility_hidden');
							});
						this.nextElementSibling.classList.remove('visibility_hidden');
						event.stopPropagation();
						document.addEventListener(
							'click',
							handleIconButtonClickAway(button.nextElementSibling),
						);
					} else {
						this.nextElementSibling.classList.add('visibility_hidden');
						document.removeEventListener(
							'click',
							handleIconButtonClickAway(button.nextElementSibling),
						);
					}
				}
			});
		}
	});
};

initPoppers();

function handleIconButtonClickAway(menu) {
	return event => {
		if (menu.isEqualNode(event.target.closest('.icon-button-menu'))) return;
		menu.classList.add('visibility_hidden');
	};
}

window.addEventListener('resize', () => {
	if (
		window.matchMedia('(min-width: 768px)').matches &&
		[...document.querySelectorAll('.icon-button-menu')].some(
			item => !item.hasAttribute('data-popper-placement'),
		)
	) {
		initPoppers();
	}

	if (window.matchMedia('(max-width: 767px)').matches) {
		document.querySelectorAll('.icon-button-menu').forEach(item => {
			item.classList.add('visibility_hidden');
		});
	}
});
