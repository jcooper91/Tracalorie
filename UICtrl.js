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