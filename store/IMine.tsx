import { IPoint } from './IPoint'
export interface IMine {
    y_length: number,
    x_length: number,
    bombNum: number,
    showedBombNum: number,
    bombMap: IPoint[][],
    over: boolean,
    time: number,
    leftPointNum: number,
    level: number,
    bestScore: number

    getMineMap(): void,
    init(x: number, y: number): void,
    clickPoint(x: number, y: number): void,
    clickMiddleButton(x: number, y: number): void,
    clickRightButton(x: number, y: number): void,
    chooseLevel(levle: number): void,
    startTimer(): void,
    stopTimer(): void

}
