import React, {Component} from "react";
import style from "./MainPage.module.css"
import PlotSVG from "./PlotSVG";
import PlotCanvas from "./PlotCanvas";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countOfDots: 0,
            isAppears:false
        };
        this.handleCountOfDotsChange = this.handleCountOfDotsChange.bind(this);
        this.handleCountOfDots = this.handleCountOfDots.bind(this);
        this.handleBack =this.handleBack.bind(this);
    }

    async handleCountOfDotsChange(event) {
        let value = event.target.value;
        if (value >= 1 && value <= 10 && value != this.state.countOfDots)
            await this.setState({
                countOfDots: value
            });
        else
            event.target.value = value == "" || value == 1 ? value : this.state.countOfDots;
    }

    async handleCountOfDots(event) {
        if (this.state.countOfDots != 1) {
            await this.setState({
                isAppears:true
            });
            document.getElementById("inputFields").style.display = 'none';
            document.getElementById("plot").style.display = "block";
        } else
            alert("please input count of dots from 2 to 10 for plot or if you want random count of point in every turn stay field empty")
    }

    async handleBack(){
        document.getElementById("inputFields").style.display = 'block';
        document.getElementById("plot").style.display = "none";
        await this.setState({
            isAppears:false
        })
    }




    render() {
        return (
            <div className={style.mainWrapper}>
                <div className={style.headText}>Test task for Data-Prime</div>
                <div className={style.contentWrapper}>
                    {/* this block for input fields. It is for customization our service*/}
                    <div id="inputFields" className={style.inputFields}>
                        <div className={style.headText}>Entered values</div>
                        <input type="number" min="2" max="10"
                               placeholder="input here 2 to 10 or stay empty for random count of point every click"
                               className={style.countOfDots} onChange={this.handleCountOfDotsChange}/>
                        <br/>
                        <button onClick={this.handleCountOfDots} className={style.enter}>Draw plot</button>

                    </div>
                    {/*this block for plot. It have parameters from input field*/}
                    <div id="plot" className={style.plot}>
                        <button className={style.back} onClick={this.handleBack}>Back</button>
                        {/*<PlotSVG num={this.state.countOfDots}/>
                        Не вышло сделать анимацию линий, так что пришлось оставить на таком этапе,
                        но выполнена работа на canvas*/}
                        <PlotCanvas  num={this.state.countOfDots} isappears={this.state.isAppears}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default MainPage;