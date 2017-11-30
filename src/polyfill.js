/**
 * Object.assign
 * Map
 * Set
 * Request animation frame
 * Array.prototype.findIndex
 * Number.isNaN
 */
(function(undefined) {
  
  // Object.assign
  Object.assign = function assign(target, source) { // eslint-disable-line no-unused-vars
    for (var index = 1, key, src; index < arguments.length; ++index) {
      src = arguments[index];
  
      for (key in src) {
        if (Object.prototype.hasOwnProperty.call(src, key)) {
          target[key] = src[key];
        }
      }
    }
  
    return target;
  };
  
  
  // Symbol
  // A modification of https://github.com/WebReflection/get-own-property-symbols
  // (C) Andrea Giammarchi - MIT Licensed
  
  (function (Object, GOPS, global) {
  
    if (typeof Symbol !== 'function')  {
  
      var	setDescriptor;
      var id = 0;
      var random = '' + Math.random();
      var prefix = '__\x01symbol:';
      var prefixLength = prefix.length;
      var internalSymbol = '__\x01symbol@@' + random;
      var DP = 'defineProperty';
      var DPies = 'defineProperties';
      var GOPN = 'getOwnPropertyNames';
      var GOPD = 'getOwnPropertyDescriptor';
      var PIE = 'propertyIsEnumerable';
      var ObjectProto = Object.prototype;
      var hOP = ObjectProto.hasOwnProperty;
      var pIE = ObjectProto[PIE];
      var toString = ObjectProto.toString;
      var concat = Array.prototype.concat;
      var cachedWindowNames = typeof window === 'object' ? Object.getOwnPropertyNames(window) : [];
      var nGOPN = Object[GOPN];
      var gOPN = function getOwnPropertyNames (obj) {
        if (toString.call(obj) === '[object Window]') {
          try {
            return nGOPN(obj);
          } catch (e) {
            // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
            return concat.call([], cachedWindowNames);
          }
        }
        return nGOPN(obj);
      };
      var gOPD = Object[GOPD];
      var create = Object.create;
      var keys = Object.keys;
      var freeze = Object.freeze || Object;
      var defineProperty = Object[DP];
      var $defineProperties = Object[DPies];
      var descriptor = gOPD(Object, GOPN);
      var addInternalIfNeeded = function (o, uid, enumerable) {
        if (!hOP.call(o, internalSymbol)) {
          try {
            defineProperty(o, internalSymbol, {
              enumerable: false,
              configurable: false,
              writable: false,
              value: {}
            });
          } catch (e) {
            o[internalSymbol] = {};
          }
        }
        o[internalSymbol]['@@' + uid] = enumerable;
      };
      var createWithSymbols = function (proto, descriptors) {
        var self = create(proto);
        gOPN(descriptors).forEach(function (key) {
          if (propertyIsEnumerable.call(descriptors, key)) {
            $defineProperty(self, key, descriptors[key]);
          }
        });
        return self;
      };
      var copyAsNonEnumerable = function (descriptor) {
        var newDescriptor = create(descriptor);
        newDescriptor.enumerable = false;
        return newDescriptor;
      };
      var get = function get(){};
      var onlyNonSymbols = function (name) {
        return name != internalSymbol &&
          !hOP.call(source, name);
      };
      var onlySymbols = function (name) {
        return name != internalSymbol &&
          hOP.call(source, name);
      };
      var propertyIsEnumerable = function propertyIsEnumerable(key) {
        var uid = '' + key;
        return onlySymbols(uid) ? (
          hOP.call(this, uid) &&
          this[internalSymbol]['@@' + uid]
        ) : pIE.call(this, key);
      };
      var setAndGetSymbol = function (uid) {
        var descriptor = {
          enumerable: false,
          configurable: true,
          get: get,
          set: function (value) {
          setDescriptor(this, uid, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: value
          });
          addInternalIfNeeded(this, uid, true);
          }
        };
        try {
          defineProperty(ObjectProto, uid, descriptor);
        } catch (e) {
          ObjectProto[uid] = descriptor.value;
        }
        return freeze(source[uid] = defineProperty(
          Object(uid),
          'constructor',
          sourceConstructor
        ));
      };
      var Symbol = function Symbol(description) {
        if (this instanceof Symbol) {
          throw new TypeError('Symbol is not a constructor');
        }
        return setAndGetSymbol(
          prefix.concat(description || '', random, ++id)
        );
        };
      var source = create(null);
      var sourceConstructor = {value: Symbol};
      var sourceMap = function (uid) {
        return source[uid];
        };
      var $defineProperty = function defineProp(o, key, descriptor) {
        var uid = '' + key;
        if (onlySymbols(uid)) {
          setDescriptor(o, uid, descriptor.enumerable ?
            copyAsNonEnumerable(descriptor) : descriptor);
          addInternalIfNeeded(o, uid, !!descriptor.enumerable);
        } else {
          defineProperty(o, key, descriptor);
        }
        return o;
      };
  
      var onlyInternalSymbols = function (obj) {
        return function (name) {
          return hOP.call(obj, internalSymbol) && hOP.call(obj[internalSymbol], '@@' + name);
        };
      };
      var $getOwnPropertySymbols = function getOwnPropertySymbols(o) {
        return gOPN(o).filter(o === ObjectProto ? onlyInternalSymbols(o) : onlySymbols).map(sourceMap);
        }
      ;
  
      descriptor.value = $defineProperty;
      defineProperty(Object, DP, descriptor);
  
      descriptor.value = $getOwnPropertySymbols;
      defineProperty(Object, GOPS, descriptor);
  
      descriptor.value = function getOwnPropertyNames(o) {
        return gOPN(o).filter(onlyNonSymbols);
      };
      defineProperty(Object, GOPN, descriptor);
  
      descriptor.value = function defineProperties(o, descriptors) {
        var symbols = $getOwnPropertySymbols(descriptors);
        if (symbols.length) {
        keys(descriptors).concat(symbols).forEach(function (uid) {
          if (propertyIsEnumerable.call(descriptors, uid)) {
          $defineProperty(o, uid, descriptors[uid]);
          }
        });
        } else {
        $defineProperties(o, descriptors);
        }
        return o;
      };
      defineProperty(Object, DPies, descriptor);
  
      descriptor.value = propertyIsEnumerable;
      defineProperty(ObjectProto, PIE, descriptor);
  
      descriptor.value = Symbol;
      defineProperty(global, 'Symbol', descriptor);
  
      // defining `Symbol.for(key)`
      descriptor.value = function (key) {
        var uid = prefix.concat(prefix, key, random);
        return uid in ObjectProto ? source[uid] : setAndGetSymbol(uid);
      };
      defineProperty(Symbol, 'for', descriptor);
  
      // defining `Symbol.keyFor(symbol)`
      descriptor.value = function (symbol) {
        if (onlyNonSymbols(symbol))
        throw new TypeError(symbol + ' is not a symbol');
        return hOP.call(source, symbol) ?
        symbol.slice(prefixLength * 2, -random.length) :
        void 0
        ;
      };
      defineProperty(Symbol, 'keyFor', descriptor);
  
      descriptor.value = function getOwnPropertyDescriptor(o, key) {
        var descriptor = gOPD(o, key);
        if (descriptor && onlySymbols(key)) {
        descriptor.enumerable = propertyIsEnumerable.call(o, key);
        }
        return descriptor;
      };
      defineProperty(Object, GOPD, descriptor);
  
      descriptor.value = function (proto, descriptors) {
        return arguments.length === 1 || typeof descriptors === "undefined" ?
        create(proto) :
        createWithSymbols(proto, descriptors);
      };
      defineProperty(Object, 'create', descriptor);
  
      descriptor.value = function () {
        var str = toString.call(this);
        return (str === '[object String]' && onlySymbols(this)) ? '[object Symbol]' : str;
      };
      defineProperty(ObjectProto, 'toString', descriptor);
  
  
      setDescriptor = function (o, key, descriptor) {
        var protoDescriptor = gOPD(ObjectProto, key);
        delete ObjectProto[key];
        defineProperty(o, key, descriptor);
        if (o !== ObjectProto) {
          defineProperty(ObjectProto, key, protoDescriptor);
        }
      };
    }
  
  }(Object, 'getOwnPropertySymbols', this));
  
  // Symbol.iterator
  if (!Symbol.iterator) Object.defineProperty(Symbol, 'iterator', {value: Symbol('iterator')});
  
  // Symbol.toStringTag
  if (!Symbol.toStringTag)  Object.defineProperty(Symbol, 'toStringTag', {
    value: Symbol('toStringTag')
  });
  
  // _Iterator
  // A modification of https://github.com/medikoo/es6-iterator
  // Copyright (C) 2013-2015 Mariusz Nowak (www.medikoo.com)
  
  var Iterator = (function () { // eslint-disable-line no-unused-vars
    var clear = function () {
      this.length = 0;
      return this;
    };
    var callable = function (fn) {
      if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
      return fn;
    };
  
    var Iterator = function (list, context) {
      if (!(this instanceof Iterator)) {
        return new Iterator(list, context);
      }
      Object.defineProperties(this, {
        __list__: {
          writable: true,
          value: list
        },
        __context__: {
          writable: true,
          value: context
        },
        __nextIndex__: {
          writable: true,
          value: 0
        }
      });
      if (!context) return;
      callable(context.on);
      context.on('_add', this._onAdd.bind(this));
      context.on('_delete', this._onDelete.bind(this));
      context.on('_clear', this._onClear.bind(this));
    };
  
    Object.defineProperties(Iterator.prototype, Object.assign({
      constructor: {
        value: Iterator,
        configurable: true,
        enumerable: false,
        writable: true
      },
      _next: {
        value: function () {
          var i;
          if (!this.__list__) return;
          if (this.__redo__) {
            i = this.__redo__.shift();
            if (i !== undefined) return i;
          }
          if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
          this._unBind();
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      next: {
        value: function () {
          return this._createResult(this._next());
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      _createResult: {
        value: function (i) {
          if (i === undefined) return {
            done: true,
            value: undefined
          };
          return {
            done: false,
            value: this._resolve(i)
          };
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      _resolve: {
        value: function (i) {
          return this.__list__[i];
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      _unBind: {
        value: function () {
          this.__list__ = null;
          delete this.__redo__;
          if (!this.__context__) return;
          this.__context__.off('_add', this._onAdd.bind(this));
          this.__context__.off('_delete', this._onDelete.bind(this));
          this.__context__.off('_clear', this._onClear.bind(this));
          this.__context__ = null;
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      toString: {
        value: function () {
          return '[object Iterator]';
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    }, {
      _onAdd: {
        value: function (index) {
          if (index >= this.__nextIndex__) return;
          ++this.__nextIndex__;
          if (!this.__redo__) {
            Object.defineProperty(this, '__redo__', {
              value: [index],
              configurable: true,
              enumerable: false,
              writable: false
            });
            return;
          }
          this.__redo__.forEach(function (redo, i) {
            if (redo >= index) this.__redo__[i] = ++redo;
          }, this);
          this.__redo__.push(index);
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      _onDelete: {
        value: function (index) {
          var i;
          if (index >= this.__nextIndex__) return;
          --this.__nextIndex__;
          if (!this.__redo__) return;
          i = this.__redo__.indexOf(index);
          if (i !== -1) this.__redo__.splice(i, 1);
          this.__redo__.forEach(function (redo, i) {
            if (redo > index) this.__redo__[i] = --redo;
          }, this);
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      _onClear: {
        value: function () {
          if (this.__redo__) clear.call(this.__redo__);
          this.__nextIndex__ = 0;
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    }));
  
    Object.defineProperty(Iterator.prototype, Symbol.iterator, {
      value: function () {
        return this;
      },
      configurable: true,
      enumerable: false,
      writable: true
    });
    Object.defineProperty(Iterator.prototype, Symbol.toStringTag, {
      value: 'Iterator',
      configurable: false,
      enumerable: false,
      writable: true
    });
  
    return Iterator;
  }());
  
  // Map
  (function(global) {
  
    if (typeof Map !== 'function') {
  
      // Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
      var undefMarker = Symbol('undef');
  
      // NaN cannot be found in an array using indexOf, so we encode NaNs using a private symbol.
      var NaNMarker = Symbol('NaN');
  
      function encodeKey(key) {
        return Number.isNaN(key) ? NaNMarker : key;
      }
      function decodeKey(encodedKey) {
        return (encodedKey === NaNMarker) ? NaN : encodedKey;
      }
  
      function makeIterator(mapInst, getter) {
        var nextIdx = 0;
        var done = false;
        return {
          next: function() {
            if (!mapInst.size || nextIdx === mapInst._keys.length) {
              done = true;
            }
            if (!done) {
              while (nextIdx <= mapInst._keys.length) {
                if (mapInst._keys[nextIdx] === undefMarker) {
                  nextIdx++;
                } else {
                  break;
                }
              }
              if (!mapInst.size || nextIdx === mapInst._keys.length) {
                return {value: void 0, done:true};
              }
              return {value: getter.call(mapInst, nextIdx++), done: false};
            } else {
              return {value: void 0, done:true};
            }
          }
        };
      }
  
      function hasProtoMethod(instance, method){
        return typeof instance[method] === 'function';
      }
  
      var Map = function Map() {
        var data = arguments[0];
        this._keys = [];
        this._values = [];
        this.size = this._size = 0;
        // If `data` is iterable (indicated by presence of a forEach method), pre-populate the map
        if (data && hasProtoMethod(data, 'forEach')){
          // Fastpath: If `data` is a Map, shortcircuit all following the checks
          if (data instanceof Map ||
            // If `data` is not an instance of Map, it could be because you have a Map from an iframe or a worker or something.
            // Check if  `data` has all the `Map` methods and if so, assume data is another Map
            hasProtoMethod(data, 'clear') &&
            hasProtoMethod(data, 'delete') &&
            hasProtoMethod(data, 'entries') &&
            hasProtoMethod(data, 'forEach') &&
            hasProtoMethod(data, 'get') &&
            hasProtoMethod(data, 'has') &&
            hasProtoMethod(data, 'keys') &&
            hasProtoMethod(data, 'set') &&
            hasProtoMethod(data, 'values')){
            data.forEach(function (value, key) {
              this.set.apply(this, [key, value]);
            }, this);
          } else {
            data.forEach(function (item) {
              this.set.apply(this, item);
            }, this);
          }
        }
      };
      Map.prototype = {};
  
      // Some old engines do not support ES5 getters/setters.  Since Map only requires these for the size property, we can fall back to setting the size property statically each time the size of the map changes.
      try {
        Object.defineProperty(Map.prototype, 'size', {
          get: function() {
            return this._size;
          }
        });
      } catch(e) {
      }
  
      Map.prototype['get'] = function(key) {
        var idx = this._keys.indexOf(encodeKey(key));
        return (idx !== -1) ? this._values[idx] : undefined;
      };
      Map.prototype['set'] = function(key, value) {
        var idx = this._keys.indexOf(encodeKey(key));
        if (idx !== -1) {
          this._values[idx] = value;
        } else {
          this._keys.push(encodeKey(key));
          this._values.push(value);
  
          this.size = ++this._size;
        }
        return this;
      };
      Map.prototype['has'] = function(key) {
        return (this._keys.indexOf(encodeKey(key)) !== -1);
      };
      Map.prototype['delete'] = function(key) {
        var idx = this._keys.indexOf(encodeKey(key));
        if (idx === -1) return false;
        this._keys[idx] = undefMarker;
        this._values[idx] = undefMarker;
  
        this.size = --this._size;
        return true;
      };
      Map.prototype['clear'] = function() {
        this._keys = [];
        this._values = [];
        this.size = this._size = 0;
      };
      Map.prototype['values'] = function() {
        var iterator = makeIterator(this, function(i) { return this._values[i]; });
        iterator[Symbol.iterator] = this.values;
        return iterator;
      };
      Map.prototype['keys'] = function() {
        var iterator = makeIterator(this, function(i) { return decodeKey(this._keys[i]); });
        iterator[Symbol.iterator] = this.keys;
        return iterator;
      };
      Map.prototype['entries'] = function() {
        var iterator = makeIterator(this, function(i) { return [decodeKey(this._keys[i]), this._values[i]]; });
        iterator[Symbol.iterator] = this.entries;
        return iterator;
      };
      Map.prototype[Symbol.iterator] = function() {
        return makeIterator(this, function(i) { return [decodeKey(this._keys[i]), this._values[i]]; });
      };
      Map.prototype['forEach'] = function(callbackFn, thisArg) {
        thisArg = thisArg || global;
        var iterator = this.entries();
        var result = iterator.next();
        while (result.done === false) {
          callbackFn.call(thisArg, result.value[1], result.value[0], this);
          result = iterator.next();
        }
      };
      Map.prototype['constructor'] =
      Map.prototype[Symbol.species] = Map;
  
      Map.prototype.constructor = Map;
      Map.name = "Map";
  
      // Export the object
      global.Map = Map;
    }
  
  }(this));
  
  // Set
  (function(global) {
  
    if (typeof Set !== 'function') {
  
      // Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
      var undefMarker = Symbol('undef');
  
      // NaN cannot be found in an array using indexOf, so we encode NaNs using a private symbol.
      var NaNMarker = Symbol('NaN');
  
      function encodeVal(data) {
        return Number.isNaN(data) ? NaNMarker : data;
      }
      function decodeVal(encodedData) {
        return (encodedData === NaNMarker) ? NaN : encodedData;
      }
  
      function makeIterator(setInst, getter) {
        var nextIdx = 0;
        return {
          next: function() {
            while (setInst._values[nextIdx] === undefMarker) nextIdx++;
            if (nextIdx === setInst._values.length) {
              return {value: void 0, done: true};
            }
            else {
              return {value: getter.call(setInst, nextIdx++), done: false};
            }
          }
        };
      }
  
      var Set = function Set() {
        var data = arguments[0];
        this._values = [];
        this.size = this._size = 0;
  
        // If `data` is iterable (indicated by presence of a forEach method), pre-populate the set
        data && (typeof data.forEach === 'function') && data.forEach(function (item) {
          this.add.call(this, item);
        }, this);
      };
  
      // Some old engines do not support ES5 getters/setters.  Since Set only requires these for the size property, we can fall back to setting the size property statically each time the size of the set changes.
      try {
        Object.defineProperty(Set.prototype, 'size', {
          get: function() {
            return this._size;
          }
        });
      } catch(e) {
      }
  
      Set.prototype['add'] = function(value) {
        value = encodeVal(value);
        if (this._values.indexOf(value) === -1) {
          this._values.push(value);
          this.size = ++this._size;
        }
        return this;
      };
      Set.prototype['has'] = function(value) {
        return (this._values.indexOf(encodeVal(value)) !== -1);
      };
      Set.prototype['delete'] = function(value) {
        var idx = this._values.indexOf(encodeVal(value));
        if (idx === -1) return false;
        this._values[idx] = undefMarker;
        this.size = --this._size;
        return true;
      };
      Set.prototype['clear'] = function() {
        this._values = [];
        this.size = this._size = 0;
      };
      Set.prototype['values'] =
      Set.prototype['keys'] = function() {
        var iterator = makeIterator(this, function(i) { return decodeVal(this._values[i]); });
        iterator[Symbol.iterator] = this.keys;
        return iterator;
      };
      Set.prototype[Symbol.iterator] = function() {
        return makeIterator(this, function(i) { return decodeVal(this._values[i]); });
      };
      Set.prototype['entries'] = function() {
        var iterator = makeIterator(this, function(i) { return [decodeVal(this._values[i]), decodeVal(this._values[i])]; });
        iterator[Symbol.iterator] = this.entries;
        return iterator;
      };
      Set.prototype['forEach'] = function(callbackFn, thisArg) {
        thisArg = thisArg || global;
        var iterator = this.entries();
        var result = iterator.next();
        while (result.done === false) {
          callbackFn.call(thisArg, result.value[1], result.value[0], this);
          result = iterator.next();
        }
      };
      Set.prototype['constructor'] =
      Set.prototype[Symbol.species] = Set;
  
      Set.prototype.constructor = Set;
      Set.name = "Set";
  
      // Export the object
      global.Set = Set;
    }
  
  }(this));

  // Number.isNaN
  Number.isNaN = Number.isNaN || function(value) {
    return typeof value === "number" && isNaN(value);
  };

  /* Polyfill for findIndex */
  if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {value: function (predicate) {
      if (this == null) { throw new TypeError('"this" is null or not defined') }
      var o = Object(this); var len = o.length >>> 0; if (typeof predicate !== 'function') { throw new TypeError('predicate must be a function') }
      var thisArg = arguments[1]; var k = 0; while (k < len) {
        var kValue = o[k]; if (predicate.call(thisArg, kValue, k, o)) { return k }
        k++
      }
      return -1
    }})
  }

  // performance.now
  (function (global) {
    var
  startTime = Date.now()

    if (!global.performance) {
      global.performance = {}
    }

    global.performance.now = function () {
      return Date.now() - startTime
    }
  }(this));

  // requestAnimationFrame
  (function (global) {
    var rafPrefix

    if ('mozRequestAnimationFrame' in global) {
      rafPrefix = 'moz'
    } else if ('webkitRequestAnimationFrame' in global) {
      rafPrefix = 'webkit'
    }

    if (rafPrefix) {
      global.requestAnimationFrame = function (callback) {
        return global[rafPrefix + 'RequestAnimationFrame'](function () {
          callback(performance.now())
        })
      }
      global.cancelAnimationFrame = global[rafPrefix + 'CancelAnimationFrame']
    } else {
      var lastTime = Date.now()

      global.requestAnimationFrame = function (callback) {
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function')
        }

        var
          currentTime = Date.now(),
          delay = 16 + lastTime - currentTime

        if (delay < 0) {
          delay = 0
        }

        lastTime = currentTime

        return setTimeout(function () {
          lastTime = Date.now()

          callback(performance.now())
        }, delay)
      }

      global.cancelAnimationFrame = function (id) {
        clearTimeout(id)
      }
    }
  }(this));  
  
})
.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});