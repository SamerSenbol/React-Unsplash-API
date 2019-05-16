import React, { CSSProperties } from 'react';
import ViewSection from './viewSection';
import ImageLink from './imageLink';
import searchForm from './searchForm';

interface Props {
    detailViews: string[]
}

/** React function component */
export default function MasterView(props: Props) {

    return (
        <div style={container}>{
            <searchForm/>
        }
         
        </div>
    );
}

const container: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '1em'
}