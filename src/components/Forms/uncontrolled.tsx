import { FormEvent, useRef, useState } from 'react';
import countries from '../../data/countries';
import schema from '../../shema/shema';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFormInfo } from '../../sevices/features/formsSlice';
import { ValidationError } from 'yup';
import { convertToBase64 } from '../../utils/convertToBase64';

interface Errors {
    [key: string]: string | undefined;
}

export function UncontrolledForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const maleRef = useRef<HTMLInputElement>(null);
    const femaleRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const acceptRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<Errors>({});

    async function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = {
            name: nameRef.current?.value,
            age: ageRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            confirmPassword: confirmPasswordRef.current?.value,
            gender: maleRef.current?.checked ? 'male' : 'female',
            image: imageRef.current?.files,
            country: countryRef.current?.value,
            accept: acceptRef.current?.checked,
        };
        try {
            await schema.validate(formData, { abortEarly: false });
            if (formData.image) {
                const imageBase64 = await convertToBase64(formData.image as FileList);
                dispatch(addFormInfo({ ...formData, image: imageBase64 }));
            } else {
                dispatch(addFormInfo(formData));
            }
            navigate('/main');
        } catch (error) {
            if (error instanceof ValidationError) {
                setErrors(
                    error.inner.reduce((obj: { [key: string]: string }, error) => {
                        obj[error.path!] = error.message;
                        return obj;
                    }, {})
                );
                return errors;
            }
        }
        return;
    }

    return (
        <form className="form" onSubmit={onSubmitHandler}>
            <label>
                Name:
                <input ref={nameRef} type="text" placeholder="Name" />
            </label>
            <p className="error">{errors.name}</p>
            <label>
                Age:
                <input ref={ageRef} type="text" placeholder="Age" />
            </label>
            <p className="error">{errors.age}</p>
            <label>
                Email:
                <input ref={emailRef} type="email" placeholder="Email" />
            </label>
            <p className="error">{errors.email}</p>
            <label>
                Password:
                <input ref={passwordRef} type="password" placeholder="Password" />
            </label>
            <p className="error">{errors.password}</p>
            <label>
                Confirm password:
                <input ref={confirmPasswordRef} type="password" placeholder="Confirm your password" />
            </label>
            <p className="error">{errors.confirmPassword}</p>
            <label>
                Gender:
                <label>
                    <input type="radio" value={'male'} ref={maleRef} defaultChecked />
                    Male
                </label>
                <label>
                    <input type="radio" value={'female'} ref={femaleRef} />
                    Female
                </label>
            </label>
            <p className="error">{errors.gender}</p>
            <label>
                File:
                <input type="file" ref={imageRef} />
            </label>
            <p className="error">{errors.image}</p>
            <label>
                Countries:
                <input type="text" ref={countryRef} list="countrieslist" autoComplete="on" />
            </label>
            <datalist id="countrieslist">
                {countries.map((country) => {
                    return <option key={country}>{country}</option>;
                })}
            </datalist>
            <p className="error">{errors.country}</p>
            <label>
                <input type="checkbox" ref={acceptRef} />
                Accept Terms and Conditions agreement
            </label>
            <p className="error">{errors.accept}</p>
            <button type="submit">Submit</button>
        </form>
    );
}
