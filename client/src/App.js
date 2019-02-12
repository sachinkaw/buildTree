import React from "react";
import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";
import { LinearGradient } from "@vx/gradient";
import { hierarchy } from "d3-hierarchy";
import { pointRadial } from "d3-shape";
import axios from "axios";

import {
  LinkHorizontal,
  LinkVertical,
  LinkRadial,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine
} from "@vx/shape";

const data = {
  name: "",
  children: [
    {
      name: "Lewis",
      id: 1,
      gender: "Female",
      hasParnter: true,
      imageUrl: "/avatar/gravator.jpg"
    },
    {
      name: "Sam",
      id: 2,
      partnerId: 1,
      noParent: true,
      children: [
        {
          name: "Anthony",
          id: 3,
          gender: "Female",
          isSource: true,
          hasParnter: true
        },
        {
          name: "Pankaj",
          id: 5,
          partnerId: 3,
          gender: "Male",
          noParent: true,
          children: [
            {
              name: "Shaun",
              id: 100,
              hasParnter: true
            },
            {
              name: "Danny",
              id: 102,
              partnerId: 100,
              gender: "Female",
              noParent: true,
              children: [{ name: "D MM", gender: "Female" }]
            },
            {
              name: "Sun",
              id: 102,
              partnerId: 100,
              gender: "Female",
              noParent: true,
              children: [{ name: "B MM" }]
            },
            {
              name: "Rich",
              id: 200,
              gender: "Female",
              hasParnter: true,
              imageUrl: "/avatar/v-pk.jpeg"
            },
            {
              name: "Ram",
              id: 201,
              partnerId: 200,
              noParent: true,
              children: [
                {
                  name: "Sierra",
                  gender: "Female"
                },
                {
                  name: "Sally"
                },
                {
                  name: "Nat"
                },
                {
                  name: "Mel"
                }
              ]
            },

            {
              name: "Uttam",
              id: 300,
              hasParnter: true,
              imageUrl: "/avatar/v-k.jpeg"
            },
            {
              name: "Rachel",
              gender: "Female",
              id: 301,
              partnerId: 300,
              noParent: true,
              children: [
                {
                  name: "Paddy",
                  id: 3001,
                  imageUrl: "/avatar/v-k-1.jpeg"
                },
                {
                  name: "Many"
                }
              ]
            },
            {
              name: "Poker",
              id: 400,
              hasParnter: true
            },
            {
              name: "Sebti",
              gender: "Female",
              id: 401,
              partnerId: 400,
              noParent: true,
              children: [
                {
                  name: "Nally",
                  gender: "Female"
                },
                {
                  name: "C K"
                }
              ]
            }
          ]
        },

        {
          name: "Douglas",
          id: 4,
          partnerId: 3,
          gender: "Male",
          noParent: true,
          imageUrl: "/avatar/dummy.png",
          children: [
            {
              name: "Sam"
            },
            {
              name: "Thomas"
            }
          ]
        }
      ]
    }
  ]
};

export default class extends React.Component {
  state = {
    data: [],
    layout: "cartesian",
    orientation: "vertical",
    linkType: "step",
    stepPercent: 1,
    showOptions: false,
    nodeId: null,
    nodeName: "",
    nodeImageUrl: "",
    treeData: {},
    intervalIsSet: false
  };

  constructor(props) {
    super(props);

    this.showNodeOptions = this.showNodeOptions.bind(this);
    this.updateTree = this.updateTree.bind(this);
    this.fetchNodeTree = this.fetchNodeTree.bind(this);
  }

