import { BookActionTypes, BookActions } from '../actions/book';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
  skip: number;
  take: number;
  total?: number
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
  skip: 0,
  take: 2,
  total: 0
};

export function reducer(state = initialState, action: BookActions): State {
  switch (action.type) {
    case BookActionTypes.Search: {
      const {query, skip, take} = {...state, ...action.payload };

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query,
          skip: 0,
          take,
          total: 0
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query,
        skip,
        take
      };
    }

    case BookActionTypes.SearchComplete: {
      return {
        ids: action.payload.data.map(book => book.id),
        loading: false,
        error: '',
        query: state.query,
        skip: state.skip,
        take: state.take,
        total: action.payload.total
      };
    }

    case BookActionTypes.SearchError: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        total: 0
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getTotal = (state: State) => state.total;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;

export const getSkip = (state: State) => console.log(state.skip) || state.skip;


export const getPageSize = (state: State) => state.take;
