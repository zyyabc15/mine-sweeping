import { IPoint } from './IPoint'
import { observable, action } from 'mobx'

export default class PointInfo implements IPoint {
    x: number
    y: number
    value: number = 0
    @observable show: boolean = false
    @observable flag: boolean = false

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    
}