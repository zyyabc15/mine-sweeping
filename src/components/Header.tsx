import * as React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
interface HeaderProps {
    initBombNum: number
    over: boolean
    chooseLevel: any
    time: number
    stopTimer: any
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
        return (
            <div className = "header-content">
                <div className="level-div">
                    <a onClick={this.chooseLevel.bind(this, 1)}>初级</a>
                    <a onClick={this.chooseLevel.bind(this, 2)}>中级</a>
                    <a onClick={this.chooseLevel.bind(this, 3)}>高级</a>
                </div>
                <div className="dataBox">
                    <div>
                        <label>计时：</label>
                        <label>{this.props.time}</label>
                    </div>
                    <div>
                        <label>个数：</label>
                        <label>{this.props.initBombNum}</label>
                    </div>
                </div>
                {this.props.over && <div>failed</div>}
            </div>
        )
    }
}
export default Header