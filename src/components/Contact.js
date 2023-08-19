import chefLike from './images/chefLike.png'
import Form from './form'
import DailyRecipe from './dailyRecipe'
import { motion } from 'framer-motion';

function Contact() {
    
    return(
        <motion.section 
        className="contact"
        initial={{ transform: 'translateX(-100%)' }}
        animate={{ transform: 'translateX(0%)' }}
        exit={{ transform: 'translateX(-100%)' }}
        transition={{ duration: 0.5}}
        >

            <form className="contact_main">
                <h2>Contact us</h2>

                <img src={chefLike}></img>

                <div className='contact_main__form'>


                    <div className='form_item form_name'>
                        <p>Name</p>
                        <input type='text' placeholder='Enter your name...' ></input>
                    </div>

                    <div className='form_item form_email'>
                        <p>EMAIL ADRESS</p>
                        <input type='text' placeholder='Enter your adress...' ></input>
                    </div>

                    
                    <div className='form_item form_subject'>
                        <p>SUBJECT</p>
                        <input type='text' placeholder='Enter  subject...' ></input>
                    </div>


                    
                    <div className='form_item form_Enquiry '>
                        <p>ENQUIRY TYPE </p>
                        <input type='text' placeholder='enquiry type...' ></input>
                    </div>
                    <div className='form_textarea'>
                        <p>MESSAGES</p>
                        <textarea placeholder='enter your messages'></textarea>
                    </div>
                    <button>Submit</button>
                </div>

               
           



            </form>

            <Form/>

            <DailyRecipe/>
            

    </motion.section>)
}


export default Contact