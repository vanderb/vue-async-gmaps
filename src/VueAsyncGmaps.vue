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
                        marker.map = this.map;

                        if (marker.animation) {
                            marker.animation = google.maps.Animation[marker.animation]
                        }

                        this.mapsMarker.push(new google.maps.Marker(marker));
                    })

                    this.initialized = true;
                } catch (error) {
                    console.error(error);
                }
            }
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
  }
</style>
