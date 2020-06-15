// Credit for touch support functions goes to @dev-gian
// source: https://github.com/kapetan/vue-long-press-directive/issues/3#issuecomment-477549212

exports.install = function (Vue, options) {
  if (!options) options = {}
  if (!options.duration) options.duration = 2000

  Vue.directive('long-press', {
    bind: function (el, binding) {
      var self = this

      this._timeout = null
      this._hasMoved = false

      this._onmousedown = function (e) {
        var context = this

        self._timeout = setTimeout(function () {
          binding.value.call(context, e)
        }, options.duration)
      }

      this._ontouchstart = function (e) {
        const context = this

        self._timeout = setTimeout(function () {
          if (!self._hasMoved) {
            binding.value.call(context, e)
            self._hasMoved = false
          }
        }, options.duration)
      }

      this._onmouseup = function () {
        clearTimeout(self._timeout)
      }

      this._ontouchend = function (e) {
        self._hasMoved = false
        clearTimeout(self._timeout)
      }

      this._ontouchmove = function () {
        if (!self._hasMoved) {
          self._hasMoved = true
        }
      }

      // touch support
      el.addEventListener('touchstart', this._ontouchstart, false)
      el.addEventListener('touchmove', this._ontouchmove, false)
      document.addEventListener('touchend', this._ontouchend, false)
      
      // mouse actions
      el.addEventListener('mousedown', this._onmousedown)
      document.addEventListener('mouseup', this._onmouseup)
    },
    unbind: function (el) {
      clearTimeout(this._timeout)
      // mouse actions
      el.removeEventListener('mousedown', this._onmousedown)
      document.removeEventListener('mouseup', this._onmouseup)
      // touch support
      el.removeEventListener('touchstart', this._ontouchstart)
      el.removeEventListener('touchmove', this._ontouchmove)
      document.removeEventListener('touchend', this._ontouchend)
    }
  })
}
