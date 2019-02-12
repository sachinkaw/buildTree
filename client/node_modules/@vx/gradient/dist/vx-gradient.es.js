import PropTypes from 'prop-types';
import React from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

LinearGradient.propTypes = {
  id: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
  x1: PropTypes.string,
  y1: PropTypes.string,
  y2: PropTypes.string,
  fromOffset: PropTypes.string,
  fromOpacity: PropTypes.number,
  toOffset: PropTypes.string,
  toOpacity: PropTypes.number,
  rotate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transform: PropTypes.string
};
function LinearGradient(_ref) {
  var children = _ref.children,
      id = _ref.id,
      from = _ref.from,
      to = _ref.to,
      x1 = _ref.x1,
      y1 = _ref.y1,
      x2 = _ref.x2,
      y2 = _ref.y2,
      _ref$fromOffset = _ref.fromOffset,
      fromOffset = _ref$fromOffset === void 0 ? '0%' : _ref$fromOffset,
      _ref$fromOpacity = _ref.fromOpacity,
      fromOpacity = _ref$fromOpacity === void 0 ? 1 : _ref$fromOpacity,
      _ref$toOffset = _ref.toOffset,
      toOffset = _ref$toOffset === void 0 ? '100%' : _ref$toOffset,
      _ref$toOpacity = _ref.toOpacity,
      toOpacity = _ref$toOpacity === void 0 ? 1 : _ref$toOpacity,
      rotate = _ref.rotate,
      transform = _ref.transform,
      _ref$vertical = _ref.vertical,
      vertical = _ref$vertical === void 0 ? true : _ref$vertical,
      restProps = _objectWithoutProperties(_ref, ["children", "id", "from", "to", "x1", "y1", "x2", "y2", "fromOffset", "fromOpacity", "toOffset", "toOpacity", "rotate", "transform", "vertical"]);

  if (vertical && !x1 && !x2 && !y1 && !y2) {
    x1 = '0';
    x2 = '0';
    y1 = '0';
    y2 = '1';
  }

  return React.createElement("defs", null, React.createElement("linearGradient", _extends({
    id: id,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    gradientTransform: rotate ? "rotate(".concat(rotate, ")") : transform
  }, restProps), !!children && children, !children && React.createElement("stop", {
    offset: fromOffset,
    stopColor: from,
    stopOpacity: fromOpacity
  }), !children && React.createElement("stop", {
    offset: toOffset,
    stopColor: to,
    stopOpacity: toOpacity
  })));
}

RadialGradient.propTypes = {
  id: PropTypes.string.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
  fromOffset: PropTypes.string,
  fromOpacity: PropTypes.number,
  toOffset: PropTypes.string,
  toOpacity: PropTypes.number,
  rotate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transform: PropTypes.string
};
function RadialGradient(_ref) {
  var children = _ref.children,
      id = _ref.id,
      from = _ref.from,
      to = _ref.to,
      _ref$fromOffset = _ref.fromOffset,
      fromOffset = _ref$fromOffset === void 0 ? '0%' : _ref$fromOffset,
      _ref$fromOpacity = _ref.fromOpacity,
      fromOpacity = _ref$fromOpacity === void 0 ? 1 : _ref$fromOpacity,
      _ref$toOffset = _ref.toOffset,
      toOffset = _ref$toOffset === void 0 ? '100%' : _ref$toOffset,
      _ref$toOpacity = _ref.toOpacity,
      toOpacity = _ref$toOpacity === void 0 ? 1 : _ref$toOpacity,
      rotate = _ref.rotate,
      transform = _ref.transform,
      restProps = _objectWithoutProperties(_ref, ["children", "id", "from", "to", "fromOffset", "fromOpacity", "toOffset", "toOpacity", "rotate", "transform"]);

  return React.createElement("defs", null, React.createElement("radialGradient", _extends({
    id: id,
    gradientTransform: rotate ? "rotate(".concat(rotate, ")") : transform
  }, restProps), !!children && children, !children && React.createElement("stop", {
    offset: fromOffset,
    stopColor: from,
    stopOpacity: fromOpacity
  }), !children && React.createElement("stop", {
    offset: toOffset,
    stopColor: to,
    stopOpacity: toOpacity
  })));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientDarkGreen(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#184E86' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#57CA85' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientLightgreenGreen(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#42E695' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#3BB2B8' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientOrangeRed(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#FCE38A' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#F38181' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPinkBlue(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#F02FC2' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#6094EA' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPinkRed(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#F54EA2' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#FF7676' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPurpleOrange(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#7117EA' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#EA6060' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPurpleRed(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#622774' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#C53364' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientPurpleTeal(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#5B247A' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#1BCEDF' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientSteelPurple(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#65799B' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#5E2563' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

/**
 * All props pass through to `<LinearGradient {...props} />`
 */

function GradientTealBlue(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? '#17EAD9' : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? '#6078EA' : _ref$to,
      restProps = _objectWithoutProperties(_ref, ["from", "to"]);

  return React.createElement(LinearGradient, _extends({
    from: from,
    to: to
  }, restProps));
}

export { LinearGradient, RadialGradient, GradientDarkGreen as GradientDarkgreenGreen, GradientLightgreenGreen, GradientOrangeRed, GradientPinkBlue, GradientPinkRed, GradientPurpleOrange, GradientPurpleRed, GradientPurpleTeal, GradientSteelPurple, GradientTealBlue };
