import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import hashPassword from '../utils/hashPassword.js';
import matchPassword from '../utils/matchPasswords.js';

import User from '../models/userModels.js';

const userControllers = {
    register: (req, res) => {
        const { email, password, rePassword } = req.body;
        //check if email already exists
        const emailExist = User.getByEmail(email);
        if (emailExist) {
            return res.status(400).render('404', {
                title: 'Email already exists',
                message: 'Email already exist, please register'
            });
        }
        //validate the email, password and check if the passwords match
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const doPasswordsMatch = matchPassword(password, rePassword);

        if (isEmailValid && isPasswordValid && doPasswordsMatch) {
            //hash the password
            const hashedPassword = hashPassword(password);
            //create user
            const newUser = User.add({ email, password: hashedPassword });
            //redirect to login
            return res.status(302).redirect('/api/login');
        } else {
            return res.status(400).render('404', {
                title: 'Incorrect email or password',
                message: 'Incorrect email or password'
            });
        }
    },
    login: (req, res) => {
        const { email, password } = req.body;
        //check if the email exist
        const emailExist = User.getByEmail(email);
        if (!emailExist) {
            return res.status(400).render('404', {
                title: 'Email does not exist',
                message: 'Email does not exist, please register'
            });
        }
        //check if the password is correct
        bcrypt.compare(password, emailExist.password, (err, isValid) => {
            if (err) {
                console.error(err);
            }

            if (!isValid) {
                return res.status(400).render('404', {
                    title: 'Invalid password or email',
                    message: 'Invalid password or email'
                });
            }
            // create token
            const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
            //set cookie
            res.cookie('token', token, { httpOnly: true });
            res.status(302).redirect('/api/flights');
        });
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(302).redirect('/api/login');
    },
    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    }
};

export default userControllers;
