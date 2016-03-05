import React from 'react';
import { FacetToggle } from './../../decorators/OlaFacetToggle';
import classNames from 'classnames';
import { addFacet, removeFacet, executeSearch } from './../../actions/Search';

class TagCloud extends React.Component{

    static defaultProps = {
        fontSizeMin:  16,
        fontSizeMax:  30,
    };

    handleAddFacet = (facet, value) => {

        var { dispatch } = this.props;

        dispatch(addFacet(facet, value))

        dispatch(executeSearch())

    };

    render(){

        var { facet, selected, isCollapsed, toggleDisplay, fontSizeMin, fontSizeMax } = this.props;
        var { values } = facet;
        var counts = values.map( value => value.count);
        var max = Math.max.apply(this, counts)
        var min = Math.min.apply(this, counts)

        var klass = classNames({
            'ola-facet': true,
            'ola-facet-collapsed': isCollapsed
        });


        return (
            <div className={klass}>
                <h4 className="ola-facet-title" onClick = {toggleDisplay}>{facet.displayName}</h4>
                <div className="ola-facet-wrapper">
                    { values.map ( value => {

                        var { name, count } = value;
                        var handleAddFacet = this.handleAddFacet.bind(this, facet, name);

                        return (
                            <TagCloudItem 
                                name = { name} 
                                count = { count }
                                min = { min }
                                max = { max }
                                fontSizeMin = { fontSizeMin }
                                fontSizeMax = { fontSizeMax }
                                handleAddFacet = { handleAddFacet }
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
};


const TagCloudItem = ( props ) => {

    var { name, count, min, max, fontSizeMax, fontSizeMin, handleAddFacet } = props;    
    var size = (count == min) ? fontSizeMin : ( count / max ) * (fontSizeMax - fontSizeMin) + fontSizeMin;


    return (
        <span style = {{ fontSize: size + 'px'}} onClick = { handleAddFacet}> 
            { name}, 
        </span>
    )
}

module.exports = FacetToggle( TagCloud )