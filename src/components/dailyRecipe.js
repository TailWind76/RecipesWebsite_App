import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimerIcon from './icons/Timer.svg';
import ForkKnifeIcon from './icons/ForkKnife.svg';
import { Link } from 'react-router-dom';
function DailyRecipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const storedRandomRecipesDate = localStorage.getItem('randomRecipesDate');

    if (storedRandomRecipesDate === today) {
      
      const storedRandomRecipes = JSON.parse(localStorage.getItem('randomRecipes'));
      setRecipes(storedRandomRecipes);
    } else {
      
      axios
        .get('/RecipesWebsite_App/recipes.json')
        .then((response) => {
          const fetchedRecipes = response.data;
          const randomizedRecipes = getRandomRecipes(fetchedRecipes);
          setRecipes(randomizedRecipes);
          localStorage.setItem('randomRecipes', JSON.stringify(randomizedRecipes));
          localStorage.setItem('randomRecipesDate', today);
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error);
        });
    }
  }, []);

  
  const getRandomRecipes = (recipesArray) => {
    const shuffledRecipes = recipesArray.sort(() => 0.5 - Math.random());
    return shuffledRecipes.slice(0, 8);
  };
  const [likedRecipes, setLikedRecipes] = useState(Array(recipes.length).fill(false));
  const Like = (index) => {
    setLikedRecipes((prevLikedRecipes) => {
      const updatedLikedRecipes = [...prevLikedRecipes];
      updatedLikedRecipes[index] = !updatedLikedRecipes[index];
      return updatedLikedRecipes;
    });
  };
  return (
    <div className="DailyRecipe">
      <h2>Try this delicious recipe to make your day</h2>

      <div className="DailyRecipe_main">
        {recipes.map((recipe,index) => (
          <div key={recipe.RecipeID} className="recipes__item">
          <img className="recipes__item_img" src={recipe.RecipeImage} alt={recipe.RecipeName} />
            <span onClick={() => Like(index)} className="recipe_follow">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M28.5022 15C27.6291 14.9985 26.7677 15.2008 25.9865 15.5907C25.2052 15.9807 24.5258 16.5475 24.0022 17.2462C23.293 16.3027 22.3051 15.606 21.1782 15.2548C20.0513 14.9036 18.8426 14.9157 17.7229 15.2894C16.6033 15.663 15.6295 16.3793 14.9393 17.3368C14.2492 18.2943 13.8776 19.4447 13.8772 20.625C13.8772 27.3621 23.2373 32.6813 23.6357 32.9044C23.7477 32.9671 23.8739 33 24.0022 33C24.1305 33 24.2567 32.9671 24.3687 32.9044C26.0902 31.8961 27.7059 30.7173 29.1914 29.3856C32.4665 26.438 34.1272 23.4905 34.1272 20.625C34.1255 19.1337 33.5323 17.7039 32.4778 16.6494C31.4233 15.5949 29.9935 15.0017 28.5022 15Z"
                  fill={likedRecipes[index] ? "red" : "#DBE2E5"}
                />
              </svg>
            </span>
            <h3> <Link to={`/RecipesWebsite_App/recipe/${recipe.RecipeID}`}> {recipe.RecipeName} </Link></h3>
            <div className="recipe_info">
              <div className="recipe_info_item">
                <img src={TimerIcon} alt="Cooking Time" />
                <p>{recipe.RecipeCookingTime}</p>
              </div>
              <div className="recipe_info_item">
                <img src={ForkKnifeIcon} alt="Category" />
                <p>{recipe.RecipeCategory}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyRecipe;
