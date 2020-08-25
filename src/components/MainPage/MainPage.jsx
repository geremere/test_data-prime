import React, {Component} from "react";
import style from "./MainPage.module.css"
import PlotSVG from "./PlotSVG";
import PlotCanvas from "./PlotCanvas";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countOfDots: 0
        };
        this.handleCountOfDotsChange = this.handleCountOfDotsChange.bind(this);
        this.handleCountOfDots = this.handleCountOfDots.bind(this);
        this.handleChoiceClick = this.handleChoiceClick.bind(this);
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

    handleCountOfDots(event) {
        if (this.state.countOfDots != 1) {
            document.getElementById("inputFields").style.display = 'none';
            document.getElementById("plot").style.display = "block";
        } else
            alert("please input count of dots from 2 to 10 for plot")
    }

    handleChoiceClick(event) {
        debugger;
        if (event.target.id == "cnv") {
            document.getElementById("cnv").style.backgroundColor = " rgba(128, 89, 88, 0.5)";
            document.getElementById("svg").style.backgroundColor = " rgba(180, 180, 180, 0.4)";
        } else {
            document.getElementById("svg").style.backgroundColor = " rgba(128, 89, 88, 0.5)";
            document.getElementById("cnv").style.backgroundColor = " rgba(180, 180, 180, 0.4)";

        }

    }


    render() {
        let dots = this.state.countOfDots;

        return (
            <div className={style.mainWrapper}>
                <div className={style.headText}>Test task for Data-Prime</div>
                <div className={style.contentWrapper}>
                    {/* this block for input fields. It is for customization our service*/}
                    <div id="inputFields" className={style.inputFields}>
                        <div className={style.headText}>Entered values</div>
                        <input type="number" min="2" max="10"
                               placeholder="input here count of dots for plot from 2 to 10"
                               className={style.countOfDots} onChange={this.handleCountOfDotsChange}/>
                        <br/>
                        <button id="cnv" className={style.choice} onClick={this.handleChoiceClick}> Canvas</button>
                        <button id="svg" className={style.choice} onClick={this.handleChoiceClick}>SVG</button>
                        <br/>
                        <button onClick={this.handleCountOfDots} className={style.enter}>Draw plot</button>

                    </div>
                    {/*this block for plot. It have parameters from input field*/}
                    <div id="plot" className={style.plot}>
                        {/*<PlotSVG num={this.state.countOfDots}/>*/}
                        <PlotCanvas num={this.state.countOfDots}/>
                    </div>
                </div>
            </div>
        )
    }
}

function InputFields() {
    return (
        <div>

        </div>
    )

}



export default MainPage;