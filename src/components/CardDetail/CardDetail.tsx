import { useLoaderData } from 'react-router';
import { AnimalBody } from '../../services/api/Api';

export default function CardDetail() {
    const { animal } = useLoaderData() as { animal: AnimalBody };
    const { name, earthAnimal, earthInsect, avian, canine, feline } = animal;
    return (
        <div>
            <p>Animal</p>
            <p>Name: {name}</p>
            <p>Earth Animal: {earthAnimal ? 'yes' : 'no'}</p>
            <p>Earth Insect: {earthInsect ? 'yes' : 'no'}</p>
            <p>Avian: {avian ? 'yes' : 'no'}</p>
            <p>Canine: {canine ? 'yes' : 'no'}</p>
            <p>Feline: {feline ? 'yes' : 'no'}</p>
        </div>
    );
}
