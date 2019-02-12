import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import { tree, treemap, cluster, pack, partition } from 'd3-hierarchy';

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

HierarchyDefaultLink.propTypes = {
  link: PropTypes.object
};
function HierarchyDefaultLink(_ref) {
  var link = _ref.link;
  return React.createElement("line", {
    x1: link.source.x,
    y1: link.source.y,
    x2: link.target.x,
    y2: link.target.y,
    strokeWidth: 2,
    stroke: "#999",
    strokeOpacity: 0.6
  });
}

HierarchyDefaultNode.propTypes = {
  node: PropTypes.object
};
function HierarchyDefaultNode(_ref) {
  var node = _ref.node;
  return React.createElement("circle", {
    cx: node.x,
    cy: node.y,
    r: 15,
    fill: "#21D4FD"
  });
}

Tree.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.arrayOf(PropTypes.number),
  nodeSize: PropTypes.arrayOf(PropTypes.number),
  separation: PropTypes.func,
  linkComponent: PropTypes.any,
  nodeComponent: PropTypes.any
};
function Tree(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      nodeSize = _ref.nodeSize,
      separation = _ref.separation,
      children = _ref.children,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? HierarchyDefaultLink : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultNode : _ref$nodeComponent,
      restProps = _objectWithoutProperties(_ref, ["top", "left", "className", "root", "size", "nodeSize", "separation", "children", "linkComponent", "nodeComponent"]);

  var tree$$1 = tree();
  if (size) tree$$1.size(size);
  if (nodeSize) tree$$1.nodeSize(nodeSize);
  if (separation) tree$$1.separation(separation);
  var data = tree$$1(root);
  if (children) return children(data);
  return React.createElement(Group, {
    top: top,
    left: left,
    className: cx('vx-tree', className)
  }, linkComponent && data.links().map(function (link, i) {
    return React.createElement(Group, {
      key: "tree-link-".concat(i)
    }, React.createElement(linkComponent, {
      link: link
    }));
  }), nodeComponent && data.descendants().map(function (node, i) {
    return React.createElement(Group, {
      key: "tree-node-".concat(i)
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}

Treemap.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  tile: PropTypes.func,
  size: PropTypes.arrayOf(PropTypes.number),
  round: PropTypes.bool,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingInner: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingOuter: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingRight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  paddingLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  nodeComponent: PropTypes.any
};
function Treemap(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      tile = _ref.tile,
      size = _ref.size,
      round = _ref.round,
      padding = _ref.padding,
      paddingInner = _ref.paddingInner,
      paddingOuter = _ref.paddingOuter,
      paddingTop = _ref.paddingTop,
      paddingRight = _ref.paddingRight,
      paddingBottom = _ref.paddingBottom,
      paddingLeft = _ref.paddingLeft,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultNode : _ref$nodeComponent,
      restProps = _objectWithoutProperties(_ref, ["top", "left", "className", "root", "tile", "size", "round", "padding", "paddingInner", "paddingOuter", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "children", "nodeComponent"]);

  var treemap$$1 = treemap();
  if (tile) treemap$$1.tile(tile);
  if (size) treemap$$1.size(size);
  if (round) treemap$$1.round(round);
  if (padding) treemap$$1.padding(padding);
  if (paddingInner) treemap$$1.paddingInner(paddingInner);
  if (paddingOuter) treemap$$1.paddingOuter(paddingOuter);
  if (paddingTop) treemap$$1.paddingTop(paddingTop);
  if (paddingRight) treemap$$1.paddingRight(paddingRight);
  if (paddingBottom) treemap$$1.paddingBottom(paddingBottom);
  if (paddingLeft) treemap$$1.paddingLeft(paddingLeft);
  var data = treemap$$1(root);
  if (children) return children(data);
  return React.createElement(Group, {
    top: top,
    left: left,
    className: cx('vx-treemap', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return React.createElement(Group, {
      key: "treemap-node-".concat(i)
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}

Cluster.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.arrayOf(PropTypes.number),
  nodeSize: PropTypes.arrayOf(PropTypes.number),
  separation: PropTypes.func,
  linkComponent: PropTypes.any,
  nodeComponent: PropTypes.any
};
function Cluster(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      nodeSize = _ref.nodeSize,
      separation = _ref.separation,
      children = _ref.children,
      _ref$linkComponent = _ref.linkComponent,
      linkComponent = _ref$linkComponent === void 0 ? HierarchyDefaultLink : _ref$linkComponent,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultNode : _ref$nodeComponent,
      restProps = _objectWithoutProperties(_ref, ["top", "left", "className", "root", "size", "nodeSize", "separation", "children", "linkComponent", "nodeComponent"]);

  var cluster$$1 = cluster();
  if (size) cluster$$1.size(size);
  if (nodeSize) cluster$$1.nodeSize(nodeSize);
  if (separation) cluster$$1.separation(separation);
  var data = cluster$$1(root);
  if (children) return children(data);
  return React.createElement(Group, {
    top: top,
    left: left,
    className: cx('vx-cluster', className)
  }, linkComponent && data.links().map(function (link, i) {
    return React.createElement(Group, {
      key: "cluster-link-".concat(i)
    }, React.createElement(linkComponent, {
      link: link
    }));
  }), nodeComponent && data.descendants().map(function (node, i) {
    return React.createElement(Group, {
      key: "cluster-node-".concat(i)
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}

Pack.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  radius: PropTypes.func,
  size: PropTypes.arrayOf(PropTypes.number),
  padding: PropTypes.number,
  nodeComponent: PropTypes.any
};
function Pack(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      radius = _ref.radius,
      size = _ref.size,
      padding = _ref.padding,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultNode : _ref$nodeComponent,
      restProps = _objectWithoutProperties(_ref, ["top", "left", "className", "root", "radius", "size", "padding", "children", "nodeComponent"]);

  var pack$$1 = pack();
  if (size) pack$$1.size(size);
  if (radius !== undefined) pack$$1.radius(radius);
  if (padding) pack$$1.padding(padding);
  var data = pack$$1(root);
  if (children) return children(data);
  return React.createElement(Group, {
    top: top,
    left: left,
    className: cx('vx-pack', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return React.createElement(Group, {
      key: "pack-node-".concat(i)
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}

Partition.propTypes = {
  root: PropTypes.object.isRequired,
  children: PropTypes.func,
  top: PropTypes.number,
  left: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.arrayOf(PropTypes.number),
  round: PropTypes.bool,
  padding: PropTypes.number,
  nodeComponent: PropTypes.any
};
function Partition(_ref) {
  var top = _ref.top,
      left = _ref.left,
      className = _ref.className,
      root = _ref.root,
      size = _ref.size,
      round = _ref.round,
      padding = _ref.padding,
      children = _ref.children,
      _ref$nodeComponent = _ref.nodeComponent,
      nodeComponent = _ref$nodeComponent === void 0 ? HierarchyDefaultNode : _ref$nodeComponent,
      restProps = _objectWithoutProperties(_ref, ["top", "left", "className", "root", "size", "round", "padding", "children", "nodeComponent"]);

  var partition$$1 = partition();
  if (size) partition$$1.size(size);
  if (round) partition$$1.round(round);
  if (padding) partition$$1.padding(padding);
  var data = partition$$1(root);
  if (children) return children(data);
  return React.createElement(Group, {
    top: top,
    left: left,
    className: cx('vx-partition', className)
  }, nodeComponent && data.descendants().map(function (node, i) {
    return React.createElement(Group, {
      key: "partition-node-".concat(i)
    }, React.createElement(nodeComponent, {
      node: node
    }));
  }));
}

export { Tree, Treemap, Cluster, Pack, Partition, HierarchyDefaultLink, HierarchyDefaultNode };
