# geo-vuejs

> A Vue.js project
> Short example how to create an vuejs project using Google maps and authentication with firebase

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### UI - Materialize
[Materialize](https://materializecss.com/)

### Database - Firebase
[Firebase](https://firebase.google.com/)

### Wrapper for Google API
[google-maps-api-loader](https://github.com/laurencedorman/google-maps-api-loader)

```
GoogleMapsApiLoader({
  apiKey: keyOfTheMap
  }).then((google) => {
    // Here you do whatever you want (renderMap , anything)
  })
```

## Examples of code used :

### Create new instance of map

```
const map = new Map(document.getElementById('map'), {
        center: {lat: this.lat, lng: this.lng},
        zoom:6,
        maxZoom:15,
        minZoom:3,
        streetViewControl: false
      })
```

### Get location of the user
```
navigator.geolocation.getCurrentPosition(pos => {
    this.lat = pos.coords.latitude,
    this.lng = pos.coords.longitude
  })
```

### Login using firebase when enables (email and password) as authentication in firebase
```
firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {})

```
### Creating an user in firebase
```
firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {})
```
### SignOut the user
```
firebase.auth().signOut().then(() => {})
```

### A listener that notification any changes in documents
```
firebase.auth().onAuthStateChanged(user => {})
```

### View of the map
![View of the map](https://github.com/HugoOliveiraThor/vuejs-maps/blob/master/src/assets/readme/maps.png)

### View the login page
![View of the login](https://github.com/HugoOliveiraThor/vuejs-maps/blob/master/src/assets/readme/login.png)

### View the signup page
![View of the signup](https://github.com/HugoOliveiraThor/vuejs-maps/blob/master/src/assets/readme/signup.png)



### Example creating a chat in real time to talk with two diferents user located in map using firebase
![](https://github.com/HugoOliveiraThor/vuejs-maps/blob/master/src/assets/readme/chatcrop.gif)


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
