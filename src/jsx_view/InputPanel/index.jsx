import React from "react";

export class InputPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = props._.state;
        props._.setState = this.setState.bind(this);
    }

    render() {
        let mode = this.state.mode;
        let {foo, realFoo, x0, y0, h, iterations} = this.state[mode];
        let autoUpdate = this.state.autoUpdate;
        let dy0;
        let SO = mode === "secondOrder";
        if (SO) dy0 = this.state.secondOrder.dy0;
        let _ = this.props._;
        return (
            <div className="InputPanel">

                <select value={mode} onChange={_.onModeChange}>
                    <option value="firstOrder">First Order Equation</option>
                    <option value="secondOrder">Second Order Equation</option>
                </select>

                <p>Функция для решения (функция | параметры через запятую):</p>
                <input type="text" value={foo} onChange={_.onFooChange}/>

                <p>Функция для проверки:</p>
                <input type="text" value={realFoo} onChange={_.onRealFooChange}/>

                <p>x<sub>0</sub>:</p>
                <input type="text" value={x0} onChange={_.onX0Change}/>

                <p>y<sub>0</sub>:</p>
                <input type="text" value={y0} onChange={_.onY0Change}/>

                {SO &&
                    <div>
                        <p>dy<sub>0</sub></p>
                        <input type="text" value={dy0} onChange={_.onDY0Change}/>
                    </div>
                }

                <p>Шаг итерации:</p>
                <input type="text" value={h} onChange={_.onHChange}/>

                <p>Количество итераций:</p>
                <input type="text" value={iterations} onChange={_.onIterationsChange}/>

                <br/>

                <span>Автоматическое обновление таблицы и графиков при изменении:</span>
                <input type="checkbox" checked={autoUpdate} onChange={_.onAutoUpdateChange}/>

                <br/><hr/>

                <button onClick={_.updateTable}>
                    Обновить таблицу
                </button>

            </div>
        );
    }
}