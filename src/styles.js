import css from 'styled-jsx/css'
/**
 * These are the styles shared by both chatbot and search
 * Chatbot is rendered in Iframe, but Modal window is appended to parent document. Hence we need to add these styles to parent
 * 1. Modal dialog
 * 2. Any component rendered from an iframe on to the parent page
 */

export default css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  /**
   * Modal can be inserted from an iframe.  (for chatbot only projects)
   */
  .ola-modal-close {
    border: none;
    padding: 0;
    margin: 0;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    cursor: pointer;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
    background: white;
    color: black;
    line-height: 1;
  }
  /* Overlay */
  .ola-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    transition: all 0.1s ease-in-out;
    animation: fadeIn 0.2s linear;
    visibility: visible;
    opacity: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .ola-modal-overlay img {
    max-width: 100%;
    vertical-align: top;
    max-height: calc(100vh - 152px);
    min-width: auto;
  }
  /* Body */
  .ola-modal-body {
    // margin: 76px 0;
  }
  /* Image */
  .ola-modal-content-image {
    text-align: center;
    display: inline-block;
    margin: 76px 0;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3); /* Sharp box shadow */
  }

  /* Inline content */
  // .ola-modal-inline {
  //   text-align: center;
  // }
  // .ola-modal-inline .ola-modal-content {
  //   display: inline;
  // }
  /**
   * Inside modal
   */
  .ola-modal-portal .ola-swipeable {
    margin: 0;
  }
  .ola-modal-portal .ola-swipeable-item,
  .ola-modal-portal .ola-swipeable-flow {
    padding: 0;
  }

  /**
   * Add swipeable to global
   */
  .ola-swipeable {
    position: relative;
    /* Hide scrollbar */
    overflow: hidden;
  }

  .ola-swipeable-flow {
    display: block;
    overflow-x: auto;
    overflow-y: hidden;
    transform: translate3d(0, 0, 0);
    position: relative;
    padding-bottom: 8px; /* Push the scrollbar */
    margin-bottom: -20px;
  }

  .ola-swipeable-flow:focus {
    outline: none;
  }

  .ola-swipeable-flow::-webkit-scrollbar {
    display: none;
  }

  .ola-swipeable-row {
    display: inline-flex;
    flex-direction: row;
    align-items: stretch;
    flex-wrap: nowrap;
    padding-bottom: 20px;
  }

  .ola-swipeable-item {
    flex: 1 1 auto;
    display: flex;
  }

  .ola-swipeable-carousel .ola-swipeable-item .ola-field-img {
    margin: 0;
    padding: 0;
    max-width: none;
  }

  /**
   * Innner
   */
  .ola-swipeable-item-inner {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  /**
   * Hide next prev in mobile
   */
  .ola-swipeable-prev,
  .ola-swipeable-next {
    background: none;
    display: none;
    padding: 0;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -20px;
    bottom: 0;
    width: 40px;
    min-width: 40px;
    height: 40px;
    color: white;
    box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.3);
    opacity: 0;
    z-index: 1;
    transition: opacity 0.2s ease-in;
    line-height: 1;
  }
  // Desktop only
  .ola-search-desktop .ola-swipeable-prev,
  .ola-search-desktop .ola-swipeable-next,
  .ola-modal-desktop .ola-swipeable-prev,
  .ola-modal-desktop .ola-swipeable-next {
    display: block;
  }

  .ola-swipeable-prev:focus,
  .ola-swipeable-next:focus {
    outline: none;
  }
  .ola-swipeable-prev {
    left: 0;
    right: auto;
  }
  .ola-swipeable-prev:disabled,
  .ola-swipeable-prev:disabled,
  .ola-swipeable:hover .ola-swipeable-next:disabled,
  .ola-swipeable:hover .ola-swipeable-prev:disabled {
    opacity: 0;
    visibility: hidden;
    background: white;
    box-shadow: none;
  }

  /**
   * Previos
   */
  .ola-swipeable-prev {
    left: 0;
    right: auto;
  }
`
