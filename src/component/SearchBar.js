import { useCallback, useState } from "react";
import { SearchWrapper, SearchButton, SearchInput } from "./CustomComponents/helperComponents";

export default function SearchBar(props) {
    const { search } = {...props};
    const [keyword, setKeyword] = useState();

    const onSearch = useCallback(() =>
        search(keyword)
    , [keyword]);

    const updateSearch = useCallback((e) => {
        // console.log(e);
        setKeyword(e.target.value)
    }, [keyword]);

    return (
        <SearchWrapper>
            <SearchInput onChange={updateSearch}/>
            <SearchButton onClick={onSearch}>Search</SearchButton>
        </SearchWrapper>
    )
}