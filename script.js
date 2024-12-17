document.addEventListener('DOMContentLoaded', () => {
    
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-btn');
    const clearButton = document.getElementById('clear-btn');
    const shoppingList = document.getElementById('shopping-list');

    
    let shoppingItems = [
        { id: 1, name: 'Milk', completed: false },
        { id: 2, name: 'Bread', completed: false },
        { id: 3, name: 'Eggs', completed: false },
        { id: 4, name: 'Cheese', completed: false },
        { id: 5, name: 'Apples', completed: false }
    ];

    
    function generateUniqueId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    
    function renderItems() {
        
        shoppingList.innerHTML = '';

        
        shoppingItems.forEach((item) => {
           
            const li = document.createElement('li');
            li.classList.toggle('completed', item.completed);

            
            const itemText = document.createElement('span');
            itemText.textContent = item.name;

         
            const actions = document.createElement('div');
            actions.classList.add('item-actions');

            
            const doneBtn = document.createElement('button');
            doneBtn.textContent = '✅';
            doneBtn.addEventListener('click', () => {
                
                const foundItem = shoppingItems.find(i => i.id === item.id);
                if (foundItem) {
                    foundItem.completed = !foundItem.completed;
                    renderItems();
                }
            });

            
            const editBtn = document.createElement('button');
            editBtn.textContent = '✏️';
            editBtn.addEventListener('click', () => {
                const newName = prompt('Edit item:', item.name);
                if (newName && newName.trim() !== '') {
                    
                    const foundItem = shoppingItems.find(i => i.id === item.id);
                    if (foundItem) {
                        foundItem.name = newName.trim();
                        renderItems();
                    }
                }
            });

            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.addEventListener('click', () => {
                
                shoppingItems = shoppingItems.filter(i => i.id !== item.id);
                renderItems();
            });

            
            actions.append(doneBtn, editBtn, deleteBtn);

            
            li.append(itemText, actions);

            
            shoppingList.appendChild(li);
        });
    }

    
    function addItem() {
        const itemName = itemInput.value.trim();
        
        
        if (itemName) {
            
            const newItem = {
                id: generateUniqueId(),
                name: itemName,
                completed: false
            };
            
            shoppingItems.push(newItem);
            
            
            renderItems();
            
            
            itemInput.value = '';
        }
    }

    
    function clearList() {
        shoppingItems = []; 
        renderItems();
    }

    
    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);

    
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });


    renderItems();
});