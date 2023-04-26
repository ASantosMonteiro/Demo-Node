const { response } = require("express");
const Recipe = require("../models/recipe");

//# INI - Controladores para app Angular
const storeRecipes = async (req, res = response) => {
        //param token
    const { email } = req.authUser;
    const recipes = req.body;

    try {
    await Recipe.deleteMany({ userEmail : email});
            
    recipes.forEach(element => {
        //console.log(element);
        let recipe = new Recipe(element);
        recipe.userEmail = email;
        recipe.save();
    });
        
        res.status(200).json({
            msg: "Store recipe ok"
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const fetchRecipes = async (req = request, res = response) => {
        
    const { email } = req.authUser;

    try {
       // console.log(email);
        const recipe = await Recipe.find({ userEmail : email }).exec();
       // console.log(recipe);
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }    
}
//# FIN - Controladores para app Angular

module.exports = {
    storeRecipes,
    fetchRecipes
}