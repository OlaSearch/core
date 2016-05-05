import React from 'react'

class Histogram extends React.Component {
  static defaultProps = {
    min: null,
    max: null
  };

  shouldComponentUpdate (nextProps) {
    return nextProps.data !== this.props.data
  }
  render () {
    let { data } = this.props

    if (!data.length) return null

    /* Sort data */
    data = data.sort((a, b) => a.name - b.name)

    let max = data.reduce((a, b) => a.count > b.count ? a : b)
    let min = data.reduce((a, b) => a.count < b.count ? a : b)
    let { count: maxCount } = max
    let { count: minCount } = min

    return (
      <div className='ola-histogram'>
        {data.map((item, idx) => {
          let height = (maxCount === minCount ? item.count / maxCount : (item.count - min.count) / (max.count - min.count)) * 100
          return (
            <div
              key={idx}
              className='ola-histogram-bar'
              style={{
                height: `${height}%`
              }}
            />
          )
        })}
      </div>
    )
  }
}

module.exports = Histogram
