document.querySelectorAll('.switch').forEach(item => {
	if (item.nextElementSibling.classList.contains('switch-tab')) {
		item.querySelector('.switch__input').addEventListener('click', e => {
			item.parentNode.querySelectorAll('.switch-tab').forEach(tab => {
				tab.classList.toggle('d_none');
			});
		});
	}
});
