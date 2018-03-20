#### Usage

````
const App = WithToggle(({ show, hide, toggle, isCollapsed }) =>
  (<div>
    <button onClick={toggle}>{isCollapsed ? 'Hide' : 'Show'}</button>
    {isCollapsed && <div>Content</div>}
  </div>
  )
);
<App />
````