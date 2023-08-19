import React, { useState, useEffect } from 'react';
import author from './images/AlbertFlores.webp';
import axios from 'axios';
import adv from './images/saladAdv.png';
import Form from './form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
function BlogArticlePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 5;

  useEffect(() => {
    const uri = '/RecipesWebsite_App/posts.json';
    axios.get(uri).then(response => {
      setBlogData(response.data);
    }).catch(error => {
      console.error('Error:', error);
    });
  }, []);

  useEffect(() => {
    axios.get('/RecipesWebsite_App/recipes.json').then(response => {
      const recipes = response.data;
      setAllRecipes(recipes || {});
    }).catch(error => {
      console.error('Error fetching recipe data:', error);
    });
  }, []);

  const totalPages = Math.ceil(blogData.length / postsPerPage);

  const goToPreviousPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const goToNextPage = () => {
    if (activePage < totalPages) {
      setActivePage(activePage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setActivePage(1);
  };

  const filteredBlogData = blogData.filter((item) =>
    item.PostTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      
       <motion.section
      className="BlogPage"
      initial={{ transform: 'translateX(100%)' }}
        animate={{ transform: 'translateX(0%)' }}
        exit={{ transform: 'translateX(100%)' }} 
      transition={{ duration: 0.3 }}>
        <h2>Blog & Article</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
        <form className="form-template form_filter">
          <input
            placeholder="Search article, news or recipe..."
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <div className='OtherRecipeBlock'>
          <h3>Recipes</h3>
          {Object.values(allRecipes).slice(0, 3).map(item => (
          <Link to={`/RecipesWebsite_App/recipe/${item.RecipeID}`} className='OtherRecipeBlock_item' key={item.RecipeName}>
              <img src={item.RecipeImage} alt={item.RecipeName} />
              <div className='OtherRecipeBlock_item-text'>
                <h4>  {item.RecipeName} </h4>
                <p className='OtherRecipe_authorName'>By {item.RecipeAuthorName}</p>
              </div>
            </Link>
          ))}
          <div className='OtherRecipeBlock-adv'>
            <h4>Don’t forget to eat healthy food</h4>
            <img src={adv} alt="Advertisement" />
            <p>www.foodieland.com</p>
          </div>
        </div>

        <div className="blog_main">
          {currentPosts.map(item => (
            <Link to={`/RecipesWebsite_App/blog/${item.id}`} className="blog_main__item" key={item.PostTitle}>
              <img src={item.PostMainImage} alt={item.PostTitle} />
              <div className="blog_main__item_text">
                <h3>{item.PostTitle}</h3>
                <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim </p>
                <div className="item_text__postInfo">
                  <span><img src={author} alt="Author" /><p className='postAuthor_name'>{item.PostAuthor}</p></span>
                  <p className='item_text__postTime'> 12 November 2021 </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {searchQuery === '' && (
          <div className='pagin-btns'>
            {activePage > 1 && (
              <span className="pagin-btn" onClick={goToPreviousPage}>
                <KeyboardArrowLeftIcon />
              </span>
            )}
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={`pagin-btn ${index + 1 === activePage ? 'active-btn' : ''}`}
                onClick={() => handlePageClick(index + 1)}
              >
                <p>{index + 1}</p>
              </span>
            ))}
            {activePage < totalPages && (
              <span className="pagin-btn" onClick={goToNextPage}>
                <KeyboardArrowRightIcon />
              </span>
            )}
          </div>
        )}
      </motion.section>
      <Form />
    </>
  );
}

export default BlogArticlePage;
