import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const Onboard = ({
    values,
    errors,
    touched,
    status
}) => {
    console.log("Values: " + values);
    console.log("Errors: " + errors);
    console.log("Touched: " + touched);

    const[users, setUsers] = useState([]);

    useEffect(() => {
        console.log("The status has changed!", status);

        status &&
            setUsers(users => [
                ...users,
                status
            ]);
    }, [status]);

    return (
        <div className='onboard-form'>
            <Form>
                <label htmlFor='name'>Name: 
                    <Field
                        id='name'
                        type='text'
                        name='name'
                        placeholder='Your Name'
                    />
                    {touched.name &&
                    errors.name &&
                    <p className='errors'>{errors.name}</p>}
                </label>

                <label htmlFor='email'>Email: 
                    <Field
                        id='email'
                        type='email'
                        name='email'
                        placeholder='YourEmail@email.com'
                    />
                    {touched.email &&
                    errors.email &&
                    <p className='errors'>{errors.email}</p>}
                </label>

                <label htmlFor='password'>Password: 
                    <Field
                        id='password'
                        type='password'
                        name='password'
                        placeholder='***Your Password***'
                    />
                    {touched.password &&
                    errors.password &&
                    <p className='errors'>{errors.password}</p>}
                </label>
                <label htmlFor='tos'>Have you read the Terms of Service?
                    <Field
                        id='tos'
                        type='checkbox'
                        name='tos'
                        checked={values.tos}
                    />
                    <span className='checkmark' />
                </label>

                <button type='submit'>Submit!</button>
            </Form>
            {users.map(user => {
                return (
                    <ul>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                    </ul>
                );
            })}
        </div>
    );
};

const FormikOnboard = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(
            "Your name is required!"
        ),
        email: Yup.string().required(
            "Your email is required!"
        ),
        password: Yup.string().required(
            "Your password is required"
        )
    }),

    handleSubmit(
        values,
        { setStatus, resetForm }
    ) {
        axios
            .post()
    }
})(Onboard);

export default FormikOnboard;

/*
Name
 Email
 Password
 Terms of Service (checkbox)
 A Submit button to send our form data to the server.
*/