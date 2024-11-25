import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryParameterName } from '~/common/enums/app/app';
import { ValueOf } from '~/common/types/types';

type Parameters = {
  isSavedToUrl?: boolean;
  queryParameterName?: ValueOf<typeof QueryParameterName>;
};

const useSearchFilters = ({
  isSavedToUrl = true,
  queryParameterName = QueryParameterName.SEARCH,
}: Parameters = {}): {
  onSearch: (search: string) => void;
  search: string;
} => {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const searchParameter = isSavedToUrl
    ? (searchParameters.get(queryParameterName) ?? '')
    : '';
  const [search, setSearch] = useState<string>(searchParameter);

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);

      return;
    }

    if (isSavedToUrl) {
      const updatedSearchParameters = new URLSearchParams(searchParameters);
      updatedSearchParameters.set(queryParameterName, search);
      setSearchParameters(updatedSearchParameters);
    }
  }, [
    search,
    searchParameters,
    queryParameterName,
    setSearchParameters,
    isSavedToUrl,
    isInitialLoad,
  ]);

  return {
    onSearch: setSearch,
    search,
  };
};

export { useSearchFilters };
