var doc = document;
var products = [
	{
		name : 'Пивографика.',
		author: 'Пьер Элизабет',
		country : 'Люксембург', 
		category : 'Вина и напитки мира',
		price : 500
	},
	{
		name : 'Чужак',
		author: 'Кинг Стивен',
		country : 'USA', 
		category : 'Вселенная Стивена Кинга',
		price : 782
	},
	{
		name : 'История шарлатанства ',
		author: 'Педерсен Нэйт',
		country : 'Англия', 
		category : 'Красота и здоровье',
		price : 426
	},
	{
		name : 'По любви. Грязный стиль ',
		author: 'Аккерман В.',
		country : 'Люксембург', 
		category : 'Тренды рунета',
		price : 1500
	},
	{
		name : 'Пивографика. Легкое знакомство с историей, географией',
		author: 'Пьер Элизабет',
		country : 'Люксембург', 
		category : 'Вина и напитки мира',
		price : 899
	}
];
var cart = [];
var temp = doc.getElementById('template').content; // Шаблон карточки товара
var cart_row = doc.querySelector('#cart-row').content; // Шаблон строки в таблице 
var catalog = doc.querySelector('.catalog');
var buy_btn = doc.getElementsByClassName('buy-btn');
var cart_tbl = doc.querySelector('#cart-tbl');
var del_row_btn = doc.getElementsByClassName('del-row-btn'); 
var send_btn = doc.querySelector ('.send-order');
var clear_btn = doc.querySelector('.del-cart-btn');
var total_sum = doc.querySelector('#total');

// Создание каталога
function initCatalog () {
	for (let i = 0; i < Object.keys(products).length; i++) {
		let item = temp.cloneNode(true);
		item.querySelector('#head-item').innerHTML = products[i].name + '(' + products[i].country +')';
		item.querySelector('#auth').innerHTML = 'Автор: ' + products[i].author;
		item.querySelector('#categ').innerHTML = products[i].category;
		item.querySelector('#price').innerHTML = '<b>' + products[i].price + " P."+'</b>';
		item.querySelector('.buy-btn').setAttribute('id', i); // Записываем в id ключ массива 
		catalog.appendChild(item);
	}
}

initCatalog ();

 
 // Добавление товара в корзину
function addToCart (id) {
	cart.push( // Добавляем в массив корзины 
		{
			id : id,
			name : products[id].name,
			author: products[id].author,
			country : products[id].country, 
			category : products[id].category,
			amount: 1,
			price : products[id].price
		}
	);
	for (let i = 0; i < cart.length; i++) {
		if (cart[i].id == id) {
			let row = cart_row.cloneNode(true); // Добавляем в front-end
			row.querySelector('.new-row').setAttribute('id', cart[i].id);
			row.querySelector('.row-name').innerHTML = cart[i].name;
			row.querySelector('.row-price').innerHTML = cart[i].price;
			row.querySelector('.row-sum').innerHTML = cart[i].price * cart[i].amount;
			cart_tbl.appendChild(row);
		}
	}
	getTotal();
}


function getTotal () {
	let cur_total = 0;
	for (let i = 0; i < cart.length; i++) {
		if (cart[i]) {
			cur_total += parseInt(cart[i].price * cart[i].amount);
		}
	}
	total_sum.innerHTML = cur_total;
}


function clearCart () {
	while (cart_tbl.rows.length > 0) {
		cart_tbl.deleteRow(0);
	}	
	cart = []; 
	total_sum.innerHTML = 'Ваша корзина пуста';
}

// Кнопка очистки
clear_btn.addEventListener('click', function () {
	clearCart();
});


// Кнопка отправки
send_btn.addEventListener ('click', function () {
	if (cart.length == 0) {
		alert('Корзина пуста.')
	} else {
		alert('Поздравляем! Заказ оформлен!');
		clearCart ();
	}
});


// Добавление/Удаляем товары в/из корзинy(ы)
for (let i = 0; i < Object.keys(products).length; i++) { // Кнопка купить
	buy_btn[i].addEventListener('click', function (evnt) {
		let exst = false; // Товар уже в корзине или нет
		let btn_id = parseInt(buy_btn[i].getAttribute('id')); 

		if (cart.length != 0)  {// Корзина не пуста
			for (let i = 0; i < cart.length; i++) {
				if (cart[i].id == btn_id) { // Товар уже в корзине
					exst = 1; 
					// Меняем количество и сумму в front-end
					for (let j = 0; j < cart_tbl.rows.length; j++) {
						if (cart[i].id == cart_tbl.rows[j].getAttribute('id')) {
							cart_tbl.rows[j].cells[1].innerHTML = ++cart[i].amount; 
							cart_tbl.rows[j].cells[3].innerHTML = cart[i].amount * cart[i].price;
						}
					}
				}
			}
			getTotal();
		}
		if (cart.length == 0 || !exst) { // Корзина пуста или товара нет в корзине
			addToCart(btn_id);
		}
			/*for (let i = 0; i < cart.length; i++) {
				del_row_btn[i].addEventListener('click', function (evnt) {

				});
			}*/
		console.log(cart);
	});
}

