import twitter from './icons/twitter.svg'
import facebook from './icons/facebook.svg'
import instagram from './icons/instagram.svg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';


function Header() {
    return (
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <h1 className='Logo'>
          <Link to='RecipesWebsite_App/'>Foodieland</Link> <span className='red'>.</span>
        </h1>
  
        <nav>
          <motion.p className='nav-item' whileHover={{ scale: 1.1 }}>
            <Link to='/RecipesWebsite_App/blogs'> Recipes</Link>
          </motion.p>
          <motion.p className='nav-item' whileHover={{ scale: 1.1 }}>
            <Link to='/RecipesWebsite_App/blogs'>Blog</Link>
          </motion.p>
          <motion.p className='nav-item' whileHover={{ scale: 1.1 }}>
          <Link to='/RecipesWebsite_App/contact'> Contact </Link>
          </motion.p>
          <motion.p className='nav-item' whileHover={{ scale: 1.1 }}>
           <Link to='RecipesWebsite_App/'>  About us</Link>
          </motion.p>
        </nav>
  
        <motion.div className='social'>
          <motion.img src={facebook} whileHover={{ scale: 1.2 }} />
          <motion.img src={twitter} whileHover={{ scale: 1.2 }} />
          <motion.img src={instagram} whileHover={{ scale: 1.2 }} />
        </motion.div>
      </motion.header>
    );
  }
  
  export default Header;