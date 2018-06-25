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
import SelectBox from './../SelectBox'

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
    const { card } = props
    this.state = {
      data: [],
      isLoading: false,
      limit: (card && card.limit) || 5
    }
    this._fetch = debounce(this.fetch, CHART_DEBOUNCE_TIMING)
  }
  static defaultProps = {
    card: null,
    facetQuery: undefined,
    q: null,
    limits: [5, 10, 20, 30]
  }
  static propTypes = {
    facetQuery: PropTypes.array,
    q: PropTypes.string
  }
  componentDidUpdate (prevProps, prevState) {
    if (
      !equals(prevProps.card, this.props.card) ||
      !equals(prevProps.facetQuery, this.props.facetQuery) ||
      prevProps.q !== this.props.q ||
      prevState.limit !== this.state.limit
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
    const { fields } = card
    const { limit } = this.state
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
  handeLimitChange = (event) => {
    this.setState({
      limit: event.target.value
    })
  }
  render () {
    const { card, limits } = this.props
    const { title, subtitle, url, type, canChangeLimit } = card
    const { data, limit } = this.state
    return (
      <div className='ola-viz-card'>
        <div className='ola-viz-card-wrapper'>
          <Header title={title} subtitle={subtitle} url={url} />
          {canChangeLimit ? (
            <SelectBox
              value={limit}
              onChange={this.handeLimitChange}
              label='Showing'
              inline
              className='ola-viz-select'
            >
              {limits.map((value, idx) => <option key={idx}>{value}</option>)}
            </SelectBox>
          ) : null}
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
