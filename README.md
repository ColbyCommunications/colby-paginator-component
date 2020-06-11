# colby-paginator-component

A bootstrap pagination react component

## Props

| Name           | Description                                                         | Type     | Default Value |
| -------------- | ------------------------------------------------------------------- | -------- | ------------- |
| total          | total number of pages. If equal 0 then the component shows nothing  | number   | 0             |
| currentPage    | The current page number                                             | number   | 1             |
| aroundPages    | minimum number of pages around the current page                     | number   | 3             |
| edgePages      | minimum number of pages at the beggining and at the end             | number   | 1             |
| isAngularLinks | show "Next" and "Prev" links or not?                                | bool     | false         |
| isEdgeLinks    | show "First" and "Last" links or not?                               | bool     | false         |
| minPages       | minimum number of pages which will not be splitted                  | number   | 10            |
| onPageChange   | function called after changing page. With params: function(newPage) | function | () => {}      |
| className      | Additional wrapper class name                                       | string   | " "           |

## Usage

### Simple

```javascript
import React from 'react';
import Paginator from '@colbycommunications/colby-paginator-component';

export default () => <Paginator total={10} />;
```

### Interactive Example

```javascript
import React from 'react';
import Paginator from '@colbycommunications/colby-paginator-component';

export default class Component extends React.Component {
    state = {
        currentPage: 1,
    };

    onPageChange = page => {
        this.setState({ currentPage: page });
    };

    render() {
        return (
            <Paginator
                currentPage={this.state.currentPage}
                total={50}
                onPageChange={this.onPageChange}
                isAngularLinks
                isEdgeLinks
            />
        );
    }
}
```
