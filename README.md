# Autocomplete UI

This library is part of the Apisearch project.

Apisearch Autocomplete UI library is set of tools to build a full custom 
autocomplete search bar.

## Getting started
This is the easiest way to create your first Autocomplete UI.

```javascript
// Create an instance
const autocomplete = apisearchAutocomplete({
    appId: '234ede3Y',
    indexId: 'e3d223J',
    token: 'bc81352f-2115-47e8-aff9-cfe3d29ebbb7'
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