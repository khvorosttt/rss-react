import { InferGetServerSidePropsType } from 'next';
import Pagination from '../components/Pagination/Pagination';
import ResultSection from '../components/ResultSection/ResultSection';
import SearchSection from '../components/SearchSection/SearchSection';
import SelectedPanel from '../components/SelectedPanel/SelectedPanel';
import { getAnimal, getAnimalsByName } from '../services/api/animalsApi';
import { AnimalResponse, ResponseBody } from '../services/types';
import { useDispatch } from 'react-redux';
import { updateAnimals, updateCurrentCardDetail, updateSearchQuery } from '../services/features/animalsSlice';
import CardDetail from '../components/CardDetail/CardDetail';
import AppBackground from '../components/AppBackground/appBackground';
import Loader from '../components/Loader/Loader';
import useLoader from '../utils/hooks/useLoader';

interface ContextInfo {
    searchQuery: string;
    page: number;
    detailId: number;
}

export const getServerSideProps = async (context: { query: ContextInfo }) => {
    const searchQuery = context.query.searchQuery ? context.query.searchQuery : '';
    const { page, detailId } = context.query;
    const data: ResponseBody = await getAnimalsByName(searchQuery, page);

    if (detailId) {
        const detail: AnimalResponse = await getAnimal(detailId);
        return {
            props: {
                info: {
                    data,
                    detail,
                    searchQuery,
                },
            },
        };
    }
    return {
        props: {
            info: {
                data,
                searchQuery,
            },
        },
    };
};

export default function SearchPage({ info }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const loading = useLoader();
    const dispatch = useDispatch();
    console.log(info);
    dispatch(updateAnimals(info.data));
    dispatch(updateSearchQuery(info.searchQuery));
    if (info.detail) {
        dispatch(updateCurrentCardDetail(info.detail.animal));
    }

    return (
        <AppBackground>
            <div className="search-container">
                <SearchSection />
                <div className="result-container">
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <ResultSection />
                            <div id="detail">{info.detail ? <CardDetail /> : null}</div>
                        </>
                    )}
                </div>
                <Pagination />
                <SelectedPanel />
            </div>
        </AppBackground>
    );
}
