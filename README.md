# vue-async-gmaps
### Load google maps with privacy

Let your user decide to load google-maps by click

**Notes**

```
This package uses promised google-maps load based on article by Markus Oberlehner
https://markus.oberlehner.net/

Article: https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/
```

## Installation

### Install package

```bash
// via npm
npm install @vanderb/vue-async-gmaps --save
// via yarn
yarn add @vanderb/vue-async-gmaps
```

#### Implementation

```javascript
import VueAsyncGmaps from 'vue-async-gmaps'

Vue.component('VueAsyncGmaps', VueAsyncGmaps)

```
## Example

```html
<vue-async-gmaps/>
```

## Options

### Api-Key

Insert your google-maps api-key via `api-key`-property
```html
<vue-async-gmaps api-key="YOUR_GOOGLE_MAPS_API_KEY"/>
```

### Config

Insert your google-maps config via `:config`-property
```html
<vue-async-gmaps ... config="{center: {lat: 50.935173, lng: 6.953101}, zoom: 11}"/>
```
### Button

You can change button-text and class

```html
<vue-async-gmaps button-text="Aye aye, sir" button-class="captains-button"/>
```

## Slot

You can change the default content by slot. If you do you have to insert Button or trigger by yourself (click-handler included)

```html
<vue-async-gmaps>
  <!-- Default Slot (adding custom markup) -->
  <span>Trolooloooo</span>
  
    <!-- Trigger Slot (adding custom trigger) -->
  <template v-slot:trigger="{ initGoogleMaps }">
    <span @click="initGoogleMaps">Aye aye, sir</span>
  </template>
</vue-async-gmaps>
```
