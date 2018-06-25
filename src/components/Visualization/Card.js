import React from 'react'
import PropTypes from 'prop-types'
import Header from './../Answer/common/Header'
import Chart from './Chart'
import { CHART_DEBOUNCE_TIMING } from './../../constants/Settings'
import { getFacetValues } from './../../actions/Search'
import { facetToChartData, debounce } from './../../utilities'
import { replaceFacet, executeSearch } from './../../actions/Search'
import { connect } from 'react-redux'
import equals from 'ramda/src/equals'

/**
 * Visualization card
 * {
    title: 'BAU Units',
    fields: [
      {
        name: 'bauunits_f',
        type: 'range',
        step: 1
      }
    ],
    type: 'bar'
  },
 */
class Card extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false
    }
    this._fetch = debounce(this.fetch, CHART_DEBOUNCE_TIMING)
  }
  static defaultProps = {
    card: null,
    facetQuery: undefined,
    q: null
  }
  static propTypes = {
    facetQuery: PropTypes.array,
    q: PropTypes.string
  }
  componentDidUpdate (prevProps) {
    if (
      !equals(prevProps.card, this.props.card) ||
      !equals(prevProps.facetQuery, this.props.facetQuery) ||
      prevProps.q !== this.props.q
    ) {
      this._fetch()
    }
  }
  componentDidMount () {
    /* If user supplies the data, stop fetching */
    if (this.props.data) return
    this._fetch()
  }
  fetch = () => {
    const { card, q, facetQuery } = this.props
    const { fields, limit } = card
    /**
     * Get facet values
     */
    this.setState({
      isLoading: true
    })
    return this.props
      .getFacetValues({
        fields,
        q,
        facetQuery
      })
      .then((response) => {
        if (!response) return
        const { facets } = response
        this.setState({
          data: facetToChartData({
            facets,
            limit,
            title: this.props.card.title
          }),
          isLoading: false
        })
      })
  }
  handleClick = ({ id: name }, value) => {
    if (!this.props.facetQuery) return
    this.props.replaceFacet({ name }, value)
    this.props.executeSearch()
  }
  render () {
    const { card } = this.props
    const { title, subtitle, url, type } = card
    const { data } = this.state
    return (
      <div className='ola-viz-card'>
        <div className='ola-viz-card-wrapper'>
          <Header title={title} subtitle={subtitle} url={url} />
          <div className='ola-viz-card-body'>
            <Chart data={data} type={type} onClick={this.handleClick} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { getFacetValues, replaceFacet, executeSearch })(
  Card
)
