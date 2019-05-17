import React, { Suspense, CSSProperties } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../spinner';
import SearchForm from './searchForm';
import { render } from 'react-dom';

const MasterView = React.lazy(() => import(/* webpackChunkName: "masterView" */ './masterView'));
const DetailView = React.lazy(() => import(/* webpackChunkName: "detailView" */ './detailView/detailView'));

/** React function component */
export default function ViewContainer() {

    
    return (
        <Suspense fallback={<Spinner/>}>
            <Switch>
                
                <Route exact path="/" component={MasterView}/>
                <div>
                    <SearchForm />
                </div>
                <Route path="/**" component={DetailView}/>
            </Switch>
        </Suspense>
    );
}