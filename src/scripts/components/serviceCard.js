document.addEventListener('click', event => {
	const card = event.target.closest('.service-card');

	if (card && !event.target.closest('a') && !event.target.closest('button')) {
		card.classList.toggle('service-card_opened');
		card
			.querySelector('.products-block')
			.classList.toggle('products-block_column');
		card.querySelectorAll('.products-list').forEach(list => {
			list.classList.toggle('visually-hidden');
		});
		card.querySelectorAll('.products-group').forEach(group => {
			group.classList.toggle('products-group_opened');
		});
		card.querySelector('.buttons-group').classList.toggle('visually-hidden');
	}
});
