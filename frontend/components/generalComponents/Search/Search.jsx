import SearchCard from './SearchCard';
import categories from '../../../data/categories';

const Search = ({ setQuery }) =>
  categories.map((category) => <SearchCard setQuery={setQuery} category={category} />);
export default Search;
