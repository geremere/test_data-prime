import React, {Component} from "react";
import style from "./MainPage.module.css";

class PlotCanvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            points: [],
            nextpost: []
        };
        this.draw = this.draw.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    isEnd(){

    }
    async draw() {

        if (this.refs.cnv.getContext) {
            let ctx = this.refs.cnv.getContext("2d");
            ctx.save();
            debugger;
            ctx.clearRect(10, 10, 780, 480);
            let newPoints = this.state.points.map((item, index) => {
                if (index != 0) {
                    ctx.beginPath();
                    ctx.moveTo(this.state.points[index-1][0], this.state.points[index-1][1] + 1);
                    ctx.lineTo(item[0], item[1]+1);
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.moveTo(item[0], item[1] + 1);
                ctx.arc(item[0], item[1] + 1, 5, 0, Math.PI * 2, true);
                ctx.fill();
                return [item[0], item[1] + 1];
            });
            await this.setState({
                points:newPoints
            })
            setTimeout(this.draw,20);
        }
    }

    async handleUpdate(event) {

        let nextpos = [];
        for (let i = 0; i < this.props.num; i++) {
            nextpos.push([25 + (800 / this.props.num) * (i - 1), Math.random() * (460) + 25]);
        }
        await this.setState({
            nextpos: nextpos
        });
       setTimeout(this.draw,20);
        // window.requestAnimationFrame(draw(this.refs.cnv,this.state.points,this.state.nextpos));
    }


    componentDidMount() {
        if (this.refs.cnv.getContext) {
            let ctx = this.refs.cnv.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(5, 5);
            ctx.lineTo(5, 495);
            ctx.lineTo(795, 495);
            ctx.stroke();
            let prev;
            for (let i = 0; i < this.props.num; i++) {
                const y = Math.random() * (460) + 25;
                if (i !== 0) {
                    ctx.beginPath();
                    ctx.moveTo(25 + (800 / this.props.num) * (i - 1), prev);
                    ctx.lineTo(25 + (800 / this.props.num) * i, y);
                    ctx.stroke();
                }
                this.state.points.push([25 + (800 / this.props.num) * i, y]);
                prev = y;
                ctx.beginPath();
                ctx.moveTo(25 + (800 / this.props.num) * i, y);
                ctx.arc(25 + (800 / this.props.num) * i, y, 5, 0, Math.PI * 2, true);
                ctx.fill();
            }
        }
    }

    render() {
        return (
            <canvas ref="cnv" height="500" width="800" className={style.plotDetails} onClick={this.handleUpdate}/>
        )
    }
}

export default PlotCanvas;