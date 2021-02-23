import React from "react";

export class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let tableValues = this.state.table.map(({x, y, ry}, i) => {
            x = x.toFixed(3);
            y = y.toFixed(3);
            ry = ry.toFixed(3);
            let dy = Math.abs((ry - y)).toFixed(3);
            return <tr key={"t-tb-tr-" + i}>
                <td>{x}</td>
                <td>{y}</td>
                <td>{ry}</td>
                <td>{dy}</td>
            </tr>
        });
        return (
            <div className="Data">
                <table>
                    <thead>
                    <tr>
                        <th>x</th>
                        <th>y</th>
                        <th>ry</th>
                        <th>dy</th>
                    </tr>
                    </thead>
                    <tbody>
                        {tableValues}
                    </tbody>
                </table>

            </div>
        );
    }
}