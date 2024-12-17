
document.addEventListener('DOMContentLoaded', () => {
   
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-btn');
    const clearButton = document.getElementById('clear-btn');
    const shoppingList = document.getElementById('shopping-list');

    let items = [];

   
    function loadItems() {
        const storedItems = JSON.parse(localStorage.getItem('shoppingItems') || '[]');
        items = storedItems;
        renderItems();
    }

    function saveItems() {
        localStorage.setItem('shoppingItems', JSON.stringify(items));
    }

   
    function renderItems() {
        
        shoppingList.innerHTML = '';

      
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.toggle('purchased', item.purchased);
            
           
            const itemText = document.createElement('span');
            itemText.textContent = item.name;
            
            
            const actions = document.createElement('div');
            actions.classList.add('item-actions');

         
            const editBtn = document.createElement('button');
            editBtn.textContent = '✏️';
            editBtn.addEventListener('click', () => {
                const newName = prompt('Edit item:', item.name);
                if (newName) {
                    items[index].name = newName;
                    renderItems();
                    saveItems();
                }
            });

            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.addEventListener('click', () => {
                items.splice(index, 1);
                renderItems();
                saveItems();
            });

           
            const purchaseBtn = document.createElement('button');
            purchaseBtn.textContent = '✅';
            purchaseBtn.addEventListener('click', () => {
                items[index].purchased = !items[index].purchased;
                renderItems();
                saveItems();
            });

            actions.append(editBtn, purchaseBtn, deleteBtn);
            li.append(itemText, actions);
            shoppingList.appendChild(li);
        });
    }

    
    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({
                name: itemName,
                purchased: false
            });
            itemInput.value = ''; 
            renderItems();
            saveItems();
        }
    }

    
    function clearList() {
        items = [];
        renderItems();
        saveItems();
    }

  
    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);

    
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });

   
    loadItems();
});