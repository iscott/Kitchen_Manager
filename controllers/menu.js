const express = require('express');
const router = express.Router();
const Menu = require('../models/menu.js');
const Recipes = require('../models/recipes.js')
// add routes

// Index
router.get('/', (req, res) => {
    // Use menu model to get all menu
    Menu.find({}, (error, allMenu) => {
        ///FILE PATH
        res.render('menu/Index', {
            menu: allMenu
            
        })
    });
    Recipes.find({}, (error, allRecipes) => {
        ///FILE PATH
        // console.log(error)
        // console.log(allRecipes)
        res.render('menu/Index', {
            recipes: allRecipes
        })
    });

});

// New
router.get('/new', (req, res) => {
    Recipes.find({}, (error, allRecipes) =>{
    res.render('menu/New',{
    recipes: allRecipes});
    });
});

// Delete
router.delete('/:id', (req, res) => {
    // Delete document from collection
    Menu.findByIdAndRemove(req.params.id, (err, menu) => {
        res.redirect('/menu');
    });
});

// Put
router.put('/:id', (req, res) => {
    req.body.isGlutenFree = req.body.favorite === "on" ? true : false;
    const menuItem= {
        dishName: req.body.dishName,
        section: req.body.section,
        foodCost: req.body.foodCost,
        menuPrice:req.body.menuPrice,
        station: req.body.station,
        isGlutenFree:req.body.isGlutenFree
    }
    const menu = {
        season:req.body.season,
        menuItem:[],
        isGlutenFree: req.body.isGlutenFree
    }
    menu.menuItem.push(menuItem)
    // Update the menu document using our model
    Menu.findByIdAndUpdate(req.params.id, menu, { new: true }, (err, updatedModel) => {
        res.redirect('/menu');
    });
});

// Create
router.post('/', (req, res) => {
    if (req.body.isGlutenFree === "on") {
        req.body.isGlutenFree = true;
    } else {
        req.body.isGlutenFree = false;
    }
    const menuItem= {
        dishName: req.body.dishName,
        section: req.body.section,
        foodCost: req.body.foodCost,
        menuPrice:req.body.menuPrice,
        station: req.body.station,
        isGlutenFree:req.body.isGlutenFree
    }
    const menu = {
        season:req.body.season,
        menuItem:[],
        isGlutenFree: req.body.isGlutenFree
    }
    menu.menuItem.push(menuItem)
    console.log(menuItem)
    console.log(menu)
    // Use Model to create menu Document
    Menu.create(menu, (error, createdMenu) => {
        // Once created - respond to client
        res.redirect('/menu');
        console.log(error)
    
        console.log(createdMenu)
        
    });
});

// Edit 
router.get('/:id/edit', (req, res) => {
    // Find our document from the collection - using mongoose model

    Menu.findById(req.params.id, (err, foundMenu) => {
        // render the edit view and pass it the found menu
        res.render('menu/Edit', {
            menu: foundMenu
        })
    });
});

// Show
router.get('/:id', (req, res) => {
    // Find the specific document
    Menu.findById(req.params.id, (error, foundMenu) => {
        // render the Show route and pass it the foundmenu
        console.log(error)
        console.log(foundMenu)
        res.render('menu/Show', {
            menu: foundMenu
        });
    });
});

// export router
module.exports = router;