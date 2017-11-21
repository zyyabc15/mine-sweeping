import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
interface HeaderProps {
    initBombNum: number
    over: boolean
    chooseLevel: any
    time: number
    stopTimer: any
    bestScore: number
}
@observer
class Header extends React.Component<HeaderProps> {
    chooseLevel = (level: number) => {
        this.props.chooseLevel(level)
    }
    componentWillUnmount() {
        this.props.stopTimer()
    }
    render() {
        console.log(this.props.bestScore)
        return (
            <div className="header-content">
                <div className="dataBox">
                    <div className="time-container">
                        <div className="mine-pic" />
                        <div className="time-str"><label>{this.props.initBombNum}</label></div>
                    </div>
                    <div className="time-container">
                        <div className="time-pic" />
                        <div className="time-str"><label>{this.props.time}</label></div>
                    </div>
                    <div className="time-container">
                        <div className="best-pic" />
                        <div className="time-str"><label>{this.props.bestScore}</label></div>
                    </div>

                </div>
                <div className="level-div">
                    <div onClick={this.chooseLevel.bind(this, 1)} className="level-div-1" />
                    <div onClick={this.chooseLevel.bind(this, 2)} className="level-div-2" />
                    <div onClick={this.chooseLevel.bind(this, 3)} className="level-div-3" />
                </div>

               
            </div>
        )
    }
}
export default Header