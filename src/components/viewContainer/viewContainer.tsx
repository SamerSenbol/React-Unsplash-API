import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchForm from './searchForm';


const MasterView = React.lazy(() => import(/* webpackChunkName: "masterView" */ './masterView'));
const DetailView = React.lazy(() => import(/* webpackChunkName: "detailView" */ './detailView/detailView'));

/** React function component */
export default function ViewContainer() {


    return (
        
            <Switch>
                <Route path="/:id" component={DetailView}></Route>
                <SearchForm />
            </Switch>
        
    );
}