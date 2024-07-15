import { ChangeEvent } from 'react';

interface InputProps {
    searchQuery: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ searchQuery, onChange }: InputProps) {
    return <input value={searchQuery} type="text" placeholder="Enter the name of the animal" onChange={onChange} />;
}
