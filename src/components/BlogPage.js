import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import author from './images/LeslieAlexander.webp'
import Form from './form';
import DailyRecipe from './dailyRecipe';
function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  useEffect(() => {
    axios
      .get('/RecipesWebsite_App/posts.json')
      .then((response) => {
        const blogs = response.data;
        const blog = blogs.find((b) => b.id.toString() === id);
        setBlog(blog || {});
      })
      .catch((error) => {
        console.error('Error fetching recipe data:', error);
      });
  }, [id]);

  return (
    <>
    <section className="BlogPage">
      <h2>Full Guide to Becoming a Professional Chef</h2>

      {blog.PostAuthor && (
        <div className="author-blog">
          <span>
            <img src={author} alt="Author" />
            <p className='author-name'>{blog.PostAuthor}</p>
          </span>
          <p className='blog-date'>{blog.PostDate}</p>
        </div>
      )}

      <p className='blog-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac ultrices odio. Nulla at congue diam, at dignissim turpis. Ut vehicula sed velit a faucibus. In feugiat vestibulum velit vel pulvinar.</p>

      {blog.PostMainImage && <img className='blog-mainImage' src={blog.PostMainImage} alt="Main" />}

      <div className='Blog_Main'>
        {blog.PostContent &&
          blog.PostContent.map((content, index) => (
            <div className='Blog_Main__section' key={index}>
              <h3>{content.PostContentTitle}</h3>
              {content.PostContentText &&
                content.PostContentText.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
             
            </div>
          ))}
      </div>
    </section>
    <Form/>
    <DailyRecipe/>
    </>
  );
}

export default BlogPage;
