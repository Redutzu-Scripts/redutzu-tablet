# ✨ Information Tablet

**Description**: A helpful tablet script for beginners

![Preview](https://i.imgur.com/YnppNd0.jpg)

## Configuration

```lua
Config.Command = 'help'
Config.CommandDescription = 'Opens the information tablet'
Config.Keybind = true
Config.OpenKey = 'F2'
Config.AnimDict = 'amb@world_human_seat_wall_tablet@female@base'
Config.Prop = 'prop_cs_tablet'
Config.Bone = 28422
```

## How to add a new page?


- Go to `nui/index.js` at line 21 and add a new object to the array
```js
Applications: [
    ...,
    { name: 'Page name', icon: 'img/page_icon.svg', href: 'page_name' }
]
```

- Go to `nui/index.html` at line 73 and add the following template

```html
<div class='page' id='page_name' v-if='currentPage == "page_name"'>
    <div class='content'>
        <!-- HTML Content -->
    </div>
</div>
```