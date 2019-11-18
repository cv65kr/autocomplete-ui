# Autocomplete UI

This library is part of the Apisearch project.

Apisearch Autocomplete UI library is set of tools to build a full custom 
autocomplete search bar.

## Getting started
This is the easiest way to create your first Autocomplete UI.

```javascript
// Create an instance
const autocomplete = apisearchAutocomplete({
    app_id: '9c078fa1a748',
    index_id: 'e742fbfbac24',
    token: 'daf93c2b-40bc-49f2-870e-f8f62ea524ad',
    options: {
       endpoint: 'https://apisearch.global.ssl.fastly.net',
    }
});

// Configure it!
autocomplete({
    inputTarget: '.apisearch-autocomplete',
    datasets: [{
        type: 'post',
        template: {
            header: '<h3>Posts</h3>',
            item: '<a href="{{metadata.url}}">{{metadata.title}}</a>'
        }
    }]
});
```
  
## More resources:
- [Examples](https://github.com/apisearch-io/autocomplete-ui/tree/master/examples)