import { Mock, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router';
import useSearchQueryRestore from '../utils/hooks/useSearchQueryRestore';

vi.mock('react-router', () => ({
    useNavigate: vi.fn(),
    useParams: () => ({ pageId: '1' }),
}));

vi.mock('../services/api/Api', () => ({
    fetchData: vi.fn(),
}));

describe('test useSearchQueryRestore hook', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        (useNavigate as Mock).mockReturnValue(mockNavigate);
        // (fetchData as Mock).mockResolvedValue(testResponseBody);
        vi.clearAllMocks();
    });

    it('should set input value', async () => {
        const { result } = renderHook(() => useSearchQueryRestore());
        act(() => {
            result.current.handleChangeInput({
                target: { value: 'test search query' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        await waitFor(() => {
            expect(result.current.inputValue).toBe('test search query');
        });
    });

    it('should set searchQueryRef and searchQuery', async () => {
        const { result } = renderHook(() => useSearchQueryRestore());
        act(() => {
            result.current.handleChangeInput({
                target: { value: 'test search query' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.setSearchValues();
        });
        await waitFor(() => {
            expect(result.current.searchQueryRef.current).toBe(result.current.inputValue);
        });
    });

    // it('should redirect to the page not found if the address is incorrect', async () => {
    //     const { result } = renderHook(() => useSearchQueryRestore());
    //     act(() => {
    //         result.current.setCurrentPage('test');
    //     });
    //     await waitFor(() => {
    //         expect(mockNavigate).toHaveBeenCalledWith('/not-found');
    //     });
    // });

    // it('should set the values of seatchResult and pageInfo after the request is executed', async () => {
    //     const { result } = renderHook(() => useSearchQueryRestore());
    //     act(() => {
    //         result.current.handlerSearchData('Test', 0);
    //     });
    //     await waitFor(() => {
    //         expect(result.current.searchResult).toBe(testResponseBody.animals);
    //         expect(result.current.pageInfo).toBe(testResponseBody.page);
    //     });
    // });

    it('should save value in localStorage', () => {
        const { result } = renderHook(() => useSearchQueryRestore());
        act(() => {
            result.current.handleChangeInput({
                target: { value: 'test' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.setSearchValues();
        });
        expect(localStorage.getItem('savedSearch')).toEqual('test');
    });
});
