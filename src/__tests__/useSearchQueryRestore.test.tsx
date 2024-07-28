import { act, cleanup, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ChangeEvent } from 'react';
import '@testing-library/jest-dom';
import useSearchQueryRestore from '../utils/hooks/useSearchQueryRestore';
import LocalStorageMock from './mock/localStorageMock';

describe('test Card component', () => {
    beforeEach(() => {
        window.localStorage = new LocalStorageMock();
    });

    it('should set initial state from localStorage', () => {
        localStorage.setItem('savedSearch', 'test value');
        const { result } = renderHook(() => useSearchQueryRestore());
        expect(result.current.searchQuery).toBe('test value');
    });

    it('should update inputValue', () => {
        const { result } = renderHook(() => useSearchQueryRestore());
        act(() => {
            result.current.handleChangeInput({ target: { value: 'test value' } } as ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.inputValue).toBe('test value');
    });

    it('should update searchQuery', () => {
        const { result } = renderHook(() => useSearchQueryRestore());
        act(() => {
            result.current.handleChangeInput({ target: { value: 'test value' } } as ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.setSearchValues();
        });
        expect(result.current.searchQuery).toBe('test value');
    });

    it('should save searchQuery in localStorage on unmount', () => {
        const { result } = renderHook(() => useSearchQueryRestore());
        act(() => {
            result.current.handleChangeInput({ target: { value: 'test value' } } as ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.setSearchValues();
        });
        act(() => {
            cleanup();
        });
        expect(localStorage.getItem('savedSearch')).toBe('test value');
    });
});
