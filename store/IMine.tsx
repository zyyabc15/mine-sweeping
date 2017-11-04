import { IPoint } from './IPoint'
export interface IMine {
    y_length: number,
    x_length: number,
    bombNum: number,
    bombMap: IPoint[][],
    over: boolean,

    getMineMap(x_length: number, y_length: number, bombNum: number): IMine,
    init(point: IPoint, mine: IMine): IMine,
    clickPoint(point: IPoint, mine: IMine): IMine

}
