import { render, screen } from '@testing-library/react';
import Input from '../components/Input/Input';

describe('test input component', () => {
    it('should change the input value', () => {
        const mockOnChange = vi.fn();
        render(<Input searchQuery="Test" onChange={mockOnChange} />);
        const input: HTMLInputElement = screen.getByPlaceholderText('Enter the name of the animal');
        expect(input.value).toBe('Test');
    });
});
