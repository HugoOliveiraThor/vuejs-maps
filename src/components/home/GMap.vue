<template>
 <div class="map">
   <h2>Map</h2>
   <div class="google-map" id="map">

   </div>
 </div>
</template>
<script>
import firebase from 'firebase'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { keyMap } from '../../../.env'
import db from '@/firebase/init'
export default {
  name:'GMap',
  data() {
    return {
      lat:53,
      lng:-2,
      google: null,
      map: null

    }
  },
  methods: {
    renderMap () {
      const { Map, Marker } = this.google.maps
      const map = new Map(document.getElementById('map'), {
        center: {lat: this.lat, lng: this.lng},
        zoom:6,
        maxZoom:15,
        minZoom:3,
        streetViewControl: false
      })

      db.collection('users').get().then(users => {
        users.docs.forEach(doc => {
          let data = doc.data()
          if(data.geolocation) {
            const  {lat, lng } = data.geolocation
            let marker = new Marker({
              position: {
                lat,
                lng
              },
                map
            })
            // add click event to marker
            marker.addListener('click', () => {
              this.$router.push({ name: 'Profile', params: {id: doc.id}})
            })
            console.log('marker', marker)

          }
        })
      })
    },
    beginMapsLoader () {
      GoogleMapsApiLoader({
        apiKey: keyMap
        }).then((google) => {
        this.google = google
        this.renderMap()
        })
    }
  },
  mounted() {
    // get current user

    let user = firebase.auth().currentUser

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude,
        this.lng = pos.coords.longitude

        // Find the user record and then update database
        db.collection('users').where('user_id', '==', user.uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
             db.collection('users').doc(doc.id).update({
               geolocation: {
                 lat: pos.coords.latitude,
                 lng: pos.coords.longitude
               }
             })
          })
        }).then(() => {
          this.beginMapsLoader()
        })
      }, (err) => {
        console.log(err)
        this.beginMapsLoader()
      },{
        maximumAge:60000, timeout: 3000
      })
    } else {
      //position center by default values
      this.beginMapsLoader()
    }
  }
}
</script>
<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

</style>

