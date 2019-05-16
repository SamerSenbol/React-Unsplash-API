import React, { Suspense, CSSProperties } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spinner from '../spinner';
import SearchForm from './searchForm';

const MasterView = React.lazy(() => import(/* webpackChunkName: "masterView" */ './masterView'));
const DetailView = React.lazy(() => import(/* webpackChunkName: "detailView" */ './detailView/detailView'));

/** React function component */
export default function ViewContainer() {

    return (
        <Suspense fallback={<Spinner/>}>
            <Switch>
                
                <Route exact path="/" component={MasterView}/>

                <Route path="/**" component={DetailView}/>
            </Switch>
        </Suspense>
    );
}
const centeredForm: CSSProperties = {
    height: '100%',
    textAlign: 'center',
    marginTop: '5em'
}