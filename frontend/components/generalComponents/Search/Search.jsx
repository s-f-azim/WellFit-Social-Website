import SearchCard from './SearchCard';
import { categories } from '../../../data/questions';

const Search = () => categories.map((category) => <SearchCard category={category} />);
export default Search;
