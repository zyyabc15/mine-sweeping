import * as React from 'react'
import './style.css'
import { observer } from 'mobx-react'
import store from '../../store/MineInfo'
export interface IPoint {
    x: number,
    y: number
}
@observer
class Point extends React.Component<IPoint> {
    click = (event: any) => {
        if (store.over) {
            return
        }
        let flag = store.bombMap[this.props.y][this.props.x].flag
        let show = store.bombMap[this.props.y][this.props.x].show
        event.persist()
        if (!flag && show && event.button === 1) {
            store.clickMiddleButton(this.props.x, this.props.y)
        } else if (!flag && !show && event.button === 0) {
            if (store.firstClick) {
                store.firstClick = false
                store.startTimer()
                store.init(this.props.x, this.props.y)
                store.clickPoint(this.props.x, this.props.y)
            } else {
                store.clickPoint(this.props.x, this.props.y)

            }
        } else if (!show && event.button === 2) {
            store.clickRightButton(this.props.x, this.props.y)
        }

    }
    doubleClick = () => {
        let flag = store.bombMap[this.props.y][this.props.x].flag
        let show = store.bombMap[this.props.y][this.props.x].show
        if (!flag && show) {
            store.clickMiddleButton(this.props.x, this.props.y)
        }
    }
    rightClick = (event: any) => {
        event.persist()

    }

    render() {
        let show = store.bombMap[this.props.y][this.props.x].show
        let value = store.bombMap[this.props.y][this.props.x].value
        let flag = store.bombMap[this.props.y][this.props.x].flag
        let classStr = 'div-point div-point-unshown'
        if (show) {
            classStr = 'div-point div-point-shown'
        }
        if (flag) {
            classStr += ' div-point-flag'
        }
        if (show && value === -1) {
            classStr += ' div-point-over'
        }

        return (
            <div className={classStr}
                onDoubleClick={this.doubleClick}
                onMouseDown={this.click} >
                {flag || show && value !== 0 &&
                    <a className={'value-color-' + value}>{value > 0 && value}</a>}
            </div>
        )
    }
}
export default Point