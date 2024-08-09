import ResultSection from '../components/ResultSection/ResultSection';
import { getAnimalsByName } from '../services/api/animalsApi';
import { ResponseBody } from '../services/types';

export default async function ResultComponent({ searchQuery }: { searchQuery: string }) {
    const data: ResponseBody = await getAnimalsByName(searchQuery, 0);
    const info = {
        data: data,
        searchQuery,
    };
    return <ResultSection info={info} />;
    // return <div>{data?.animals.map((animal) => <div key={animal.uid}>{animal.name}</div>)}</div>;
}
