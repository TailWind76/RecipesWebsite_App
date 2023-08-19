import saladForm1 from './images/FormSalad.png'
import saladForm2 from './images/saladForm2.png'
import rucola from './images/rucola.png'
function Form() {
    

    return(

        <section className="Form">

            <div className="Form_main">

                <h2>Deliciousness to your inbox</h2>

                <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim ad minim </p>

                <form>
                    <input placeholder='Your email address...' type='text'></input>
                    
                    <button>Subscribe</button>

                    <img className='form_image_one' src={saladForm1}></img>
                    <img className='form_image_two' src={saladForm2}></img>
                    <img className='form_image_three' src={rucola}></img>
                </form>
            </div>


        </section>
    )

}


export default Form