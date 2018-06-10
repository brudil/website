import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HydroLeaf from '~components/HydroLeaf';
import { Provider } from '../../types/hydro';
import Helmet from 'react-helmet';
import { LoadableLoading } from '~components/LoadableLoading';
import Loadable from 'react-loadable';

const LoadableMarketHome = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketHome" */ './MarketHome').then(
      (m) => m.MarketHome,
    ),
});

const LoadableMarketMyListings = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketMyListings" */ './MarketMyListings').then(
      (m) => m.MarketMyListings,
    ),
});

const LoadableMarketSearch = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketSearch" */ './MarketSearch').then(
      (m) => m.MarketSearch,
    ),
});

const LoadableMarketSection = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketSection" */ './MarketSection').then(
      (m) => m.MarketSection,
    ),
});

const LoadableMarketBookDetail = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketBookDetail" */ './BookDetail').then(
      (m) => m.BookDetail,
    ),
});

const LoadableMarketCreateListing = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketCreateListing" */ './CreateListing').then(
      (m) => m.CreateListing,
    ),
});

const BookMarketApplication: React.SFC<{}> = () => (
  <Route
    path={`/book-market/`}
    component={() => (
      <div className="LokiContainer">
        <Helmet
          titleTemplate="%s | Book Market | Sussex Students' Union"
          defaultTitle="Book Market | Sussex Students' Union"
        />
        <Switch>
          <Route path={`/book-market/`} component={LoadableMarketHome} exact />
          <Route
            path={`/book-market/my-listings`}
            component={LoadableMarketMyListings}
          />
          <Route
            path={`/book-market/search`}
            component={LoadableMarketSearch}
          />
          <Route
            path={`/book-market/section/:sectionSlug`}
            component={LoadableMarketSection}
          />
          <Route
            path={`/book-market/listing/:listingId`}
            component={LoadableMarketBookDetail}
          />
          <Route
            path={`/book-market/list`}
            component={LoadableMarketCreateListing}
          />
        </Switch>
      </div>
    )}
  />
);

export default HydroLeaf({
  disableSSR: true,
  name: 'BookMarket',
  providers: [Provider.Apollo, Provider.Router],
})(BookMarketApplication);
