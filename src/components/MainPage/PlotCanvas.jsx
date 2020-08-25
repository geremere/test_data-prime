import React, {Component} from "react";
import style from "./MainPage.module.css";

class PlotCanvas extends Component {

    constructor(props) {
        super(props);
        this.cnv = null;
        this.setCanvasLink = element => {
            this.cnv = element;
        };
        this.state = {
            points: [],
            nextpos: [],
            num: 0
        };
        this.draw = this.draw.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async draw() {
        if (this.cnv.getContext) {
            let ctx = this.cnv.getContext("2d");
            ctx.save();
            ctx.clearRect(10, 10, 780, 480);
            let prevStepY;
            let prevStepX;
            let isEnd = true;
            let newPoints = this.state.points.map((item, index) => {
                if (index < this.state.nextpos.length) {
                    let stepY = 0;
                    if (parseInt(item[1]) < parseInt(this.state.nextpos[index][1]))
                        stepY = 1;
                    else if (parseInt(item[1]) > parseInt(this.state.nextpos[index][1]))
                        stepY = -1;
                    let stepX = 0;
                    if (parseInt(item[0]) < parseInt(this.state.nextpos[index][0]))
                        stepX = 1;
                    else if (parseInt(item[0]) > parseInt(this.state.nextpos[index][0]))
                        stepX = -1;
                    if (index !== 0) {
                        ctx.beginPath();
                        ctx.moveTo(this.state.points[index - 1][0] + prevStepX, this.state.points[index - 1][1] + prevStepY);
                        ctx.lineTo(item[0] + stepX, item[1] + stepY);
                        ctx.stroke();
                    }
                    prevStepY = stepY;
                    prevStepX = stepX;
                    ctx.beginPath();
                    ctx.moveTo(item[0] + stepX, item[1] + stepY);
                    ctx.arc(item[0] + stepX, item[1] + stepY, 5, 0, Math.PI * 2, true);
                    ctx.fill();
                    isEnd = stepX === 0 && stepY === 0 ? true : false;
                    return [item[0] + stepX, item[1] + stepY];
                } else {
                    debugger;
                    let point=null;
                    let min=Infinity;
                    this.state.nextpos.forEach((itemP)=>{
                        if (Math.sqrt(Math.pow((item[0] - itemP[0]), 2) + Math.pow(item[1] - itemP[1], 2)) < min)
                            point = itemP;
                    });
                    let stepY = 0;
                    if (parseInt(item[1]) < parseInt(point[1]))
                        stepY = 1;
                    else if (parseInt(item[1]) > parseInt(point[1]))
                        stepY = -1;
                    let stepX = 0;
                    if (parseInt(item[0]) < parseInt(point[0]))
                        stepX = 1;
                    else if (parseInt(item[0]) > parseInt(point[0]))
                        stepX = -1;
                    if (index !== 0) {
                        ctx.beginPath();
                        ctx.moveTo(this.state.points[index - 1][0] + prevStepX, this.state.points[index - 1][1] + prevStepY);
                        ctx.lineTo(item[0] + stepX, item[1] + stepY);
                        ctx.stroke();
                    }
                    prevStepY = stepY;
                    prevStepX = stepX;
                    ctx.beginPath();
                    ctx.moveTo(item[0] + stepX, item[1] + stepY);
                    ctx.arc(item[0] + stepX, item[1] + stepY, 5, 0, Math.PI * 2, true);
                    ctx.fill();
                    isEnd = stepX === 0 && stepY === 0 ? true : false;
                    return [item[0] + stepX, item[1] + stepY];
                }
            });
            await this.setState({
                points: newPoints
            });
            if (!isEnd)
                await setTimeout(this.draw, 10);
        }
    }

    async handleUpdate(event) {
        let nextpos = [];
        let num;
        if (this.props.num === 0)
            num = parseInt(Math.random() * 9 + 2);
        else
            num = this.state.num;
        for (let i = 0; i < num; i++) {
            nextpos.push([25 + (800 / num) * i, Math.random() * 460 + 25]);
        }
        let points = this.state.points;
        if (num > this.state.num) {
            nextpos.forEach((item, index) => {
                if (index > this.state.points.length - 1) {
                    let qwe = this.state.points;
                    let point;
                    let min = Infinity;
                    this.state.points.forEach((itemP, indexP) => {
                        if (Math.sqrt(Math.pow((item[0] - itemP[0]), 2) + Math.pow(item[1] - itemP[1], 2)) < min)
                            point = itemP;
                    });
                    points.push([point[0], point[1]]);
                }
            })
        }
        // } else if (num < this.state.num) {
        //     this.state.points.forEach((itemP, indexP) => {
        //         if (indexP < num)
        //             points.push(itemP)
        //     });
        // } else {
        //     points = this.state.points;
        // }
        await this.setState({
            nextpos: nextpos,
            num: num,
            points: points
        });
        await setTimeout(this.draw, 10);
    }


    async componentDidMount() {
        if (this.cnv.getContext) {
            if (this.props.num === 0)
                await this.setState({
                    num: parseInt(Math.random() * 8 + 2)
                });
            else
                await this.setState({
                    num: this.props.num
                });

            let ctx = this.cnv.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(5, 5);
            ctx.lineTo(5, 495);
            ctx.lineTo(795, 495);
            ctx.stroke();
            let prev;
            let points = [];
            for (let i = 0; i < this.state.num; i++) {
                const y = Math.random() * (460) + 25;
                if (i !== 0) {
                    ctx.beginPath();
                    ctx.moveTo(25 + (800 / this.state.num) * (i - 1), prev);
                    ctx.lineTo(25 + (800 / this.state.num) * i, y);
                    ctx.stroke();
                }
                points.push([25 + (800 / this.state.num) * i, y]);
                prev = y;
                ctx.beginPath();
                ctx.moveTo(25 + (800 / this.state.num) * i, y);
                ctx.arc(25 + (800 / this.state.num) * i, y, 5, 0, Math.PI * 2, true);
                ctx.fill();
            }
            await this.setState({
                points: points
            })
        }
    }

    render() {


        return (
            <canvas ref={this.setCanvasLink} height="500" width="800" className={style.plotDetails}
                    onClick={this.handleUpdate}/>
        )
    }
}

export default PlotCanvas;