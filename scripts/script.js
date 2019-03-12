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
function initCatalog (productCount) {
	for (let i = 0; i < productCount; i++) {
		var item = temp.cloneNode(true);
		item.querySelector('#head-item').innerHTML = products[i].name;
		item.querySelector('#auth').innerHTML = 'Автор: ' + products[i].author;
		item.querySelector('#countr').innerHTML = products[i].country;
		item.querySelector('#categ').innerHTML = products[i].category;
		item.querySelector('#price').innerHTML = '<b>' + products[i].price + " P."+'</b>';
		catalog.appendChild(item);
	}
}

initCatalog (5);


// Добавление в корзину
var buy_btn = doc.getElementsByClassName('buy-btn');
var cart_tbl = doc.querySelector('#cart-tbl');
var cart_row = doc.querySelector('#basket-row').content;
var total_sum = doc.querySelector('#total');

for (let i = 0; i < 5; i++) {
	buy_btn[i].addEventListener ('click', function (event) {
	let row_clone = cart_row.cloneNode(true);
	var cart_stat = false;
	let row_dupl = 0; 

	// Проверяем есть ли в таблице (корзине) товар, который добавляем
	for (let j = 0; j < cart_tbl.rows.length; j++) {
		if (cart_tbl.rows[j].cells[0].innerHTML == products[i].name) {
			cart[j].amount += 1; 
			cart_stat = 1; // флаг есть/нет в корзине
			row_dup = j; // запоминаем в какой он строке
		}
	}
	// Добавляем новый товар
	if (cart_stat != 1) {
		row_clone.querySelector('#row-name').innerHTML = products[i].name;
		row_clone.querySelector('#row-price').innerHTML = products[i].price;
		row_clone.querySelector('#row-sum').innerHTML = products[i].price;
		cart_tbl.appendChild(row_clone);
		cart.push({
			id : products[i].id,
			name : products[i].name,
			amount : 1,
			price : products[i].price
		});
		countTotal ();
	} else {
	// Меняем старый товар
		cart_tbl.rows[row_dup].cells[1].innerHTML = "<button>+</button> " + cart[row_dup].amount + " <button>-</button>"; 
		cart_tbl.rows[row_dup].cells[3].innerHTML = products[i].price * cart[row_dup].amount;
		countTotal ();
	}
	//}
	
});
}


// Очистка корзины
var del_cart_btn = doc.querySelector('.del-cart-btn');

function removeCart () {
	while (cart_tbl.rows.length > 0) {
		cart_tbl.deleteRow(0);
	}	
	cart = []; 
	total_sum.innerHTML = 'Ваша корзина пуста';
}

del_cart_btn.addEventListener ('click', function (evnt) {
	removeCart ();
});



// Подсчёт итоговой суммы
function countTotal () {
	let amount = 0;
	for (let i = 0; i < Object.keys(cart).length; i++) {
		amount += cart[i].price * cart[i].amount;
	}
	total_sum.innerHTML = 'Итого: ' + amount;
}

// Изменение количества

// Удаление товара
var btn1 = cart_row.querySelector ('#del-row-btn');
console.log (btn1);
if (btn1) {
	btn1.addEventListener ('click', function (evnt) {
	console.log (btn1);
	removeCart ();
	});
}

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





