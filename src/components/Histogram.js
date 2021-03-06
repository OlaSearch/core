import React from 'react'

class Histogram extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.data !== this.props.data
  }
  render () {
    let { data } = this.props
    if (!data.length) return null

    /* Sort data */
    data = data.sort((a, b) => a.name - b.name)

    const max = data.reduce((a, b) => (a.count > b.count ? a : b))
    const { count: maxCount } = max
    return (
      <div className='ola-histogram'>
        {data.map(({ count }, idx) => {
          /* Minimum height is 5% */
          let height = (count / maxCount * 100).toFixed(2)
          if (height < 1) {
            height = height * 50
          } /* 50 is the max height of the histogram */
          return (
            <div
              key={idx}
              className='ola-histogram-bar'
              title={count}
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

export default Histogram
