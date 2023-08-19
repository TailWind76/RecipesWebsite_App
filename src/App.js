import './components/scss/css/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Homepage from './components/homepage';
import Footer from './components/footer.js';
import Contact from './components/Contact';
import RecipePage from './components/recipePage';
import BlogArticlePage from './components/BlogArticlePage';
import BlogPage from './components/BlogPage';
import RecipesCategory from './components/RecipesCategory';
import { motion, AnimatePresence } from 'framer-motion';  

function App() {
  return (
    <Router>
      <motion.div className="App"> 
        <Header />
        <Routes>
          <Route path="/RecipesWebsite_App" element={<Homepage />} />
          <Route path="/RecipesWebsite_App/contact" element={<Contact />} />
          <Route path="/RecipesWebsite_App/recipe/:id" element={<RecipePage/>} />
          <Route path="/RecipesWebsite_App/blogs" element={<BlogArticlePage/>} />
          <Route path="/RecipesWebsite_App/blog/:id" element={<BlogPage/>} />
          <Route path="/RecipesWebsite_App/recipes/category/:category" element={<RecipesCategory/>} /> 
        </Routes>
        <Footer />
      </motion.div> 
    </Router>
  );
}

export default App;
