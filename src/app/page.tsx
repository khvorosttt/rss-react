import { getAnimal, getAnimalsByName } from '../services/api/animalsApi';
import { AnimalBody, ResponseBody } from '../services/types';
import SearchPage, { PageDataInfo } from './searchPage';

export default async function Page({
    searchParams,
}: {
    searchParams: { searchQuery: string; page: number; detailId?: number };
}) {
    const { searchQuery, page, detailId } = searchParams;
    const data: ResponseBody = await getAnimalsByName(searchQuery, page);
    let info: PageDataInfo;
    if (detailId) {
        const detail: AnimalBody = await getAnimal(detailId);
        info = {
            data,
            searchQuery,
            detail,
        };
    } else {
        info = {
            data,
            searchQuery,
        };
    }
    return <SearchPage info={info} />;
}
