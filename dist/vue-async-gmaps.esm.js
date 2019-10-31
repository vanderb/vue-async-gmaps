/**
 * Script build by Markus Oberlehner
 * https://markus.oberlehner.net/
 * Article: https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/
 */

var CALLBACK_NAME = 'gmapsCallback';

var initialized = !!window.google;
var resolveInitPromise;
var rejectInitPromise;
// This promise handles the initialization
// status of the google maps script.
var initPromise = new Promise(function (resolve, reject) {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

function LoadGoogleMaps(apiKey) {

  // If Google Maps already is initialized
  // the `initPromise` should get resolved
  // eventually.
  if (initialized) { return initPromise; }

  initialized = true;
  // The callback function is called by
  // the Google Maps script if it is
  // successfully loaded.
  window[CALLBACK_NAME] = function () { return resolveInitPromise(window.google); };

  // We inject a new script tag into
  // the `<head>` of our HTML to load
  // the Google Maps script.
  var script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&callback=" + CALLBACK_NAME;
  script.onerror = rejectInitPromise;
  document.querySelector('head').appendChild(script);

  return initPromise;

}

//

var script = {
    name: "VueAsyncGmaps",
    props: {
        apiKey: {
            type: String,
            default: ""
        },
        config: {
            type: Object,
            default: function default$1() {
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
    data: function data() {
        return {
            initialized: false,
        };
    },
    methods: {
        initGoogleMaps: async function initGoogleMaps() {
            try {
                var google = await LoadGoogleMaps(this.apiKey);
                this.map = new google.maps.Map(this.$el, this.config);

                this.initialized = true;
            } catch (error) {
                console.error(error);
            }
        }
    }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) { style.element.setAttribute('media', css.media); }
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) { style.element.removeChild(nodes[index]); }
      if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"map",staticClass:"vue-async-gmaps",class:{ loaded: _vm.initialized, default: _vm.withCss }},[_vm._t("default"),_vm._v(" "),_vm._t("trigger",[(!_vm.initialized)?_c('button',{class:[_vm.buttonClass],on:{"click":_vm.initGoogleMaps}},[_vm._v("\n      "+_vm._s(_vm.buttonText)+"\n    ")]):_vm._e()],{"initGoogleMaps":_vm.initGoogleMaps})],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-13d9ef99_0", { source: ".vue-async-gmaps.default{width:100%;min-height:350px;display:flex;align-items:center;justify-content:center}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var VueAsyncGmaps = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

export default VueAsyncGmaps;
