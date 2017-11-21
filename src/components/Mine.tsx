import * as React from 'react'
import Point, { IPoint } from './Point'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import store from '../../store/MineInfo'
require('./style.css')

@observer
class Mine extends React.Component<undefined> {
    constructor() {
        super()
        store.getMineMap()
    }
    oncontextmenu = (e: any) => {
        e.preventDefault()

    }

    render() {
        let bombMap: any = undefined
        if (store.bombMap) {
            bombMap = JSON.parse(JSON.stringify(store.bombMap))
        }

        return (
            <div className="mine-container">
                {store.over && !store.success &&
                    <div className="result-box">
                        <div><label>手表抖哦！再接再厉哦!<br />…(⊙_⊙;)…</label></div>
                        <div onClick={store.newGame}><a>OK</a></div>
                    </div>}
                {store.over && store.success && !store.newScore &&
                    <div className="result-box">
                        <div><label>好腻害哦！再来一局吧！<br />⊙o⊙</label></div>
                        <div onClick={store.newGame}><a>OK</a></div>
                    </div>}
                {store.over && store.success && store.newScore &&
                    <div className="result-box">
                        <div><label>新记录哦！再来一局吧！<br />└(^o^)┘</label></div>
                        <div onClick={store.newGame}><a>OK</a></div>
                    </div>}
                <div className="mine-div-container-v" onContextMenu={this.oncontextmenu}>
                    {
                        bombMap && bombMap.map((pointLine: any, k: number) => {
                            return (
                                <div key={k} className="mine-div-container-h">
                                    {
                                        pointLine.map((point: any, index: number) => (
                                            <Point key={index} x={point.x} y={point.y} />
                                        ))
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}
export default Mine