  componentDidMount() {
    this.setState({ treeData: data });
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

  showNodeOptions(node) {
    const { showOptions } = this.state;
    const imageUrl = node.data && node.data.imageUrl ? node.data.imageUrl : "";
    const name = node.data && node.data.name ? node.data.name : "";
    const nodeId = node.data && node.data.id ? node.data.id : "";
    this.setState({
      showOptions: !showOptions,
      nodeImageUrl: imageUrl,
      nodeName: name,
      nodeId: nodeId
    });
  }

  fetchNodeTree() {
    const { nodeId, showOptions } = this.state;
    fetch(`/json/${nodeId}.json`)
      .then(res => {
        return res.status === 200 ? res.json() : {};
      })
      .then(treeData => {
        this.setState({ treeData: treeData, showOptions: !showOptions }, () => {
          this.forceUpdate();
        });
      })
      .catch(() => {
        alert("Invalid request!");
      });
  }

  updateTree(node) {
    node.data.isExpanded = !node.data.isExpanded;
    this.forceUpdate();
  }

  render() {
    const {
      width,
      height,
      margin = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30
      }
    } = this.props;
    let partners = [];
    const nameLineHeight = 1.2;
    const fontSize = 9;

    const circleRadius = 24;
    const avatarSize = circleRadius * 2;

    const {
      treeData,
      layout,
      orientation,
      linkType,
      stepPercent,
      showOptions,
      nodeImageUrl,
      nodeName
    } = this.state;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    let origin;
    let sizeWidth;
    let sizeHeight;

    if (layout === "polar") {
      origin = {
        x: innerWidth / 2,
        y: innerHeight / 2
      };
      sizeWidth = 2 * Math.PI;
      sizeHeight = Math.min(innerWidth, innerHeight) / 2;
    } else {
      origin = { x: 0, y: 0 };
      if (orientation === "vertical") {
        sizeWidth = innerWidth;
        sizeHeight = innerHeight;
        /* As root note is hidden, adjust tree's Y positioning */
        origin.y -= sizeHeight / 10;
      } else {
        sizeWidth = innerHeight;
        sizeHeight = innerWidth;
        /* As root note is hidden, adjust tree's X positioning */
        origin.x -= sizeHeight / 10;
      }
    }

    let LinkComponent;

    if (layout === "polar") {
      if (linkType === "step") {
        LinkComponent = LinkRadialStep;
      } else if (linkType === "curve") {
        LinkComponent = LinkRadialCurve;
      } else if (linkType === "line") {
        LinkComponent = LinkRadialLine;
      } else {
        LinkComponent = LinkRadial;
      }
    } else {
      if (orientation === "vertical") {
        if (linkType === "step") {
          LinkComponent = LinkVerticalStep;
        } else if (linkType === "curve") {
          LinkComponent = LinkVerticalCurve;
        } else if (linkType === "line") {
          LinkComponent = LinkVerticalLine;
        } else {
          LinkComponent = LinkVertical;
        }
      } else {
        if (linkType === "step") {
          LinkComponent = LinkHorizontalStep;
        } else if (linkType === "curve") {
          LinkComponent = LinkHorizontalCurve;
        } else if (linkType === "line") {
          LinkComponent = LinkHorizontalLine;
        } else {
          LinkComponent = LinkHorizontal;
        }
      }
    }

    return (
      <div>
        <button>Change View</button>
        <div style={{ color: "rgba(38, 150, 136, 1.000)", fontSize: 10 }} />
        <svg width={width} height={height}>
          {/* LinearGradient - lgFemale - Pink gradient */}
          <LinearGradient id="lgFemale" from="#fd9b93" to="#fe6e9e" />
          {/* LinearGradient - lgMale - Green gradient */}
          <LinearGradient id="lgMale" from="#13ea58" to="#059a35" />
          {/* LinearGradient - lgSpouse - Yellow gradient */}
          <LinearGradient id="lgSpouse" from="#f3f3a7" to="#ffff00" />
          <rect width={width} height={height} rx={0} fill="#272b4d" />
          <Group top={margin.top} left={margin.left}>
            <Tree
              root={hierarchy(treeData, d =>
                d.isExpanded ? null : d.children
              )}
              size={[sizeWidth, sizeHeight]}
              separation={(a, b) =>
                (a.parent === b.parent ? 0.5 : 0.75) / a.depth
              }
            >
              {data => (
                <Group top={origin.y} left={origin.x}>
                  {data.links().map((link, i) => {
                    if (link.target.data.hasParnter) {
                      partners.push(link.target);
                    }
                    /* Do not show the link from root empty object */
                    if (link.source.depth === 0) {
                      return null;
                    }
                    if (link.target.data.noParent === true) {
                      return null;
                    }

                    return (
                      <LinkComponent
                        data={link}
                        percent={+stepPercent}
                        stroke="#374469"
                        strokeWidth="1"
                        fill="none"
                        key={i}
                      />
                    );
                  })}
                  {/* Draw Partners Line */}
                  {data.links().map((link, i) => {
                    if (typeof link.target.data.partnerId !== "number") {
                      return null;
                    }
                    const nodePartnerId = link.target.data.partnerId;

                    const linkSource = partners.filter(partner => {
                      return partner.data.id === nodePartnerId ? partner : null;
                    });

                    link.source = linkSource[0];

                    return link.source !== undefined ? (
                      <LinkComponent
                        data={link}
                        percent={+stepPercent}
                        stroke="#374469"
                        strokeWidth="1"
                        fill="none"
                        key={i}
                      />
                    ) : null;
                  })}

                  {data.descendants().map((node, key) => {
                    /* Do not show the empty root object */
                    if (node.depth === 0) {
                      return null;
                    }
                    const gender = node.data.gender;
                    const isFemale = gender === "Female" ? true : false;
                    const name = node.data.name || "";
                    const nameLength = name.length * 4;

                    let top;
                    let left;
                    if (layout === "polar") {
                      const [radialX, radialY] = pointRadial(node.x, node.y);
                      top = radialY;
                      left = radialX;
                    } else {
                      if (orientation === "vertical") {
                        top = node.y;
                        left = node.x;
                      } else {
                        top = node.x;
                        left = node.y;
                      }
                    }
                    const isSource = node.data.isSource;
                    const imageId = "image_" + key;
                    const imageUrl = node.data.imageUrl;
                    const hasImage = imageUrl !== undefined && imageUrl !== "";
                    return (
                      <Group
                        top={top}
                        left={left}
                        key={key}
                        className={isSource !== true ? "node-group" : ""}
                        onClick={() => {
                          return isSource !== true
                            ? this.showNodeOptions(node)
                            : void 0;
                        }}
                      >
                        {hasImage === true && imageUrl !== "" && (
                          <defs>
                            <pattern
                              id={imageId}
                              x={circleRadius}
                              y={circleRadius}
                              patternUnits="userSpaceOnUse"
                              height={avatarSize}
                              width={avatarSize}
                            >
                              <image x="0" y="0" xlinkHref={imageUrl} />
                            </pattern>
                          </defs>
                        )}
                        <circle
                          r={circleRadius}
                          fill={
                            hasImage
                              ? "url('#" + imageId + "')"
                              : isSource
                              ? isFemale
                                ? "url('#lgFemale')"
                                : "url('#lgMale')"
                              : node.data.isPartner !== true
                              ? "#272b4d"
                              : "url('#lgSpouse')"
                          }
                          className={
                            !isSource
                              ? "node " + (isFemale ? "female" : "male")
                              : ""
                          }
                          strokeWidth={1}
                          strokeDasharray={
                            !node.data.children && !node.data.hasParnter
                              ? "2,2"
                              : "0"
                          }
                          strokeOpacity={1}
                        />
                        )}
                        <rect
                          y={-nameLineHeight + fontSize / 2}
                          x={-nameLength}
                          height={fontSize * 2}
                          width={nameLength * 2}
                          className="node-text-bg"
                          rx="5"
                        />
                        <text
                          dy={circleRadius - fontSize}
                          fontSize={fontSize}
                          fontFamily="Arial"
                          textAnchor={"middle"}
                          style={{ pointerEvents: "none" }}
                          className="node"
                        >
                          {name}
                        </text>
                      </Group>
                    );
                  })}
                </Group>
              )}
            </Tree>
          </Group>
        </svg>
        {showOptions === true && (
          <React.Fragment>
            <div id="test" className="modal is-active">
              <div
                className="modal-background"
                onClick={this.showNodeOptions}
              />
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">What next?</p>
                  <button
                    className="delete"
                    aria-label="close"
                    onClick={this.showNodeOptions}
                    title="Close"
                  />
                </header>
                <section className="modal-card-body">
                  <div className="content">
                    Do you want to add your Whanau
                    <b> {nodeName}</b>?
                  </div>
                </section>
                <footer className="modal-card-foot">
                  <button
                    className="button is-success is-pulled-right"
                  >
                    Yes
                  </button>
                  <button
                    className="button is-pulled-right"
                    onClick={this.showNodeOptions}
                  >
                    May Be Later
                  </button>
                </footer>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
