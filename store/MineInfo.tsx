import { IMine } from './IMine'
import { observable, action } from 'mobx'
import { IPoint } from './IPoint'

export default class MineInfo implements IMine {
    @observable y_length: number = 9
    @observable x_length: number = 9
    @observable bombNum: number = 10
    @observable bombMap: IPoint[][]
    @observable over: boolean = false

    @action
    getMineMap(x_length: number, y_length: number, bombNum: number) {
        return this.bombMap
    }
    @action
    init(point: IPoint, mine: IMine) {
        return this.bombMap
    }
    @action
    clickPoint(point: IPoint, mine: IMine) {
        return this.bombMap
    }

}
