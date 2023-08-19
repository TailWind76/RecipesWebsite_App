import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import image from './images/Post2.webp'
import list from './icons/recipe.png'
import timer from './icons/Timer.svg'
import dishes from './icons/ForkKnife.svg'
import author from './images/AlbertFlores.webp'
import action from './icons/PlayCircle.svg'
import axios from 'axios';
import breakfast from './icons/breakfast.svg'
import vegan from './icons/vegan.svg';
import meat from './icons/meat.svg';
import dessert from './icons/desert.svg';
import lunch from './icons/lunch.svg';
import chocolate from './icons/chocolate.svg';
import chef from './images/chef.png'
import seafood from './icons/seafood.svg';
import soup from './icons/soup.svg';
import salad from './icons/salad.svg';
import pasta from './icons/pasta.svg';
import rice from './icons/rice.svg';
import instagramBtn from './icons/instagramWhite.svg'
import pizza from './icons/pizza.svg';
import burger from './icons/burger.svg';
import sandwich from './icons/sandwich.svg';
import drink from './icons/drink.svg';
import fruit from './icons/fruit.svg';
import DailyRecipe from './dailyRecipe';
import Form from './form';
import { Link } from 'react-router-dom';

function Homepage() {

    const [isExpanded, setIsExpanded] = useState(false);
    const [recipes, setRecipes] = useState([]);
    
    const toggleExpanded = () => {
      setIsExpanded((prevExpanded) => !prevExpanded);
    };
    const [likedRecipes, setLikedRecipes] = useState(Array(recipes.length).fill(false));
    const Like = (index) => {
      setLikedRecipes((prevLikedRecipes) => {
        const updatedLikedRecipes = [...prevLikedRecipes];
        updatedLikedRecipes[index] = !updatedLikedRecipes[index];
        return updatedLikedRecipes;
      });
    };
  
    const categoryColors = {
        Breakfast: '#FFC107',
        Vegan: '#4CAF50',
        Meat: '#F44336',
        Dessert: '#9C27B0',
        Lunch: '#2196F3',
        Chocolate: '#795548',
        Seafood: '#FF5722',
        Soup: '#00BCD4',
        Salad: '#8BC34A',
        Pasta: '#FF9800',
        Rice: '#673AB7',
        Pizza: '#E91E63',
        Burger: '#3F51B5',
        Sandwich: '#009688',
        Drink: '#FFEB3B',
        Fruit: '#CDDC39',
      };
      const categories = [
        { name: 'Meat', image: meat },
        { name: 'Breakfast', image: breakfast },
        { name: 'Vegan', image: vegan },
        { name: 'Dessert', image: dessert },
        { name: 'Lunch', image: lunch },
        { name: 'Chocolate', image: chocolate },
        { name: 'Seafood', image: seafood },
        { name: 'Soup', image: soup },
        { name: 'Salad', image: salad },
        { name: 'Pasta', image: pasta },
        { name: 'Rice', image: rice },
        { name: 'Pizza', image: pizza },
        { name: 'Burger', image: burger },
        { name: 'Sandwich', image: sandwich },
        { name: 'Drink', image: drink },
        { name: 'Fruit', image: fruit },
      ];
    
      
      useEffect(() => {
        axios.get('/RecipesWebsite_App/recipes.json')
          .then(response => {
            setRecipes(response.data);
          })
          .catch(error => {
            console.error('Error fetching recipes:', error);
          });
      }, []);

  const [translateXValue, setTranslateXValue] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setTranslateXValue((prevTranslateX) => {
       
        const nextTranslateX = prevTranslateX + 100; 
        if (nextTranslateX >= 3 * 100) {
          
          return 0;
        }
        return nextTranslateX;
      });
    }, 10000);

   
    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <motion.section 
    className="Homepage"
    initial={{ transform: 'translateX(-100%)' }}
    animate={{ transform: 'translateX(0%)' }}
    exit={{ transform: 'translateX(-100%)' }}
    transition={{ duration: 0.5}}
    >
      <div className="Homepage_introduce__banner">
        <div className="slider" style={{ transform: `translateX(-${translateXValue}%)` }}>

        {recipes.slice(0,3).map((item) => (
            <div className='banner-content'>
                <div className='banner-content__main'>
                        <div className='banner_text'>
                                <span className='banner_text-genre banner-icon'> <img src={list}/>  <p>Hot Recipes</p>   </span>
                                
                                <h2>{item.RecipeName}</h2>

                                <p className='banner_text-description'>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>

                                <div className='banner-icons'>
                                <span className='banner_text-timer banner-icon'><img src={timer}/> <p>{item.RecipeCookingTime}</p> </span> 
                                
                                <span className='banner_text-product banner-icon'><img src={dishes}/> <p>{item.RecipeCategory}</p></span>
                                </div>

                                <div className='banner-text_author'>
                                    <img src={author}/>

                                    <p className='author-name'>{item.RecipeAuthorName}</p>
                                    <p className='post-time'>{item.RecipePostDate}</p> 
                                    


                                </div>

                               <Link to={`/RecipesWebsite_App/recipe/${item.RecipeID}`}> <button className='banner-action'>
                                         <p>View Recipes</p>  <img src={action} />


                                </button></Link>
                             </div>

                        <img src={item.RecipeImage}></img>

                </div>
        
                </div>
               )) }
             
                   
        </div>
      </div>

      <div className='Homepage_categories'>
        <div className='Homepage_categories__title'>
          <h2>Categories</h2>
          <button onClick={toggleExpanded}>View All Categories</button>
        </div>
        <div className={`homepate_categories__items ${isExpanded ? 'expanded' : ''}`}>
        {categories.map((category) => (
        <Link className="categories_item" to={`/RecipesWebsite_App/recipes/category/${category.name.toLowerCase()}`} key={category.name}>
          <div  style={{ backgroundColor: categoryColors[category.name] }}>
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        </Link>
      ))}
        </div>
      </div>





      <div className='Homepage_recipes'>
            <h2>Simple and tasty recipes</h2>

            <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>

            <div className='Homepage_recipes__items'>
  {recipes.slice(0, 9).map((recipe,index) => (
    <div key={recipe.RecipeID} className='recipes__item'>
      <img className='recipes__item_img' src={recipe.RecipeImage} alt={recipe.RecipeName} />
      <span onClick={() => Like(index)} className='recipe_follow'>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
          { <path d="M28.5022 15C27.6291 14.9985 26.7677 15.2008 25.9865 15.5907C25.2052 15.9807 24.5258 16.5475 24.0022 17.2462C23.293 16.3027 22.3051 15.606 21.1782 15.2548C20.0513 14.9036 18.8426 14.9157 17.7229 15.2894C16.6033 15.663 15.6295 16.3793 14.9393 17.3368C14.2492 18.2943 13.8776 19.4447 13.8772 20.625C13.8772 27.3621 23.2373 32.6813 23.6357 32.9044C23.7477 32.9671 23.8739 33 24.0022 33C24.1305 33 24.2567 32.9671 24.3687 32.9044C26.0902 31.8961 27.7059 30.7173 29.1914 29.3856C32.4665 26.438 34.1272 23.4905 34.1272 20.625C34.1255 19.1337 33.5323 17.7039 32.4778 16.6494C31.4233 15.5949 29.9935 15.0017 28.5022 15Z" fill={likedRecipes[index] ? "red" : "#DBE2E5"}    />}
        </svg>
      </span>
      <h3> <Link to={`/RecipesWebsite_App/recipe/${recipe.RecipeID}`}>{recipe.RecipeName}</Link></h3>
      <div className='recipe_info'>
        <div className='recipe_info_item'> <img src={timer} alt="Cooking Time" /> <p>{recipe.RecipeCookingTime}</p> </div>
        <div className='recipe_info_item'> <img src={dishes} alt="Category" /> <p>{recipe.RecipeCategory}</p> </div>
      </div>
    </div>
  ))}
</div>


      </div>

      <div className='Homepage_chef'>
                <div className='Homepage_chef__text'>
                        <h2>Everyone can be achef in their own kitchen</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>
                        <button>Learn more</button>

                </div>

                <img src={chef}></img>

      </div>

      <div className='Homepage_instagram'>

                <h2>Check out @foodieland on Instagram</h2>

                <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>

                <div className='Homepage_instagram__main'>
                        <img src={image} />
                        <img src={image} />
                        <img src={image} />
                        <img src={image} />

                </div>

                <button> Visit Our Instagram  <img src={instagramBtn} />   </button>



      </div>
    
    <DailyRecipe/>
    <Form/>
    
    </motion.section>
  );
}

export default Homepage;
