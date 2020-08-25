import React, {Component} from "react";
import style from "./MainPage.module.css";

class PlotSVG extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dots: [],
            lines: []
        };
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async handleUpdate(event) {
        let dots = [];
        for (let i = 0; i < this.props.num; i++) {
            dots.push(
                <circle className={style.point} cx={25 + (800 / this.props.num) * i}
                        cy={Math.random() * (465) + 25} r="5"
                        stroke="black"
                        fill="black"/>
            );
        }
        for (let i = 0; i < this.props.num - 1; i++) {
            document.getElementById("line" + i).setAttribute("x2", dots[i + 1].props.cx);
            document.getElementById("line" + i).setAttribute("y2", dots[i + 1].props.cy);
            document.getElementById("line" + i).setAttribute("x1", dots[i].props.cx);
            document.getElementById("line" + i).setAttribute("y1", dots[i].props.cy);


        }

        await
            this
                .setState({
                    dots: dots
                });

    }

    componentDidMount() {
        let dots = [];
        for (let i = 0; i < this.props.num; i++) {
            dots.push(
                <circle className={style.point} cx={25 + (800 / this.props.num) * i}
                        cy={Math.random() * (465) + 25} r="5"
                        stroke="black"
                        fill="black"/>
            );
        }
        let lines = dots.map((item, index) => {
            if (index != this.props.num - 1) {
                return (
                    <line className={style.point} id={"line" + index} x1={item.props.cx} y1={item.props.cy}
                          x2={dots[index + 1].props.cx}
                          y2={dots[index + 1].props.cy}
                          stroke="black"
                          fill="black"/>
                )
            }
        });
        this.setState({
            dots: dots,
            lines: lines
        });
    }

    render() {
        return (
            <svg height="500" width="800" className={style.plotDetails} onClick={this.handleUpdate}>

                <polyline
                    points=" 5 5  5 495"
                    stroke="black"
                    fill="none"/>

                <polyline
                    points=" 5 495 795 495"
                    stroke="black"
                    fill="none"/>
                {this.state.dots}
                {this.state.lines}


            </svg>
        )
    }
}

export default PlotSVG;