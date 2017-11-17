import * as React from 'react'
import Header from './Header'
import Mine from './Mine'
import { observer } from 'mobx-react'
import store from '../../store/MineInfo'

@observer
export class Content extends React.Component<undefined, undefined> {
    public render() {
        return (
            <div className="content">
                <Header initBombNum={store.showedBombNum} over={store.over} chooseLevel={store.chooseLevel}
                    time={store.time}  stopTimer={store.stopTimer} />
                <Mine />
            </div>
        )
    }
}