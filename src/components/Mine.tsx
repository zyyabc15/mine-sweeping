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
        )
    }

}
export default Mine