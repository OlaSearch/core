import React from 'react'

function Share ({ title, url }) {
  let { location } = window
  let emailUrl = `mailto:?&subject=${title}&body=${url}`
  let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&title=${title}&redirect_uri=${location.href}`
  let twitterUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`

  return (
    <div className='ola-share-links'>
      <span>Share:</span>
      <a href={emailUrl}>Email</a>
      <a href={facebookUrl}>Facebook</a>
      <a href={twitterUrl}>Twitter</a>
    </div>
  )
}

module.exports = Share
