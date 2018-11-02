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