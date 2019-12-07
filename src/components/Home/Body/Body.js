import React from 'react';
import { Container} from 'reactstrap';
import classes from './Body.module.css';
import Pricing from './Pricing/Pricing';
import Contact from './Contact/Contact';
import About from './About/About';
import Carousel from './Carousel/Carousel';
import WeFix from './WeFix/WeFix';
import Located from './Located/Located'

const Body = () => (
    <Container>
    	<section className={classes.Space} id="pricing">
    		<Pricing  />
    	</section>
    	<section className={classes.Space} id="contact">
    		<Contact  />
    	</section>
    	<section className={classes.Space} id="who_we_are">
    	    <About />
    	</section>
    	<section className={classes.Space} id="carousel">
    	    <Carousel />
    	</section>
    	<section className={classes.Space} id="we_fix">
    	    <WeFix />
    	</section>
    	<section className={classes.Space} id="located">
    	    <Located />
    	</section>
    	<section className={classes.Space} id="reviews">
    	    
    	</section>
    </Container>
);

export default Body;
