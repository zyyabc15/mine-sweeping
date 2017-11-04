import React, { Component } from 'react'
interface HeaderProps {
    initBombNum?: number,
    time?: string

}
class Header extends Component<HeaderProps> {
    render() {
        console.log(this.props.initBombNum)
        return (
            <label>2222</label>
            // <div>
            //     <label>2222</label>
            //     {/* <div>
            //         <label>计时：</label>
            //         <label>15</label>
            //     </div>
            //     <div>
            //         <label>个数：</label>
            //         <label>12.00</label>
            //     </div> */}
            // </div>
        )
    }
} 
export default Header