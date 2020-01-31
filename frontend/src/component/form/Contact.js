import React from 'react'
import Header from '../Header';
import Link from 'react-router-dom';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <>
        <Header/>
       
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-md-8 offset-md-2'>                            
                        <h2>Contact form</h2>
                            <hr/>
                            <ContactForm/>
                    </div>
                </div>
            </div>
        
       
        </>
)
};

export default Contact;