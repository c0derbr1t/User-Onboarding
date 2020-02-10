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

                <label htmlFor='passwordCheck'>Password: 
                    <Field
                        id='passwordCheck'
                        type='password'
                        name='passwordCheck'
                        placeholder='***Your Password, again***'
                    />
                    {touched.passwordCheck &&
                    errors.passwordCheck &&
                    <p className='errors'>{errors.passwordCheck}</p>}
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
            <h3>Users:</h3>
            {users.map(user => {
                return (
                    <div className='userBox'>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                );
            })}
        </div>
    );
};

const FormikOnboard = withFormik({
    mapPropsToValues({ name, email, password, passwordCheck, tos }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            passwordCheck: passwordCheck || '',
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
        .min(3, "Please enter 3 or more characters!")
        .max(30, "Please use 30 or less characters!")
        .required("Your name is required!"),
        email: Yup.string()
            .email("Please use a valid email format!")
            .required("Your email is required!"),
        password: Yup.string()
            .min(6, "Your password must contain at least 6 characters!")
            .required("Your password is required!"),
        passwordCheck: Yup.string()
            .oneOf([Yup.ref('password')], "Your passwords do not match!")
            .required("The password check is required!"),
        tos: Yup.boolean()
        .test('consent', "The Terms of Service agreement is required!", value => value === true)
        .required(" The Terms of Service agreement is required!"),
    }),

    handleSubmit(
        values,
        { setStatus, resetForm }
    ) {
        axios
            .post(
                "https://reqres.in/api/users",
                values                
            )
            .then(response => {
                console.log("Success!", response);
                setStatus(response.data);

                resetForm();
            })
            .catch(error => {
                console.log("There was an error!", error.response);    
            })
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