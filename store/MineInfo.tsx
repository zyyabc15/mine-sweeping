import { IMine } from './IMine'
import { observable, action, computed } from 'mobx'
import { IPoint } from './IPoint'
import PointInfo from './PointInfo'
class MineInfo implements IMine {
    @observable bombMap: PointInfo[][]
    @observable over: boolean = false
    @observable time: number = 0
    x_length: number = 9
    y_length: number = 9
    bombNum: number = 10
    showedBombNum: number = 10
    firstClick: boolean = true
    leftPointNum: number = this.getLeftPoint
    _timer: any

    @computed get getLeftPoint() {
        return this.x_length * this.y_length - this.bombNum
    }
    @action
    getMineMap() {
        var yArray = new Array()
        for (let j = 0; j < this.y_length; j++) {
            var xArray = new Array()
            for (let i = 0; i < this.x_length; i++) {
                xArray.push(new PointInfo(i, j))
            }
            yArray.push(xArray)
        }
        this.bombMap = yArray

        //     fetch('http://localhost:8080/mine/getMineMap?x_length=' +
        //         x_length + '&y_length=' + y_length + '&bombNum=' + bombNum,
        //         {
        //             mode: 'cors'

        //         })
        //         .then(res => res.json())
        //         .then(res => {
        //             this.bombMap = res
        //             // console.log(2, JSON.parse(JSON.stringify(this.bombMap)))

        //         })
        //         .catch(err => console.error(err))
    }
    @action
    init(x: number, y: number): void {
        let leftNum = this.bombNum
        while (leftNum > 0) {
            let x_ = this.getRandom(this.x_length)
            let y_ = this.getRandom(this.y_length)
            if (!(x_ === x && y_ === y) && this.bombMap[y_][x_].value !== -1) {
                this.bombMap[y_][x_].value = -1
                leftNum--
            } else {
                continue
            }
        }
        this.setMarks()
    }
    @action
    clickPoint(x: number, y: number) {
        let value = this.bombMap[y][x].value
        if (value > 0) {
            // 正常数字翻开
            this.showPoint(x, y)
        } else if (value === -1) {
            // 雷 结束游戏 都翻开。。。
            this.over = true
            this.stopTimer()
            this.gameOver()

        } else if (value === 0) {
            let pointQ = new Array<PointInfo>()
            let checked = new Set<PointInfo>()
            pointQ.push(this.bombMap[y][x])
            this.showPoint(x, y)
            while (pointQ.length !== 0) {
                let temp = pointQ.shift()
                checked.add(temp)
                let neigbors = this.getNeigbors(temp.x, temp.y)
                neigbors.forEach((element: PointInfo) => {
                    if (element.value === 0 && !checked.has(element)) {
                        this.showPoint(element.x, element.y)
                        pointQ.push(element)
                    } else if (element.value > 0 && element.show !== true) {
                        checked.add(element)
                        this.showPoint(element.x, element.y)
                    }
                })
            }
        }
        console.log(this.leftPointNum)
        if (this.leftPointNum === 0) {
            this.over = true
            this.stopTimer()
            alert('sucessful')

        }
    }
    @action
    clickRightButton(x: number, y: number) {
        let flag = this.bombMap[y][x].flag
        let value = this.bombMap[y][x].value
        if (flag) {
            this.showedBombNum = this.showedBombNum + 1
        } else {
            this.showedBombNum = this.showedBombNum - 1
        }
        this.bombMap[y][x].flag = !flag
    }
    @action
    clickMiddleButton(x: number, y: number) {
        let flag = this.bombMap[y][x].flag
        let value = this.bombMap[y][x].value
        let neigbors = this.getNeigbors(x, y)
        let flagCount = this.getFlagNum(neigbors)
        if (flagCount === value) {
            neigbors.forEach((element: PointInfo) => {
                let e_value = element.value
                let e_flag = element.flag
                let e_show = element.show
                if (!(e_value === -1 && e_flag) && !e_show) {
                    this.clickPoint(element.x, element.y)
                }

            })
        }
    }
    @action
    chooseLevel = (level: number): void => {
        this.time = 0
        this.stopTimer()
        this.chooseLevelInit(level)
        this.getMineMap()

    }
    showPoint = (x: number, y: number) => {
        if (this.bombMap[y][x].show) {
            return
        }
        this.bombMap[y][x].show = true
        this.leftPointNum = this.leftPointNum - 1
    }
    chooseLevelInit = (level: number): void => {
        if (level === 1) {
            this.bombNum = 10
            this.showedBombNum = 10
            this.x_length = 9
            this.y_length = 9
        } else if (level === 2) {
            this.bombNum = 40
            this.showedBombNum = 40
            this.x_length = 16
            this.y_length = 16
        } else if (level === 3) {
            this.bombNum = 99
            this.showedBombNum = 99
            this.x_length = 30
            this.y_length = 16
        }
        this.over = false
        this.time = 0
        this.firstClick = true
        this.leftPointNum = this.getLeftPoint
    }
    getRandom = (length: number): number => {
        return Math.floor(Math.random() * length)
    }
    setMarks = (): void => {
        for (let i = 0; i < this.x_length; i++) {
            for (let j = 0; j < this.y_length; j++) {
                // 跳过是雷的位置
                if (this.bombMap[j][i].value !== -1) {
                    let count = this.countBombs(i, j)
                    if (count > 0) {
                        this.bombMap[j][i].value = count
                    }
                }

            }
        }
    }
    countBombs = (x: number, y: number): number => {
        let set = this.getNeigbors(x, y)
        let count = 0
        set.forEach(function (element: PointInfo) {
            if (element.value === -1) {
                count++
            }
        })
        return count
    }
    getNeigbors = (x: number, y: number): Set<PointInfo> => {
        let sp = new Set()
        if (x - 1 >= 0 && y - 1 >= 0) {
            sp.add(this.bombMap[y - 1][x - 1])
        }
        if (x - 1 >= 0 && y >= 0) {
            sp.add(this.bombMap[y][x - 1])
        }
        if (x - 1 >= 0 && y + 1 < this.bombMap.length) {
            sp.add(this.bombMap[y + 1][x - 1])
        }
        if (x >= 0 && y - 1 >= 0) {
            sp.add(this.bombMap[y - 1][x])
        }
        if (x >= 0 && y + 1 < this.bombMap.length) {
            sp.add(this.bombMap[y + 1][x])
        }
        if (x + 1 < this.bombMap[0].length && y - 1 >= 0) {
            sp.add(this.bombMap[y - 1][x + 1])
        }
        if (x + 1 < this.bombMap[0].length && y >= 0) {
            sp.add(this.bombMap[y][x + 1])
        }
        if (x + 1 < this.bombMap[0].length && y + 1 < this.bombMap.length) {
            sp.add(this.bombMap[y + 1][x + 1])
        }
        return sp
    }
    getFlagNum = (neigbors: Set<PointInfo>): number => {
        let count = 0
        neigbors.forEach((element: PointInfo) => {
            if (element.flag) {
                count++
            }
        })
        return count
    }
    gameOver = (): void => {
        for (let j = 0; j < this.y_length; j++) {
            for (let i = 0; i < this.x_length; i++) {
                let element = this.bombMap[j][i]
                let value = element.value
                if (value === -1) {
                    this.bombMap[j][i].show = true
                }

            }
        }
    }

    startTimer = (): void => {
        this._timer = setInterval(() => this.time++, 1000)
    }
    stopTimer = (): void => {

        clearInterval(this._timer)
    }

}
export default new MineInfo
