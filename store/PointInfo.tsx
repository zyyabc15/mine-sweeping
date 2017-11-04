import { IPoint } from './IPoint'
export default class PointInfo implements IPoint {
    x: number
    y: number
    value: number = 0
    show: boolean = false
    flag: boolean = false
}