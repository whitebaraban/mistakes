var doc = document;
var products = [
	{
		id : 1,
		name : 'Пивографика.',
		author: 'Пьер Элизабет',
		country : 'Люксембург', 
		category : 'Вина и напитки мира',
		price : 500
	},
	{
		id : 2,
		name : 'Чужак',
		author: 'Кинг Стивен',
		country : 'USA', 
		category : 'Вселенная Стивена Кинга',
		price : 782
	},
	{
		id : 3,
		name : 'История шарлатанства ',
		author: 'Педерсен Нэйт',
		country : 'Англия', 
		category : 'Красота и здоровье',
		price : 426
	},
	{
		id : 4,
		name : 'По любви. Грязный стиль ',
		author: 'Аккерман В.',
		country : 'Люксембург', 
		category : 'Тренды рунета',
		price : 1500
	},
	{
		id : 5,
		name : 'Пивографика. Легкое знакомство с историей, географией',
		author: 'Пьер Элизабет',
		country : 'Люксембург', 
		category : 'Вина и напитки мира',
		price : 899
	}
];
var cart = [];
var temp = doc.getElementById('template').content;
var catalog = doc.querySelector('.catalog');



// Создание каталога
function initCatalog () {
	for (let i = 0; i < Object.keys(products).length; i++) {
		let item = temp.cloneNode(true);
		item.querySelector('#head-item').innerHTML = products[i].name;
		item.querySelector('#auth').innerHTML = 'Автор: ' + products[i].author;
		item.querySelector('#countr').innerHTML = products[i].country;
		item.querySelector('#categ').innerHTML = products[i].category;
		item.querySelector('#price').innerHTML = '<b>' + products[i].price + " P."+'</b>';
		catalog.appendChild(item);
	}
}

initCatalog ();



// Добавление/Удаляем товары в/из корзинy(ы)
var buy_btn = doc.getElementsByClassName('buy-btn');
var del_row_btn = doc.getElementsByClassName('del-row-btn');
var cart_tbl = doc.querySelector('#cart-tbl');
var cart_row = doc.querySelector('#basket-row').content;
var total_sum = doc.querySelector('#total');

for (let i = 0; i < buy_btn.length; i++) {
	buy_btn[i].addEventListener ('click', function (event) {
	let row_clone = cart_row.cloneNode(true);
	let new_item = 1;
	console.log (cart);
	// Добавление товара - НАЧАЛО
	// Проверяем есть ли в таблице (корзине) товар, который добавляем
	for (let j = 0; j < Object.keys(cart).length; j++) {
		if (cart[j]) {
			if (cart[j].id == products[i].id) { 
				for (let t = 0; t < cart_tbl.rows.length; t++) {
					if (cart[j].id == cart_tbl.rows[t].getAttribute('id')) {
						cart_tbl.rows[t].cells[1].innerHTML = "<button>+</button> " + (cart[j].amount += 1) + " <button>-</button>"; 
						cart_tbl.rows[t].cells[3].innerHTML = products[i].price * cart[j].amount;
						new_item = 0; // флаг новый/не новый товар
						getTotal ();	
					}
				}
			}
		}
	}

	// Добавляем новый товар
	if (new_item != 0) {
		cart.push({
			id : products[i].id,
			name : products[i].name,
			amount : 1,
			price : products[i].price
		});
		row_clone.querySelector('.row-name').innerHTML = products[i].name;
		row_clone.querySelector('.row-price').innerHTML = products[i].price;
		row_clone.querySelector('.row-sum').innerHTML = products[i].price;
		row_clone.querySelector('.new-row').setAttribute('id', products[i].id);
		
		for (let i = 0; i < cart_tbl.rows.length; i++) {
			del_row_btn[i].addEventListener('click', function (evnt) {
				var tr = this.closest('.new-row');
				// Удаляем из объекта КОРЗИНА
				for (let j = 0; j < Object.keys(cart).length; j++) {
					if (cart[j]) {
						if (tr.getAttribute('id') == cart[j].id) {
							delete cart[j];
						}
					}
				}
				// Удалям из таблицы
				tr.parentNode.removeChild(tr);
				getTotal ();		
			});
		}
		
		cart_tbl.appendChild(row_clone);
		getTotal ();
	} 
	//  Добавление товара - Конец

	//  Удаление товара из корзины - НАЧАЛО
	/*for (let i = 0; i < cart_tbl.rows.length; i++) {
		del_row_btn[i].addEventListener ('click', function (evnt) {
			console.log (cart[i]);
			var tr = this.closest('.new-row');
			// Удалям из таблицы
			tr.parentNode.removeChild(tr);
			// Удаляем из объекта КОРЗИНА
			for (let j = 0; j < Object.keys(cart).length; j++) {
				if (tr.getAttribute('id') == cart[j].id) {
					delete cart[j];
				}
			}
			getTotal ();		
		});
	}*/
	//  Удаление товара из корзины - КОНЕЦ
});
}


// Очистка корзины
var clear_cart = doc.querySelector('.del-cart-btn');

function removeCart () {
	while (cart_tbl.rows.length > 0) {
		cart_tbl.deleteRow(0);
	}	
	cart = []; 
	total_sum.innerHTML = 'Ваша корзина пуста';
}

clear_cart.addEventListener('click', function () {
	removeCart();
});


// Подсчёт итоговой суммы
function getTotal () {
	let totalSum = 0;
	for (let i = 0; i < Object.keys(cart).length; i++) {
		if (cart[i]) {
			totalSum += cart[i].price * cart[i].amount;
		}
	}
	if (totalSum != 0){
		total_sum.innerHTML = 'Итого: ' + totalSum;
	} else {
		total_sum.innerHTML = 'Ваша корзина пуста.'
	}
	
}

// Изменение количества



// Оформить заказ 
var send_btn = doc.querySelector ('.send-order');

send_btn.addEventListener ('click', function () {
	if (cart != []) {
		alert('Корзина пуста.')
	} else {
		alert('Поздравляем! Заказ оформлен!');
		removeCart ();
	}
});








