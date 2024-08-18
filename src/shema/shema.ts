import * as yup from 'yup';
import countries from '../data/countries';

const MAX_IMAGE_SIZE = 1024 * 1024;

const schema = yup.object().shape({
    name: yup
        .string()
        .required('The name field is required')
        .test('use first uppercased letter', 'Your name must begin with a capital letter', (value) =>
            /^[A-ZА-Я]/.test(value)
        ),
    age: yup
        .number()
        .typeError('Age must be a number')
        .required('The name field is required')
        .positive('Age must be a positive number'),
    email: yup
        .string()
        .email()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format')
        .required(),
    password: yup
        .string()
        .min(8, 'Password must contain at least 8 characters')
        .max(20, 'Maximum password size 20 characters')
        .matches(/[0-9]/, 'The password must contain at least one number')
        .matches(/[A-Z]/, 'The password must contain at least one capital letter')
        .matches(/[a-z]/, 'The password must contain at least one lowercase letter')
        .matches(/[@$!%*?&#]/, 'The password must contain at least one special character')
        .required('The password field is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], "Passwords don't match")
        .required('Password confirmation is required'),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Please indicate your gender')
        .required('The gender field is required'),
    accept: yup.boolean().oneOf([true], 'To continue, agree to the terms and conditions'),
    image: yup
        .mixed()
        .test('imageSize', 'Maximum image size 1 MG', (value) => {
            if (value instanceof FileList && value && value[0]) {
                return value[0].size <= MAX_IMAGE_SIZE;
            }
            return false;
        })
        .test('imageType', 'The image must be of jpeg or png type', (value) => {
            if (value instanceof FileList && value && value[0]) {
                return value && (value[0].type === 'image/jpeg' || value[0].type === 'image/png');
            }
            return false;
        }),
    country: yup.string().oneOf(countries, 'Country not found').required('The country field is required'),
});

export default schema;

export type IFormInput = yup.InferType<typeof schema>;
