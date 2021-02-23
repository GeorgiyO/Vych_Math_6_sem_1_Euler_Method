import {strToFoo} from "./util";
import {eulerMethod, eulerMethodSecondOrder} from "./EulerMethod";

export {props, updateData};

const props = {
    inputPanel: {
        state: {
            mode: "firstOrder",
            autoUpdate: true,
            firstOrder: {
                foo: "y + Math.exp(x) / x | x,y",
                realFoo: "Math.log(x) * Math.exp(x) | x",
                x0: "1",
                y0: "0",
                h: "0.2",
                iterations: "10"
            },
            secondOrder: {
                foo: "3 * Math.exp(x) + 2 * dy - y | x,y,dy",
                realFoo: "(x * (3/2 * x + 1) + 2) * Math.exp(x) | x",
                x0: "0",
                y0: "2",
                dy0: "3",
                h: "0.1",
                iterations: "10"
            }
        },
        updateState: function () {
            this.setState(this.state);
        },
        onFooChange: getChangePropFoo("foo"),
        onRealFooChange: getChangePropFoo("realFoo"),
        onX0Change: getChangePropFoo("x0"),
        onY0Change: getChangePropFoo("y0"),
        onDY0Change: getChangePropFoo("dy0"),
        onHChange: getChangePropFoo("h"),
        onIterationsChange: getChangePropFoo("iterations"),
        onAutoUpdateChange: (e) => {
            let ip = props.inputPanel;
            ip.state.autoUpdate = e.target.checked;
            ip.updateState();
            if (ip.state.autoUpdate) updateData();
        },
        onModeChange: (e) => {
            let ip = props.inputPanel;
            ip.state.mode = e.target.value;
            ip.updateState();
            if (ip.state.autoUpdate) updateData();
        }
    },
    data: {
        state: {
            table: [] // {xn, fn, rfn}
        },
        updateState: function () {
            this.setState(this.state);
        },
    },
    graph: {
        state: {
            fooTable: null,
            realFooTable: null
        },
        updateState: function () {
            this.setState(this.state);
        }
    }
};

function getChangePropFoo(par) {
    return function (e) {
        let ip = props.inputPanel;
        let mode = ip.state.mode;
        ip.state[mode][par] = e.target.value;
        ip.updateState();
        if (ip.state.autoUpdate) updateData();
    }
}

function updateData() {
    let mode = props.inputPanel.state.mode;
    if (mode === "firstOrder") updateDataFO();
    else if (mode === "secondOrder") updateDataSO();
}

function updateDataFO() {
    let {x0, y0, h, iterations, foo, realFoo} = props.inputPanel.state.firstOrder;
    [x0, y0, h, iterations] = [x0, y0, h, iterations].map(v => Number(v));

    let funcs = checkFuncs([foo, realFoo]);
    if (!funcs) return;
    foo = funcs.foo;
    realFoo = funcs.realFoo;

    console.log("asdasd");

    updateDataAndGraphState(eulerMethod(x0, y0, h, iterations, foo), realFoo);
}

function updateDataSO() {
    let {x0, y0, dy0, h, iterations, foo, realFoo} = props.inputPanel.state.secondOrder;
    [x0, y0, dy0, h, iterations] = [x0, y0, dy0, h, iterations].map(v => Number(v));

    let funcs = checkFuncs([foo, realFoo]);
    if (!funcs) return;
    foo = funcs.foo;
    realFoo = funcs.realFoo;

    updateDataAndGraphState(eulerMethodSecondOrder(x0, y0, dy0, h, iterations, foo).map(p => {
        return {
            x: p.t,
            y: p.y
        }
    }), realFoo);
}

function checkFuncs(functions) {
    let foo = functions[0];
    let realFoo = functions[1];
    try {
        if (foo === "" || realFoo === "") return false;
        foo = strToFoo(foo);
        realFoo = strToFoo(realFoo);
        let y = foo(0, 1);
        let _y = realFoo(0, 1);
        y.toFixed(1);
        _y.toFixed(1);
    } catch (e) {
        return false;
    }
    return {
        foo,
        realFoo
    };
}

function updateDataAndGraphState(table, realFoo) {
    props.data.state.table = table;
    for (let p of table) p.ry = realFoo(p.x);

    props.data.updateState();
    props.graph.state.fooTable = props.data.state.table.map((p) => {
        return {
            x: p.x,
            y: p.y
        }
    });
    props.graph.state.realFooTable = props.data.state.table.map((p) => {
        return {
            x: p.x,
            y: p.ry
        }
    });
    props.graph.updateState();
}