// All methods within the below that return a function are public functions

// Storage Controller 
const StorageCtrl = (function() {
    return {
        storeItem: function(item) {
            let items

            if(localStorage.getItem('items') === null) {
                items = [];
                // push item to array and store to ls
                items.push(item);
                
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // get items from ls
                // convert to object, push new item to object
                // set object back to ls
                items = JSON.parse(localStorage.getItem('items'));

                items.push(item);

                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromLocalStorage: function() {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            // loop through items from ls
            // check if the updated item id matches item id within items from ls
            // find index of item in ls, remove it and replace with updated item
            items.forEach(function(item, index) {
                if(updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem)
                }
            })
            localStorage.setItem('items', JSON.stringify(items));
        },
        removeItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index) {
                if(id === item.id) {
                    items.splice(index, 1);
                }
            })
            localStorage.setItem('items', JSON.stringify(items));
        },
        removeAllItemsFromStorage: function() {
            localStorage.clear('items');
        }
    }
}())

// Item Controller
const ItemCtrl = (function() {

    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    

    // Structure/data
    data = {
        // items: [
        //     // {id: 0, name: 'Steak Dinner', calories:700},
        //     // {id: 1, name: 'Eggs', calories:500},
        //     // {id: 2, name: 'Fish', calories:600}
        // ],
        items: StorageCtrl.getItemsFromLocalStorage(),
        currentItem: null,
        totalCalories: 0
    }

    // Public function as this will return the function when ItemCtrl is called (it won't call the function though)
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            let ID;
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            // calories to a number
            calories = parseInt(calories);

            // create new item
            const newItem = new Item(ID, name, calories);

            // push new item ro items array
            data.items.push(newItem);

            return newItem;
            
        },
        getItemById: function(id) {
            let found = null;
            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item;
                }
            })
            return found;
        },
        updateItem: function(name, calories) {
            // calories to number 
            calories = parseInt(calories);

            let found = null;

            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                };
            });
            return found;
        },
        deleteItem(id) {
        //get ids    
        const ids = data.items.map(function(item) {
            return item.id;
        })
        //get index
        const index = ids.indexOf(id);
        // remove item from items array
        data.items.splice(index, 1);

        },
        clearAllItems: function(){
            data.items = [];
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getTotalCalories: function() {
            let total = 0;
            data.items.forEach(function(item) {
                total += item.calories;  
            })
            data.totalCalories = total;

            return data.totalCalories;
        },
        logData: function() {
            return data;
        }
    }
})(); 

// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: "#item-list",
        listItems: "#item-list li",
        addBtn: ".add-btn",
        clearBtn: ".clear-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        totalCalories: ".total-calories"
    }

    // Public method
    return {
        populateItemList: function(items) {
            let html = '';
            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`;
            })
            // populate list item
            document.querySelector(UISelectors.itemList).innerHTML = html; 
        },
        // get values that user has typed into inputs
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            } 
        },
        addListItem: function(item) {

            document.querySelector(UISelectors.itemList).style.display = 'block';

            // create li element and add it to the DOM
            const li = document.createElement('li');
           
            li.className = 'collection-item';
            
            li.id = `item-${item.id}`;
            
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i>
            </a>`;
        
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function(item) {
            // returns a node list
            // cannot loop through a nodeList
            // so need to convert into an array (below)
            let listItems = document.querySelectorAll(UISelectors.listItems);
            
            listItems = Array.from(listItems);
            
            listItems.forEach(function(listItem) {
                const itemId = listItem.getAttribute('id');
                if(itemId === `item-${item.id}`) {
                    // display/change list item in UI
                    document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            })
        },
        deleteListItem: function(id) {
            const itemId = `#item-${id}`;

            let item = document.querySelector(itemId);

            item.remove()

            const totalCalories = ItemCtrl.getTotalCalories();
        
            UICtrl.showTotalCalories(totalCalories);
    
            UICtrl.clearEditState();
    
        },
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);

            listItems.forEach(function(item) {
                item.remove();
            })
            const totalCalories = ItemCtrl.getTotalCalories();
        
            UICtrl.showTotalCalories(totalCalories);

            UICtrl.hideList();
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        showTotalCalories: function(caloriesCount) {
            document.querySelector(UISelectors.totalCalories).textContent = caloriesCount;
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function() {
            return UISelectors;
        } 
    }
})(); 

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {

    // get ID's and CLASSES of elements in the DOM
    const loadEventListeners = function() {
        
        const UISelectors = UICtrl.getSelectors();
        
        // add item click event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // disable enter key for submit
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

         // update item submit
         document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

         // delete item submit
         document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // back item clear inputs
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // edit icon click event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
        
    }

    // add an item submit to ui and data structure
    const itemAddSubmit = function(e) {

       const input = UICtrl.getItemInput();

       if(input.name !== '' && input.calories !== '') {
        // add item to data structure
        const newItem = ItemCtrl.addItem(input.name, input.calories);
        // add item to UI
        UICtrl.addListItem(newItem);

        const totalCalories = ItemCtrl.getTotalCalories();
        
        UICtrl.showTotalCalories(totalCalories);

        StorageCtrl.storeItem(newItem);

        UICtrl.clearEditState();

        // clear input fields
        UICtrl.clearInput();
       }

        e.preventDefault();
    }
    // delete item from data structure and UI
    itemDeleteSubmit = function(e) {

        // get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        UICtrl.deleteListItem(currentItem.id);

        StorageCtrl.removeItemFromStorage(currentItem.id)

        e.preventDefault();
    }

    // click edit item
    const itemEditClick = function(e) {
        if(e.target.classList.contains('edit-item')) {

            const listId = e.target.parentNode.parentNode.id;

            // break into an array (split item-0 into just 0 (or relevant number))
            const listIdArr = listId.split('-');
            // get the actual ID
            const id = parseInt(listIdArr[1]);
            // get the item
            const itemToEdit = ItemCtrl.getItemById(id);
            // set current item
            ItemCtrl.setCurrentItem(itemToEdit);
            // nothing to pass as item we want ot edit is stored in currentItem
            UICtrl.addItemToForm();
            
        }
        e.preventDefault();
    }

    const itemUpdateSubmit = function(e) {

        const item = UICtrl.getItemInput();

        const updatedItem = ItemCtrl.updateItem(item.name, item.calories);    
        
        UICtrl.updateListItem(updatedItem);
        
        const totalCalories = ItemCtrl.getTotalCalories();
        
        UICtrl.showTotalCalories(totalCalories);

        // update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const clearAllItemsClick = function(e) {

        // delte all data from structure
        ItemCtrl.clearAllItems();

        // remove list items from UI
        UICtrl.removeItems();

        // remove all items from ls
        StorageCtrl.removeAllItemsFromStorage();

        e.preventDefault();
    }
    
    // Public method
    return {
        init: function() {

        // clear edit state / set initial state
        UICtrl.clearEditState();

         // Fetch items from data structure   
        const items = ItemCtrl.getItems();

        if(items.length === 0) {
            UICtrl.hideList();
        } else {
            // Populate list with Items
            UICtrl.populateItemList(items);
        }

        const totalCalories = ItemCtrl.getTotalCalories();
        
        UICtrl.showTotalCalories(totalCalories);

        // load event listeners
        loadEventListeners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl); 

App.init();