import { ResponseBody } from '../../services/types';
import Card from '../Card/Card';
import { ThemeVariant } from '../../utils/ThemeProvider';
import { getAnimalsByName } from '../../services/api/animalsApi';

export default async function ResultSection({ searchParams }: { searchParams: { searchQuery: string; page: number } }) {
    // const searchParams = useSearchParams();
    // const pageId = searchParams.get('page') || '0';
    // const animals: AnimalBody[] = useSelector((state: RootState) => state.animals.animals);
    // const { theme } = useContext(ThemeContext);
    const data: ResponseBody = await getAnimalsByName(searchParams.searchQuery, searchParams.page);

    return (
        // <div className="result-section">
        //     {animals && animals.length !== 0
        //         ? animals.map((value) => {
        //               return <Card key={value.uid} animal={value} pageId={pageId} theme={`${ThemeVariant.light}`} />;
        //           })
        //         : 'No results were found for your request'}
        // </div>
        <div className="result-section">
            {data.animals.length !== 0
                ? data.animals.map((value) => {
                      return (
                          <Card
                              key={value.uid}
                              animal={value}
                              pageId={searchParams.page.toString()}
                              theme={`${ThemeVariant.light}`}
                          />
                      );
                  })
                : 'No results were found for your request'}
        </div>
    );
}
