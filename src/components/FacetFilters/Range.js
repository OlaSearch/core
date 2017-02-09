import React from 'react'
import { replaceFacet, executeSearch } from './../../actions/Search'
import flatten from 'ramda/src/flatten'
import noUiSlider from 'nouislider'
import withFacetToggle from './../../decorators/OlaFacetToggle'
import classNames from 'classnames'
import Histogram from './Histogram'
import DateParser from './../../utilities/dateParser'

class RangeFilter extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    selected: React.PropTypes.array.isRequired,
    facet: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    pips: [0, 26, 44.5, 63, 81.5, 100],
    pipsDensity: 4,
    pipsMode: 'positions',
    showPips: false
  };

  onChange = (value) => {
    var { facet, dispatch } = this.props
    let { dateFormat } = facet

    if (typeof value === 'string' || value.length === 1) value = [0, value[0]]

    let [start, end] = value
    start = dateFormat ? DateParser.toUTC(start) : start /* Use ISO string */
    end = dateFormat ? DateParser.toUTC(end) : end

    dispatch(replaceFacet(facet, [start, end]))

    dispatch(executeSearch())
  };

  componentDidUpdate () {
    /**
     * Check if there are values
     */
    if (!this.props.facet.values.length) return this.sliderInput.setAttribute('disabled', true)

    var options = this.getSliderValues(this.props)
    var { interval = 1, dateFormat } = this.props.facet
    var { min, max, value } = options

    /* Convert to numeric value */
    let step = dateFormat ? 1 : parseInt(interval)

    /**
     * Check if min, max is the same, then disable the slider
     */

    if (min === max) {
      min -= 60
      max += 60
      step = 60

      this.sliderInput.setAttribute('disabled', true)
    } else this.sliderInput.removeAttribute('disabled')

    this.sliderInput.noUiSlider.updateOptions({
      step,
      range: {
        min,
        max
      }
    })

    this.sliderInput.noUiSlider.set(value)
  }

  getSliderValues (props) {
    var {facet, selected} = props

    var { values, singleHandle, dateFormat } = facet
    var min = 0
    var max = 0

    values = values.map((value) => {
      if (typeof value.name === 'string' && dateFormat) {
        return DateParser.parse(value.name).getTime()
      }
      return value.name
    })
    /**
     * Selected will be a [['start', 'end']]
     * @param  {[type]} (value [description]
     * @return {[type]}        [description]
     */
    selected = selected.map((values) => {
      return values.map((value) => {
        if (typeof value === 'string' && dateFormat) {
          return DateParser.parse(value).getTime()
        }
        return value
      })
    })

    if (values.length) {
      min = Math.min(...values)
      max = Math.max(...values)
    }

    var arr = flatten(selected)
    var value = arr && arr.length ? arr : [min, max]

    /* If Slider only has 1 handle */

    if (singleHandle) {
      value = arr && arr.length ? arr[1] : [max]
    }
    return {min, max, value}
  }

  componentDidMount () {
    var {
      facet,
      showPips,
      pips,
      pipsDensity,
      pipsMode
    } = this.props

    var options = this.getSliderValues(this.props)

    var { interval = 1, singleHandle, dateFormat } = facet

    /* Convert to numeric value */
    let step = dateFormat ? 1 : parseInt(interval)

    var {min, max, value} = options

    if (min === max) {
      min -= 60
      max += 60
      step = 60

      this.sliderInput.setAttribute('disabled', true)
    } else this.sliderInput.removeAttribute('disabled')

    /* Tooltip format */
    var formatTooltip = {
      to: (value) => {
        return dateFormat ? DateParser.format(value, dateFormat) : Math.floor(value)
      }
    }

    /* Slider options */

    var sliderOptions = {
      start: value,
      step,
      connect: singleHandle ? [true, false] : true,
      tooltips: singleHandle ? [formatTooltip] : [formatTooltip, formatTooltip],
      range: {
        min,
        max
      },
      format: {
        to: (value) => Math.floor(value),
        from: (value) => Math.floor(value)
      }
    }

    var pipsOptions = showPips ? {
      pips: {
        mode: pipsMode,
        values: pips,
        density: pipsDensity,
        stepped: true
      }
    } : {}

    /* Initialize Slider */

    this.slider = noUiSlider.create(this.sliderInput, { ...sliderOptions, ...pipsOptions })

    /* Bind to onchange */

    this.slider.on('change', this.onChange)
  }

  componentWillUnmount () {
    this.slider.destroy()
  }

  shouldComponentUpdate (nextProps) {
    return (
      this.props.facet !== nextProps.facet ||
      this.props.isCollapsed !== nextProps.isCollapsed ||
      this.props.selected !== nextProps.selected
    )
  }
  registerRef = (input) => {
    this.sliderInput = input
  };
  render () {
    var { facet, isCollapsed, toggleDisplay } = this.props
    var { displayName, values, showHistogram } = facet
    var klass = classNames({
      'ola-facet': true,
      'ola-facet-collapsed': isCollapsed
    })

    return (
      <div className={klass}>
        <h4 className='ola-facet-title' onClick={toggleDisplay}>{displayName}</h4>
        <div className='ola-facet-wrapper'>
          {showHistogram && <Histogram data={values} />}
          <div className='ola-slider'>
            <div ref={this.registerRef} />
          </div>
        </div>
      </div>
    )
  }
};

module.exports = withFacetToggle(RangeFilter)
