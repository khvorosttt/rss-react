import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import schema, { IFormInput } from '../../shema/shema';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFormInfo } from '../../sevices/features/formsSlice';
import './form.css';
import { convertToBase64 } from '../../utils/convertToBase64';
import countries from '../../data/countries';
import passwordStrength from '../../utils/password-strength';
import { useState } from 'react';

export default function ControlledForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });
    const [strength, setStrength] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = async (data: IFormInput) => {
        if (data.image) {
            const imageBase64 = await convertToBase64(data.image as FileList);
            dispatch(addFormInfo({ ...data, image: imageBase64 }));
        } else {
            dispatch(addFormInfo(data));
        }
        navigate('/main');
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <label>
                Name:
                <input {...register('name')} type="text" placeholder="Name" />
            </label>
            <p className="error">{errors.name ? errors.name.message : ''}</p>
            <label>
                Age:
                <input {...register('age')} type="text" placeholder="Age" />
            </label>
            <p className="error">{errors.age ? errors.age.message : ''}</p>
            <label>
                Email:
                <input {...register('email')} type="email" placeholder="Email" />
            </label>
            <p className="error">{errors.email ? errors.email.message : ''}</p>
            <label>
                Password:
                <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setStrength(event.target.value)}
                />
            </label>
            <p className="error">{errors.password ? errors.password.message : ''}</p>
            <div className={`password-strength ${passwordStrength(strength)}`} />
            <label>
                Confirm password:
                <input {...register('confirmPassword')} type="password" placeholder="Confirm your password" />
            </label>
            <p className="error">{errors.confirmPassword ? errors.confirmPassword.message : ''}</p>
            <label>
                Gender:
                <label>
                    <input type="radio" value={'male'} {...register('gender', { required: true })} defaultChecked />
                    Male
                </label>
                <label>
                    <input type="radio" value={'female'} {...register('gender', { required: true })} />
                    Female
                </label>
            </label>
            <label>
                File:
                <input type="file" {...register('image')} />
            </label>
            <p className="error">{errors.image ? errors.image.message : ''}</p>
            <label>
                Countries:
                <input type="text" {...register('country')} list="countrieslist" autoComplete="on" />
            </label>
            <datalist id="countrieslist">
                {countries.map((country) => {
                    return <option key={country}>{country}</option>;
                })}
            </datalist>
            <p className="error">{errors.country ? errors.country.message : ''}</p>
            <label>
                <input type="checkbox" {...register('accept')} />
                Accept Terms and Conditions agreement
            </label>
            <p className="error">{errors.accept ? errors.accept.message : ''}</p>
            <button type="submit" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
}
