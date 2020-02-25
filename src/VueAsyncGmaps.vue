<template>
  <div class="vue-async-gmaps" :class="{ loaded: initialized, default: withCss }" ref="map">
    <slot></slot>
    <slot name="trigger" :initGoogleMaps="initGoogleMaps">
      <button
          v-if="!initialized"
          :class="[buttonClass]"
          @click="initGoogleMaps"
      >
        {{ buttonText }}
      </button>
    </slot>
  </div>
</template>

<script>
  import LoadGoogleMaps from "./LoadGoogleMaps";

  export default {
    name: "VueAsyncGmaps",
    props: {
      apiKey: {
        type: String,
        default: ""
      },
      config: {
        type: Object,
        default() {
          return {
            center: {
              lat: 50.935173,
              lng: 6.953101
            },
            zoom: 11,
            disableDefaultUI: true,
            scrollwheel: false
          };
        }
      },
      markers: {
        type: Array,
        default() {
          return []
        }
      },
      buttonText: {
        type: String,
        default: "Load"
      },
      buttonClass: {
        type: String,
        default: "btn btn-info"
      },
      withCss: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        initialized: false,
        mapsMarker: []
      };
    },
    methods: {
      async initGoogleMaps() {
        try {
          const google = await LoadGoogleMaps(this.apiKey);
          this.map = new google.maps.Map(this.$el, this.config);

          // Added markers
          this.markers.forEach(marker => {
            marker.map = this.map

            if (marker.animation) {
              marker.animation = google.maps.Animation[marker.animation]
            }

            const mapMarker = new google.maps.Marker(marker)

            if(marker.details) {

              const infowindow = new google.maps.InfoWindow({
                content: this.getInfoWindowTemplate(marker.details)
              });

              mapMarker.addListener('click', () => {
                infowindow.open(this.map, mapMarker);
              });

              google.maps.event.addListener(infowindow, 'domready', () => {
                const el = document.querySelector('.gm-style-iw');
                el.classList.add('info-window');
                const child = el.previousElementSibling || el.previousSibling;
                if(child) {
                  child.remove();
                }
              });

            }

            this.mapsMarker.push(mapMarker);

          })


          const overlay = new google.maps.OverlayView();
          overlay.draw = function () {
            this.getPanes().markerLayer.id='agm-markers';
          };
          overlay.setMap(this.map);

          this.initialized = true;
        } catch (error) {
          console.error(error);
        }
      },
      getInfoWindowTemplate(details) {
        return `
          <div id="iw_content">
            ${details.title ? `<div class="iw_title">${details.title}</div>`: ''}
            <div class="iw_content">
              ${details.description ? `<div>${details.description}</div>`: ''}
              ${details.address ? `<div>${details.address}</div>`: ''}
              ${details.zip && details.city ? `<div>${details.zip} ${details.city}</div>`: ''}
              ${details.link && details.link_text ? `<a href="${details.link}" class="link link--external" target="_blank">${details.link_text}</a>`: ''}
            </div>
          </div>
        `
      },

    }
  };
</script>

<style lang="scss">
  .vue-async-gmaps {
    &.default {
      width: 100%;
      min-height: 350px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .info-window {
      background-color: #fff;
      color: #333333;
      font-size: 14px;
      line-height: 1.4;

      > div {
        padding: 1rem;
        min-width: 240px;
      }

      .iw_title {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 18px;
        font-weight: 500;
      }

      // Close button.
      + div {
        right: 18px !important;
        top: 12px !important;
      }
    }
  }
</style>
