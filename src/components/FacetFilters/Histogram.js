import React from 'react'

class Histogram extends React.Component {
  render () {
    var { data } = this.props

    if (!data.length) return null

    /* Sort data */
    data = data.sort((a, b) => a.name - b.name)

    var max = data.reduce((a, b) => a.count > b.count ? a : b)
    var min = data.reduce((a, b) => a.count < b.count ? a : b)

    return (
      <div className='ola-histogram'>
        {data.map((item, idx) => {
          return (
            <div
              key={idx}
              className='ola-histogram-bar'
              style={{
                height: `${(item.count - min.count) / (max.count - min.count) * 100}%`
              }}
            />
          )
        })}
      </div>
    )
  }
}

module.exports = Histogram
