import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import author from './images/AlbertFlores.webp';
import timer from './icons/Timer.svg';
import dishes from './icons/ForkKnife.svg';
import adv from './images/saladAdv.png';
import Form from './form';
import DailyRecipe from './dailyRecipe';
import { Link } from 'react-router-dom';

function RecipePage() {
  const [recipeData, setRecipeData] = useState({});
  const [allRecipes, setAllRecipes] = useState([])
  const { id } = useParams();
  const [completedStatus, setCompletedStatus] = useState([]);
  const [completedDirections, setCompletedDirections] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  useEffect(() => {
    axios
      .get('/RecipesWebsite_App/recipes.json') 
      .then((response) => {
        const recipes = response.data;
        const recipe = recipes.find((r) => r.RecipeID.toString() === id);
        setRecipeData(recipe || {});
        setAllRecipes(recipes || {})
        


      })
      .catch((error) => {
        console.error('Error fetching recipe data:', error);
      });


  }, [id]);

  const formatValue = (value, unit) => {
    if (typeof value === 'number') {
      return `${value} ${unit}`;
    }
    return value;
  };


  const handleIngredientClick = (index) => {
    const newStatus = [...completedStatus];
    newStatus[index] = !newStatus[index];
    setCompletedStatus(newStatus);
  };
  const handleDirectionClick = (index) => {
    const newStatus = [...completedDirections];
    newStatus[index] = !newStatus[index];
    setCompletedDirections(newStatus);
  };

    return(
        <>
        <section className="RecipePage">

                <h2>{recipeData.RecipeName}</h2>

                <div className="RecipePage_info">
                    
                <div className='RecipePage_info__author'>
                                    <img src={author}/>
                                    <p className='author-name'>{recipeData.RecipeAuthorName}</p>
                                    <p className='post-time'>{recipeData.RecipePostDate}</p> 
                 </div>
                 <div className='RecipePage_info__time-category'> 

                    <span className='prep-time'><img src={timer} />   <div className='timer-text'> <p>PREP TIME</p>  <p className='value'>{recipeData.recipePreparingTime}</p> </div> </span>
                    <span className='cooking-time'><img src={timer} />  <div className='timer-text'> <p>COOK TIME</p>  <p className='value'>{recipeData.RecipeCookingTime}</p></div></span>
                    <span className='category'><img src={dishes} /> <p className='value'>{recipeData.RecipeCategory}</p></span>
                     </div>

                


                </div>

                <div className='RecipePage_mainInfo'>

                        <div className='RecipePage_mainInfo__intro'>
                        <img src={recipeData.RecipeImage} />
                        <div className='NutrionInfo'>
                            <h3>Nutrion Information</h3>

        <div className='nutrion_item'>
        <p className='nutrion_item__name'>Calories</p>
        <p className='nutrion_item__value'>{formatValue(recipeData.RecipeNutrion?.NutrionCallories, 'kcal')}</p>
      </div>

      <div className='nutrion_item'>
        <p className='nutrion_item__name'>Total Fat</p>
        <p className='nutrion_item__value'>{formatValue(recipeData.RecipeNutrion?.NutrionTotalFat, 'g')}</p>
      </div>

      <div className='nutrion_item'>
        <p className='nutrion_item__name'>Protein</p>
        <p className='nutrion_item__value'>{formatValue(recipeData.RecipeNutrion?.NutrionProtein, 'g')}</p>
      </div>

      <div className='nutrion_item'>
        <p className='nutrion_item__name'>Carbohydrate</p>
        <p className='nutrion_item__value'>{formatValue(recipeData.RecipeNutrion?.NutrionCarbohydrate, 'g')}</p>
      </div>

      <div className='nutrion_item'>
        <p className='nutrion_item__name'>Cholesterol</p>
        <p className='nutrion_item__value'>{formatValue(recipeData.RecipeNutrion?.NutrionCholesterol, 'mg')}</p>
      </div>
                            

                        </div>
                        </div>


                <p className='Recip-Description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p> 


        
                <div className='OtherRecipeBlock'>

                    <h3>Other Recipe</h3>
            {allRecipes.slice(0,3).map((item)=>(
                     <Link to={`/RecipesWebsite_App/recipe/${item.RecipeID}`}className='OtherRecipeBlock_item' key={item.RecipeName}>
                        <img src={item.RecipeImage} />
                    <div className='OtherRecipeBlock_item-text'>
                        <h4>{item.RecipeName}</h4>

                        <p className='OtherRecipe_authorName'>By {item.RecipeAuthorName}</p>
                    </div>

          
                    </Link>
              ))  }

                    


                    <div className='OtherRecipeBlock-adv'> 
                                <h4>Don’t forget to eat healthy food</h4>
                                
                                <img src={adv}></img>

                                <p>www.foodieland.com</p>
                    </div>



                </div>



                <div className='RecipeCookingBlock'>

                    <h3>Ingredients</h3>

                    {recipeData.RecipeIngridients ? (
  recipeData.RecipeIngridients.map((item, index) => (  <div  onClick={() => handleIngredientClick(index)}    className={`RecipeCooking_item ${completedStatus[index] ? 'deactivate' : ''}`}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="12" fill={completedStatus[index] ? '#000' : 'none'} stroke="#DBE2E5" stroke-width="2"/>
  <path  d="M7 11L11 15L17 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    <p > {item}  </p>           </div>  ))
) : (
  <p>Loading ingredients...</p>
)}


      

                    <h3>Directions</h3>

                    {recipeData.RecipeDirections ? (
        recipeData.RecipeDirections.map((item, index) => (
          <div key={index} onClick={() => handleDirectionClick(index)} className={`RecipeCooking_direction__item ${completedDirections[index] ? 'deactivate' : ''}`}> 
            <div className='directionItem-title'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill={completedDirections[index] ? '#000' : 'none'} stroke="#DBE2E5" strokeWidth="2" />
                <path d="M7 11L11 15L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h4 className='RecipeDirection_step'>{item.Subheading}</h4>
            </div>

            {item.placement === "start" && (
              <img src={item.Image} alt={item.Subheading} />
            )}

            {item.Descriptions.map((description, index) => (
              <p key={index}>{description}</p>
            ))}


            {item.placement === "end" && (
              <img src={item.Image} alt={item.Subheading} />
            )}
          </div>
        ))
      ) : (
        <p>Loading directions...</p>
      )}

 
                    
                </div>


                </div>


        </section>

        <Form/>
        <DailyRecipe/>
        </>
    )
}


export default RecipePage