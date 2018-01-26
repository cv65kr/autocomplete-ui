# Events UI

This library is part of the Apisearch project.

Apisearch Events UI library is set of tools to build a custom analytics dashboard
to visualize your user's search metrics. Its useful to integrate an analytics
section for your Apisearch data, or to integrate it on your own CMS or backoffice.
It provides data visualization for different use cases:
  - Last queries
  - Queries with found results v.s. queries without results
  - Raw list of the index events
  
## Getting started
This is the easiest way to create your first Events UI chart.

```javascript
const dashboard = apisearchEventsUI({   
    appId: 'your_app_id',
    indexId: 'your_index_id',
    token: 'events_token'
});

dashboard.addWidget(
    dashboard.widgets.lastQueries({
        target: '.last-events',
    })
);

dashboard.init();
```
  
## More resources:
- [Examples](https://github.com/apisearch-io/events-ui/tree/master/examples)